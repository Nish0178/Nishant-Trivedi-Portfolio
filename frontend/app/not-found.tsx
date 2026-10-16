import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        background: "var(--paper)",
        color: "var(--ink)",
        fontFamily: "var(--d)",
      }}
    >
      <div style={{ maxWidth: "32rem" }}>
        <h1
          style={{
            fontSize: "clamp(5rem, 15vw, 10rem)",
            fontWeight: 800,
            lineHeight: 0.85,
            fontStretch: "62%",
            textTransform: "uppercase",
            color: "var(--ac)",
            marginBottom: "1.5rem",
          }}
        >
          404
        </h1>
        <p className="serif" style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
          Page not found
        </p>
        <p className="mono mute" style={{ marginBottom: "2rem" }}>
          This coordinate does not exist in the index of works.
        </p>
        <Link href="/" className="btn f">
          ← Return to index
        </Link>
      </div>
    </div>
  );
}
