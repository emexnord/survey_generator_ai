import { MdAutoMode } from "react-icons/md";
import { RiMindMap } from "react-icons/ri";
import { MdOutlineIosShare } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { BentoCard, BentoGrid } from "./bento-grid";

const features = [
  {
    Icon: MdAutoMode,
    name: "Automated Generation",
    description:
      "Instantly generate well-structured survey questions from just a title, powered by AI.",
    href: "/login",
    cta: "",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: RiMindMap,
    name: "Smart Refinements",
    description:
      "Fine-tune your survey questions with AI-assisted suggestions for better clarity and engagement.",
    href: "/login",
    cta: "",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: MdOutlineIosShare,
    name: "Effortless Sharing",
    description:
      "Export and share surveys seamlessly with your team or respondents in various formats.",
    href: "/login",
    cta: "",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: MdOutlineAutoAwesome,
    name: "Context-Aware AI",
    description:
      "Generate questions that align with your topic’s intent, ensuring relevance and depth.",
    href: "/login",
    cta: "",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: FaLock,
    name: "Secure & Private",
    description:
      "Your survey data is securely processed, ensuring privacy and protection at every step.",
    href: "/login",
    cta: "",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export async function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
