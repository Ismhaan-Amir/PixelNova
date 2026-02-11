import { Edit, Hash, Image, Eraser, Edit2Icon } from "lucide-react";

const FeatureCard = ({ icon, title, description }) => {
  const Icon = icon;

  return (
    <div
      className="group p-8 border rounded-2xl transition-all duration-300 hover:opacity-80"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#7f818a",
      }}
    >
      <div
        className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl"
        style={{
          color: "#ffffff",
          backgroundColor: "#432dd7",
        }}
      >
        <Icon size={24} />
      </div>

      <h3
        className="text-xl font-bold mb-3 uppercase tracking-wider"
        style={{ color: "#020618" }}
      >
        {title}
      </h3>

      <p
        className="leading-relaxed font-medium"
        style={{ color: "#7f818a" }}
      >
        {description}
      </p>
    </div>
  );
};

export default function Feature() {
const features = [
  {
    icon: Edit,
    title: "AI Article Writer",
    description:
      "Generate well-structured, engaging articles in seconds using AI trained to match your tone, topic, and audience.",
  },
  {
    icon: Hash,
    title: "Avatar Generator",
    description:
      "Generate unique, eye catching avatars instantly to represent your online identity with style.",
  },
  {
    icon: Image,
    title: "Background Remover",
    description:
      "Instantly remove image backgrounds to create clean, professional visuals effortlessly.",
  },
  {
    icon: Eraser,
    title: "Object Remover",
    description:
    "Quickly erase unwanted objects from images for flawless, distraction-free visuals."
  },
  {
    icon: Edit,
    title: "Meme Generator",
    description:
      "Create hilarious, shareable memes instantly to entertain and engage your audience."
  },
  {
    icon: Edit,
    title: "Resume Review",
    description:
      "Analyze and improve your resume with AI-powered feedback to increase clarity, impact, and hiring success.",
  },
];



  return (
    <div
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 font-sans"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2
            className="font-bold tracking-[0.2em] uppercase text-xs mb-4"
            style={{ color: "#7f818a" }}
          >
            Platform Features
          </h2>

          <h1
            className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase"
            style={{ color: "#020618" }}
          >
            Everything you need to scale
          </h1>

          <div
            className="w-24 h-1.5 mx-auto mb-8"
            style={{ backgroundColor: "#7f818a" }}
          />

          <p
            className="text-lg leading-relaxed font-semibold italic"
            style={{ color: "#7f818a" }}
          >
            Our comprehensive suite of tools helps you build, deploy, and scale
            your applications faster than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
