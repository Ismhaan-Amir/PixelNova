import React from "react";
import { Cpu, Sparkles, ShieldCheck, Zap } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="py-28 px-6 bg-[#020618] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-5xl font-extrabold mb-6">
            Built to Turn Ideas Into Output
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Aether AI is a focused AI SaaS platform designed for creators,
            developers, and teams who care about speed, clarity, and results —
            not bloated tools or empty promises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<Cpu size={28} />}
            title="Purpose-Driven AI"
            desc="Every tool in Aether AI is built to solve a specific problem — from writing to image generation — without unnecessary complexity."
          />

          <Feature
            icon={<Zap size={28} />}
            title="Speed First"
            desc="Optimized workflows and fast inference mean less waiting and more creating."
          />

          <Feature
            icon={<ShieldCheck size={28} />}
            title="Secure by Design"
            desc="Your data stays yours. Privacy, isolation, and control are built into the foundation."
          />

          <Feature
            icon={<Sparkles size={28} />}
            title="Made for Builders"
            desc="Aether AI is crafted for people who ship — not just experiment."
          />
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default AboutUs;
