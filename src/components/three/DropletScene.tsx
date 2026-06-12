"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

/**
 * The signature element: a single oil droplet rendered as a displaced,
 * iridescent sphere. A `morph` uniform (driven by scroll from the parent)
 * pushes it from a calm droplet (0) toward turbulent energy (1).
 */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;

  // classic 3D simplex noise (Ashima)
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod(i,289.0);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=1.0/7.0;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main(){
    vNormal = normalize(normalMatrix * normal);
    float speed = 0.25 + uMorph * 0.9;
    float amp = 0.10 + uMorph * 0.42;
    float n = snoise(position * (1.4 + uMorph * 2.2) + uTime * speed);
    vNoise = n;
    vec3 displaced = position + normal * n * amp;
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform float uMorph;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;

  void main(){
    float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);

    // oil droplet (cool dark) -> ignition energy (amber/gold/green)
    vec3 oil   = vec3(0.04, 0.035, 0.03);
    vec3 amber = vec3(0.78, 0.45, 0.17);
    vec3 gold  = vec3(0.91, 0.69, 0.29);
    vec3 green = vec3(0.50, 0.65, 0.31);

    vec3 base = mix(oil, amber, smoothstep(0.0, 0.5, uMorph));
    base = mix(base, gold, smoothstep(0.45, 0.9, uMorph) * (0.5 + 0.5 * vNoise));
    base = mix(base, green, uMorph * smoothstep(0.6, 1.0, vNoise) * 0.6);

    vec3 rim = mix(vec3(0.78,0.45,0.17), vec3(0.91,0.69,0.29), uMorph);
    vec3 color = base + rim * fres * (0.6 + uMorph * 0.8);

    // inner glow that intensifies as energy rises
    color += gold * uMorph * 0.25 * (0.5 + 0.5 * vNoise);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function DropletScene({
  morphRef,
}: {
  morphRef: MutableRefObject<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rootStyles = getComputedStyle(document.documentElement);
    const creame = rootStyles.getPropertyValue("--creame").trim();
    const accentSoft = rootStyles
      .getPropertyValue("--color-accent-soft")
      .trim();
    const accentStrong = rootStyles
      .getPropertyValue("--color-accent-strong")
      .trim();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 5);

    const ambient = new THREE.AmbientLight(creame, 0.4);
    const keyLight = new THREE.PointLight(creame, 40, 0, 2);
    keyLight.position.set(5, 5, 5);
    const fillLight = new THREE.PointLight(
      accentStrong || accentSoft || creame,
      20,
      0,
      2,
    );
    fillLight.position.set(-5, -3, 2);
    scene.add(ambient, keyLight, fillLight);

    const uniforms = {
      uTime: { value: 0 },
      uMorph: { value: 0 },
    };

    const droplet = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 5),
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms,
      }),
    );
    scene.add(droplet);

    const particleCount = 700;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: creame,
      size: 0.014,
      transparent: true,
      opacity: 0.2,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;

      uniforms.uTime.value += delta;
      uniforms.uMorph.value +=
        (morphRef.current - uniforms.uMorph.value) * Math.min(1, delta * 3);

      droplet.rotation.y += delta * 0.12;
      droplet.rotation.x = Math.sin(elapsed * 0.2) * 0.15;
      particles.rotation.y += delta * 0.04;
      particleMaterial.opacity = 0.15 + morphRef.current * 0.5;
      particleMaterial.size = 0.012 + morphRef.current * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      particleGeometry.dispose();
      particleMaterial.dispose();
      (droplet.material as THREE.Material).dispose();
      droplet.geometry.dispose();
      renderer.dispose();
    };
  }, [morphRef]);

  return (
    <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
  );
}
