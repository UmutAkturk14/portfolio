import type { FC } from "react";
import type { SVGProps } from "react";
import Quokka from "../components/projects/SVGs/Quokka";
import Pizza from "../components/projects/SVGs/Pizza"

const iconMap: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  quokka: Quokka,
  "marios-pizza-villa": Pizza
};

export default iconMap
