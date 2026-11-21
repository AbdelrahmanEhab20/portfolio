import type { CSSProperties, ReactNode } from "react";

/**
 * Phone bezel used for mobile screenshots — in the gallery and in generated covers.
 * `width` (px) overrides the default responsive size.
 */
export function PhoneFrame({
  children,
  width,
  className = "",
  style,
}: {
  children: ReactNode;
  width?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`${/\babsolute\b/.test(className) ? "" : "relative"} rounded-[2.2rem] border border-line-strong bg-surface-2 p-2 shadow-[0_30px_60px_-30px_var(--glow)] transition-transform duration-300 group-hover:-translate-y-1 ${
        width ? "" : "w-[180px] sm:w-[200px]"
      } ${className}`}
      style={{ ...(width ? { width, borderRadius: width * 0.18, padding: width * 0.04 } : {}), ...style }}
    >
      <div
        className="relative aspect-[9/19.5] overflow-hidden rounded-[1.7rem] bg-bg"
        style={width ? { borderRadius: width * 0.145 } : undefined}
      >
        {children}
        <span
          aria-hidden
          className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black"
          style={width ? { top: width * 0.04, height: width * 0.08, width: width * 0.32 } : undefined}
        />
      </div>
    </div>
  );
}
