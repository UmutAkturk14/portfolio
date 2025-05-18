import type { FC } from "react";
import type { SVGProps } from "react";
import Quokka from "../components/projects/SVGs/Quokka";
import Pizza from "../components/projects/SVGs/Pizza"
import Coffee from "../components/projects/SVGs/Coffee"

const iconMap: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  quokka: Quokka,
  "marios-pizza-villa": Pizza,
  "jazzed-sips": Coffee
};

export default iconMap
