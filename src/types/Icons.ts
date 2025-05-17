import type { FC } from "react";
import type { SVGProps } from "react";
import Quokka from "../components/projects/SVGs/Quokka";

const iconMap: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  quokka: Quokka,
  quokka1: Quokka
};

export default iconMap
