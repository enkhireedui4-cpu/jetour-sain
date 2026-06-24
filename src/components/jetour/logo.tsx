// JETOUR wordmark — italic, bold, with the red-blue gradient accent

type Props = {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
};

export function JetourLogo({ className = "", size = "md", showTagline = true }: Props) {
  const sizeMap = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-5xl",
  };

  return (
    <div className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`font-display font-extrabold italic tracking-tight ${sizeMap[size]} text-paper`}
        style={{ letterSpacing: "-0.02em" }}
      >
        JETOUR
      </span>
      {showTagline && (
        <span
          className="font-display font-bold not-italic mt-1"
          style={{
            fontSize: size === "lg" ? "0.75rem" : "0.62rem",
            letterSpacing: "0.34em",
            background: "linear-gradient(92deg, #E2231A, #2B6FE0)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          MONGOLIA
        </span>
      )}
    </div>
  );
}

export function SainMotorsMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display font-extrabold italic tracking-tight ${className}`}
      style={{ letterSpacing: "-0.01em" }}
    >
      <span className="text-paper">SAIN</span>{" "}
      <span
        style={{
          background: "linear-gradient(92deg, #E2231A, #2B6FE0)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        MOTORS
      </span>
    </span>
  );
}
