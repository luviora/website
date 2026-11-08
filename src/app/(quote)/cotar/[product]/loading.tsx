import { Container } from "@/components/layout/container";

export default function QuoteLoading() {
  return (
    <Container className="py-16">
      <p className="text-muted-foreground" role="status">
        Carregando simulação…
      </p>
    </Container>
  );
}
