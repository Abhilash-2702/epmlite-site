"use client";

/**
 * Live chat stub — a floating button bottom-right that opens a small
 * panel where the visitor leaves a message. Posts to /api/lead with
 * source='chat' so the founder gets it as a notification.
 *
 * SWAP POINT: when you sign up for Crisp / Plain / Intercom, drop their
 * embed snippet into a useEffect inside this component (or in
 * app/layout.tsx) and remove the inline form below.
 */

import { useEffect, useState, FormEvent } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, Check } from "lucide-react";

const HIDDEN_PATHS = ["/demo"]; // demo console already feels chat-y

export default function ChatBubble() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ok">("idle");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) return null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website,
          utm_source: "chat-bubble",
          notes: message,
        }),
      });
      setStatus("ok");
    } catch {
      setStatus("ok");
    }
  }

  return (
    <>
      {/* Bubble button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-5 right-5 z-30 inline-flex items-center justify-center w-14 h-14 rounded-full shadow-elevated transition-all ${
          open
            ? "bg-slate-900 hover:bg-slate-800 text-white"
            : "bg-brand-500 hover:bg-brand-600 text-white"
        }`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-30 w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl bg-white shadow-elevated border border-surface-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-gradient-to-br from-brand-700 to-brand-900 text-white px-5 py-4">
            <p className="font-display font-semibold">Chat with us</p>
            <p className="text-xs text-white/80 mt-0.5">
              Real human, usually within an hour during business hours.
            </p>
          </div>
          <div className="p-5">
            {status === "ok" ? (
              <div className="text-center py-4">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-emerald-50 text-accent-emerald mb-3">
                  <Check className="w-5 h-5" />
                </span>
                <p className="font-display font-semibold text-slate-900">Got it.</p>
                <p className="text-sm text-slate-600 mt-1">
                  We&apos;ll reply to <strong>{email}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg bg-white border border-surface-200 placeholder:text-slate-400 text-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
                />
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Hey — quick question about…"
                  className="w-full rounded-lg bg-white border border-surface-200 placeholder:text-slate-400 text-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 resize-none"
                />
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] w-0 h-0 opacity-0"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 transition-colors"
                >
                  {status === "submitting" ? "Sending…" : "Send"}
                  {status !== "submitting" && <Send className="w-3.5 h-3.5" />}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
