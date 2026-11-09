type WebVitalMetric = {
  id: string;
  name: string;
  value: number;
  rating?: string;
  delta?: number;
  navigationType?: string;
};

type GtagFunction = (
  command: "event",
  eventName: string,
  params: Record<string, string | number | boolean>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFunction;
  }
}

/** Sem PII — só métricas de performance da sessão. */
export function reportWebVital(metric: WebVitalMetric) {
  const payload = {
    name: metric.name,
    value: Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value,
    ),
    id: metric.id,
    rating: metric.rating ?? "",
    delta: metric.delta ?? 0,
    navigationType: metric.navigationType ?? "",
    path:
      typeof window !== "undefined"
        ? window.location.pathname.slice(0, 120)
        : "",
  };

  if (process.env.NODE_ENV === "development") {
    console.debug("[web-vitals]", payload);
  }

  // GA4 (quando NEXT_PUBLIC_GA_MEASUREMENT_ID estiver configurado)
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", metric.name, {
      value: payload.value,
      metric_id: metric.id,
      metric_rating: payload.rating,
      metric_delta: Math.round(payload.delta),
      non_interaction: true,
    });
  }
}
