import {
  BookOpenTextIcon,
  MessageCircleMore,
  PencilIcon,
} from "lucide-react";

const features = [
  {
    title: "Learn at Your Own Pace",
    description:
      "Whether you're a beginner or an advanced coder, AlgoMentor tailors the learning experience to your needs.",
    icon: BookOpenTextIcon,
    color: "#14b8a6",
  },
  {
    title: "Instant Feedback",
    description:
      "Get immediate insights on your progress and understand where you can improve.",
    icon: MessageCircleMore,
    color: "#3b82f6",
  },
  {
    title: "Hands-on Practice",
    description:
      "Solve real-world problems and get guided solutions that will help you crack the toughest interviews.",
    icon: PencilIcon,
    color: "#f59e0b",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-8 my-10">
      <h2 className="text-4xl font-semibold text-center">
        Why Choose AlgoMentor?
      </h2>
      <p className="text-lg mt-4 text-center">
        Unlock your coding potential with personalized, AI-driven insights.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center p-6 rounded-lg shadow-md`}
          >
            <div
              className={`flex items-center justify-center w-min aspect-square p-3 mb-6 rounded-full`}
              style={{backgroundColor: feature.color, boxShadow: `0 6px 15px ${feature.color}80`}}
            >
              <feature.icon size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <div
              className={`w-20 h-[2px] rounded-full my-4`}
              style={{backgroundColor: feature.color, boxShadow: `0 2px 6px ${feature.color}80`}}
            />
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
