import BlurIn from "./magicui/blur-in";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div className="pb-20 pt-36 h-screen">
      <div className="flex justify-center relative my-8 md:my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <TextGenerateEffect
            words="Transforming Concepts into Reality"
            className="text-center text-[40px] md:text-5xl lg:text-7xl pb-6"
          />

          <BlurIn
            word={
              "Effortlessly generate high-quality survey questions from a simple title using AI. Save time, enhance accuracy, and get the insights you need—instantly."
            }
            className="text-center py-5 mt-2 mb-4 text-lg md:text-2xl lg:text-4xl drop-shadow-sm  "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
