import React from "react";

const steps = [
  {
    id: "1",
    title: "Select a template",
    description: "Choose a content template to start"
  },
  {
    id: "2",
    title: "Fill the form",
    description: "Enter detailed instructions"
  },
  {
    id: "3",
    title: "Generate",
    description: "Let AI do the magic"
  }
];

export default function Work() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(step => (
            <div key={step.id} className="p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
