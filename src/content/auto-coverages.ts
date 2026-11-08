import type { LucideIcon } from "lucide-react";
import {
  Car,
  CarFront,
  GlassWater,
  Headset,
  Layers,
  Shield,
  Users,
} from "lucide-react";

export type AutoCoverageOption = {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Seleciona todas as coberturas individuais. */
  selectsAll?: boolean;
};

/** Coberturas individuais (sem a opção “todas”). */
export const AUTO_COVERAGE_VALUES = [
  "collision",
  "theft",
  "thirdParty",
  "glass",
  "assistance",
  "spareCar",
] as const;

export type AutoCoverageValue = (typeof AUTO_COVERAGE_VALUES)[number];

export const AUTO_COVERAGES: AutoCoverageOption[] = [
  {
    value: "all",
    label: "Todas as coberturas",
    description:
      "Receber o pacote completo nas propostas dos parceiros, sem deixar nada de fora.",
    icon: Layers,
    selectsAll: true,
  },
  {
    value: "collision",
    label: "Colisão e danos",
    description: "Proteção para batidas, capotamentos e danos ao seu carro.",
    icon: Car,
  },
  {
    value: "theft",
    label: "Roubo e furto",
    description: "Cobertura se o veículo for roubado ou furtado.",
    icon: Shield,
  },
  {
    value: "thirdParty",
    label: "Terceiros (RCF-V)",
    description: "Danos materiais e corporais a outras pessoas no trânsito.",
    icon: Users,
  },
  {
    value: "glass",
    label: "Vidros",
    description: "Para-brisa, laterais e demais vidros em caso de quebra.",
    icon: GlassWater,
  },
  {
    value: "assistance",
    label: "Assistência 24h",
    description: "Guincho, pane seca, chaveiro e suporte quando precisar.",
    icon: Headset,
  },
  {
    value: "spareCar",
    label: "Carro reserva",
    description: "Um veículo substituto enquanto o seu estiver parado.",
    icon: CarFront,
  },
];
