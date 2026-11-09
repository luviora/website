import Image from "next/image";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className} aria-label="Nuviora, início">
      <Image
        src="/image/logo.png"
        alt="Nuviora"
        width={160}
        height={53}
        sizes="128px"
        quality={75}
        className="h-8 w-auto sm:h-10"
      />
    </Link>
  );
}
