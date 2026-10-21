import { Mail, type LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";

type IconComponent = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

export type SocialLink = {
  id: "github" | "linkedin" | "mail";
  href: string;
  Icon: IconComponent;
  external: boolean;
};

export const socialLinks = [
  { 
    id: "github", 
    href: "https://github.com/tu-usuario", 
    Icon: GithubIcon,
    external: true },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/tu-usuario",
    Icon: LinkedinIcon,
    external: true,
  },
  { id: "email", 
    href: "mailto:tu@correo.com", 
    Icon: Mail,
    external: false },
] as const;

export type SocialId = (typeof socialLinks)[number]["id"];
