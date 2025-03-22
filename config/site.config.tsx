import { Metadata } from "next";
import logoImg from "@/public/logo-short.svg";
import logoIconImg from "@/public/logo-short.svg";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: "AI Survey generator",
  description: `AI Survey generator is a tool that helps you create surveys using AI. It generates questions based on the title you provide.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: "Lithium",
};

export const metaObject = (
  title?: string,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Survey Generator` : siteConfig.title,
    description,
  };
};
