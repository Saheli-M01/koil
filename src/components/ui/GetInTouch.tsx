"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, Paperclip } from "lucide-react";

export default function GetInTouch() {
  const [attachmentCount, setAttachmentCount] = useState(0);

  return (
    <section
      id="contact"
      className="relative py-32 md:py-48"
      style={{ backgroundColor: "var(--creame)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <h2
          className="display-xl text-center text-[clamp(2.2rem,6vw,5.5rem)]"
          style={{ color: "var(--slate-gray)" }}
        >
          Get in Touch
        </h2>

        <div className="mt-20 grid gap-16 md:grid-cols-2">
          {/* Left: Contact Form */}
          <div>
            <h3
              className="mb-8 text-2xl font-semibold"
              style={{ color: "var(--slate-gray)" }}
            >
              Connect with Us
            </h3>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name*"
                required
                className="w-full rounded border-2 px-4 py-3 font-sans text-base placeholder-opacity-60 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  borderColor: "var(--slate-gray)",
                  color: "var(--slate-gray)",
                  backgroundColor: "transparent",
                }}
              />
              <input
                type="email"
                placeholder="Email Address*"
                required
                className="w-full rounded border-2 px-4 py-3 font-sans text-base placeholder-opacity-60 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  borderColor: "var(--slate-gray)",
                  color: "var(--slate-gray)",
                  backgroundColor: "transparent",
                }}
              />
              <input
                type="tel"
                placeholder="Contact Number*"
                required
                className="w-full rounded border-2 px-4 py-3 font-sans text-base placeholder-opacity-60 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  borderColor: "var(--slate-gray)",
                  color: "var(--slate-gray)",
                  backgroundColor: "transparent",
                }}
              />
              <textarea
                placeholder="Your Message*"
                required
                rows={6}
                className="w-full resize-none rounded border-2 px-4 py-3 font-sans text-base placeholder-opacity-60 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  borderColor: "var(--slate-gray)",
                  color: "var(--slate-gray)",
                  backgroundColor: "transparent",
                }}
              />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-opacity hover:opacity-60"
                  style={{ color: "var(--slate-gray)" }}
                >
                  <Paperclip className="h-4 w-4" />
                  Attach Files
                </button>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--slate-gray)" }}
                >
                  Attachments ({attachmentCount})
                </span>
              </div>
              <button
                type="submit"
                className="w-full rounded py-4 font-mono text-sm font-semibold uppercase tracking-wider transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "var(--slate-gray)",
                  color: "var(--creame)",
                }}
              >
                Send
              </button>

            </form>
          </div>

          {/* Right: Contact Info */}
          <div>
            <h3
              className="mb-8 text-2xl font-semibold"
              style={{ color: "var(--slate-gray)" }}
            >
              Get in Touch
            </h3>
            <div className="mb-10">
              <a
                href="https://wa.me/917770095533"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-lg px-6 py-4 font-semibold transition-transform hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  backgroundColor: "var(--slate-gray)",
                  color: "var(--creame)",
                }}
              >
                <MessageSquare className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <Mail
                  className="h-6 w-6 flex-shrink-0"
                  style={{ color: "var(--slate-gray)" }}
                />
                <div>
                  <h4
                    className="mb-2 font-semibold"
                    style={{ color: "var(--slate-gray)" }}
                  >
                    Email
                  </h4>
                  <a
                    href="mailto:info@koil.in"
                    className="text-sm underline transition-opacity hover:opacity-70"
                    style={{ color: "var(--slate-gray)", opacity: 0.85 }}
                  >
                    info@koil.in
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone
                  className="h-6 w-6 flex-shrink-0"
                  style={{ color: "var(--slate-gray)" }}
                />
                <div>
                  <h4
                    className="mb-2 font-semibold"
                    style={{ color: "var(--slate-gray)" }}
                  >
                    Supply Enquiries
                  </h4>
                  <a
                    href="tel:+917770095533"
                    className="text-sm transition-opacity hover:opacity-70"
                    style={{ color: "var(--slate-gray)", opacity: 0.85 }}
                  >
                    +91 77700 95533
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Locations */}
      <div className="mx-auto mt-32 max-w-[1400px] px-6 md:px-10">
        <h2
          className="display-xl mb-16 text-center text-[clamp(2rem,5vw,4rem)]"
          style={{ color: "var(--slate-gray)" }}
        >
          Our Locations
        </h2>

        <div className="grid gap-16 md:grid-cols-2">
          {/* Works & Factory - Aligned to end */}
          <div className="flex flex-col justify-end space-y-6">
            <div className="flex gap-4">
              <MapPin
                className="h-6 w-6 flex-shrink-0"
                style={{ color: "var(--slate-gray)" }}
              />
              <div className="flex-1">
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: "var(--slate-gray)" }}
                >
                  Kanchan Oil Industries Ltd (Works & Factory)
                </h3>
                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: "var(--slate-gray)", opacity: 0.85 }}
                >
                  Kanchan Oil Industries Ltd, P.O. - Jhargram, Dist. - Paschim
                  Medinipur, West Bengal, 721507
                </p>
                <div
                  className="space-y-1 text-sm"
                  style={{ color: "var(--slate-gray)", opacity: 0.85 }}
                >
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a
                      href="tel:+919874817231"
                      className="transition-opacity hover:opacity-70"
                    >
                      +91 98748 17231
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a
                      href="mailto:info@koil.in"
                      className="transition-opacity hover:opacity-70"
                    >
                      info@koil.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed for Factory */}
            <div className="overflow-hidden rounded-lg border-2" style={{ borderColor: "var(--slate-gray)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1212.0743320924028!2d87.01170340989377!3d22.446168313961973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d7a4d789907e3%3A0xdf5acd2cc233746a!2sKanchan%20Oil%20Industries%20Ltd!5e1!3m2!1sen!2sin!4v1781343011917!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kanchan Oil Industries Factory Location"
              />
            </div>
          </div>

          {/* Registered Office */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <MapPin
                className="h-6 w-6 flex-shrink-0"
                style={{ color: "var(--slate-gray)" }}
              />
              <div className="flex-1">
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: "var(--slate-gray)" }}
                >
                  Kanchan Oil Industries Ltd (Regd. Office)
                </h3>
                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: "var(--slate-gray)", opacity: 0.85 }}
                >
                  P-336, CIT Rd, Scheme VI-M, Phoolbagan, Kankurgachi, Kolkata
                  - 700054, India
                </p>
                <div
                  className="space-y-1 text-sm"
                  style={{ color: "var(--slate-gray)", opacity: 0.85 }}
                >
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>033-4006 9070/71</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Fax: 033-4006 9072</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a
                      href="mailto:info@koil.in"
                      className="transition-opacity hover:opacity-70"
                    >
                      info@koil.in
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Open: 10:00 am - 07:00 pm, Closed on Sunday</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed for Registered Office */}
            <div className="overflow-hidden rounded-lg border-2" style={{ borderColor: "var(--slate-gray)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d302.7405880936814!2d88.38894689796923!3d22.57306750327083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027760b344a5f5%3A0x3485d6c86673f40d!2sDoctors&#39;%20Choice!5e1!3m2!1sen!2sus!4v1781345956749!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kanchan Oil Industries Registered Office Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
