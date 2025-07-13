import type { FC } from "react";
import type { SVGProps } from "react";
import {
  Quokka,
  Pizza,
  Coffee,
  Gym,
  GermanFlag,
  FrenchFlag,
  SpanishFlag,
  EnglishFlag,
  TurkishFlag,
  Timer,
  Crawler,
} from "../components/projects/SVGs";

const iconMap: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  quokka: Quokka,
  "marios-pizza-villa": Pizza,
  "jazzed-sips": Coffee,
  german: GermanFlag,
  french: FrenchFlag,
  spanish: SpanishFlag,
  english: EnglishFlag,
  turkish: TurkishFlag,
  gym: Gym,
  timer: Timer,
  crawler: Crawler,
};

export default iconMap;
