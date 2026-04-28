"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Check, Activity, FileEdit } from "lucide-react";
import { DEMO_MAILTO } from "@/lib/constants";
import VideoOrMockup from "@/components/animated/VideoOrMockup";
import LiveChat from "@/components/animated/LiveChat";

const microFeatures = [
  {
    Icon: FileEdit,
    title: "Drafts every change",
    body: "User clicks Post to commit. Nothing auto-writes.",
  },
  {
    Icon: Zap,
    title: "15 forecast algorithms",
    body: "Linear, ARIMA, Holt-Winters, gradient boosting, etc.",
  },
  {
    Icon: Check,
    title: "Audit trail on writes",
    body: "Before/after diff + actor + timestamp, forever.",
  },
  {
    Icon: Activity,
    title: "Streams in real time",
    body: "SSE — you see the tool running, not a blank spinner.",
  },
];

const examplePrompts = [
  "What's December revenue for Singapore consulting?",
  "Hire 3 engineers and show the impact on runway",
  "Update JPY exchange rate to 150",
  "Download this dashboard as PDF",
];

export default function ChatShowcase() {
  return (
    <section className="bg-surface-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold text-accent-emerald uppercase tracking-wider mb-3">
            The differentiator
          </p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 tracking-tight text-balance">
            Ask in English. Get drafts, charts, and forecasts.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Your analyst team multiplied. Every answer cites its source.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <VideoOrMockup videoSrc="/videos/ai-chat.mp4" ariaLabel="EPM Lite AI chat live demo">
              <LiveChat />
            </VideoOrMockup>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {microFeatures.map((m) => (
              <div
                key={m.title}
                className="flex items-start gap-4 rounded-xl bg-white border border-surface-200 p-5"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-50 text-brand-600 shrink-0">
                  <m.Icon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-display font-semibold text-slate-900">{m.title}</h3>
                  <p className="text-sm text-slate-600 mt-0.5">{m.body}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-10 rounded-2xl bg-white border border-surface-200 p-6 lg:p-8">
          <p className="text-sm font-semibold text-slate-700 mb-4">
            Real prompts the chat handles today:
          </p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-full bg-surface-50 border border-surface-200 px-3 py-1.5 text-xs font-mono text-slate-600"
              >
                &ldquo;{p}&rdquo;
              </span>
            ))}
          </div>
          <div className="mt-6">
            <a
              href={DEMO_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-3 transition-colors shadow-card hover:shadow-card-hover"
            >
              Want to try it on your data? Book a 15-min demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
