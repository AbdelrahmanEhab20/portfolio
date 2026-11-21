import Image from "next/image";

export function LogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/brand/logo-mark.svg"
      alt=""
      width={size}
      height={size}
      className={`rounded-[25%] ${className}`}
      priority
    />
  );
}
