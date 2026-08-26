import { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Use "dark" on dark navy sections to keep the label legible. */
  tone?: "light" | "dark";
};

/**
 * Small uppercase section label with a leading hairline rule.
 * Encodes the "chapter" feel of the reference design.
 */
const Eyebrow = ({
  children,
  align = "left",
  className = "",
  tone = "light",
}: EyebrowProps) => {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      <span
        className={`h-px w-7 ${tone === "dark" ? "bg-primary/60" : "bg-primary/50"}`}
      />
      <span
        className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
          tone === "dark" ? "text-primary" : "text-primary"
        }`}
      >
        {children}
      </span>
    </div>
  );
};

export default Eyebrow;
