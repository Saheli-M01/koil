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
              Visit Our Facility
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

            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin
                  className="h-6 w-6 flex-shrink-0"
                  style={{ color: "var(--slate-gray)" }}
                />
                <div>
                  <h4
                    className="mb-2 font-semibold"
                    style={{ color: "var(--slate-gray)" }}
                  >
                    Kanchan Oil Industries Ltd (Regd. Office)
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--slate-gray)", opacity: 0.85 }}
                  >
                    P-336, CIT Rd, Scheme VI-M, Phoolbagan, Kankurgachi,
                    Kolkata – 700054, India
                  </p>
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
                    Contact
                  </h4>
                  <div
                    className="space-y-1 text-sm"
                    style={{ color: "var(--slate-gray)", opacity: 0.85 }}
                  >
                    <div>Mobile: +91 77700 95533</div>
                    <div>Phone: 033-4006 9070/71</div>
                    <div>Fax: 033-4006 9072</div>
                    <div>
                      Email:{" "}
                      <a
                        href="mailto:info@koil.in"
                        className="underline hover:opacity-70"
                      >
                        info@koil.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock
                  className="h-6 w-6 flex-shrink-0"
                  style={{ color: "var(--slate-gray)" }}
                />
                <div>
                  <h4
                    className="mb-2 font-semibold"
                    style={{ color: "var(--slate-gray)" }}
                  >
                    Operating Hours
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--slate-gray)", opacity: 0.85 }}
                  >
                    Open today 10:00 am – 07:00 pm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
