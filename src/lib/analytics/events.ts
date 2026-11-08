export type AnalyticsEvent =
  | "homepage_view"
  | "product_selected"
  | "quote_started"
  | "quote_step_viewed"
  | "quote_validation_failed"
  | "quote_review_viewed"
  | "quote_demo_completed"
  | "quote_submitted";

export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>,
) {
  if (process.env.NODE_ENV === "development") {
    // Telemetria sem PII — preparada para integração futura
    console.debug("[analytics]", event, properties);
  }
}
