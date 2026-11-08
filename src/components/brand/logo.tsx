import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className} aria-label="Nuviora, início">
      <Image
        src="/image/logo.png"
        alt="Nuviora"
        width={2172}
        height={724}
        priority
        className="h-8 w-auto sm:h-10"
      />
    </Link>
  );
}
