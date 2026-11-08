import { Briefcase, Car, Smartphone } from "lucide-react";
import type { ChoiceCardOption } from "@/features/quotes/components/choice-cards-field";

export const AUTO_USAGE_OPTIONS: ChoiceCardOption[] = [
  {
    value: "particular",
    label: "Particular",
    description: "Uso no dia a dia, lazer e trajeto casa-trabalho.",
    icon: Car,
  },
  {
    value: "commercial",
    label: "Comercial / trabalho",
    description: "Visitas, entregas ou deslocamento a trabalho com frequência.",
    icon: Briefcase,
  },
  {
    value: "app",
    label: "Aplicativo",
    description: "Motorista de app (Uber, 99 e similares).",
    icon: Smartphone,
  },
];
