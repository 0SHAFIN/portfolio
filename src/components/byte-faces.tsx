type ByteExpression = "happy" | "wink" | "curious";

/** Small pixel portraits that extend the existing Byte brand mark. */
export default function ByteFace({ expression }: { expression: ByteExpression }) {
  return (
    <svg className="ticker-face" data-expression={expression} viewBox="0 0 64 64" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M27 1h7v6h-7zM29 7h4v8h-4z" fill="#173e35" />
      <path d="M28 1h5v4h-5z" fill="#ef9650" />
      <path d="M18 12h31v4h7v6h5v22h-5v7h-7v4H18v-4h-7v-7H7V22h4v-6h7z" fill="#173e35" />
      <path d="M18 16h30v4h5v26h-5v5H18v-5h-4V22h4z" fill="#f6e9bd" />
      <path d="M9 24h6v17H9zm45 2h5v14h-5z" fill="#e58a48" />
      <path d="M24 21h25v25H24z" fill="#153c33" />
      <path d="M25 22h6v3h-3v5h-3z" fill="#47785b" />
      <path d="M17 24h3v3h-3zm0 7h3v3h-3zm0 7h3v3h-3z" fill="#406a55" />
      {expression === "happy" ? (
        <>
          <path className="ticker-face-eyes" d="M28 29h5v7h-5zm12 0h5v7h-5z" fill="#a7e2a4" />
          <path d="M32 39h3v2h5v-2h3v4H32z" fill="#a7e2a4" />
        </>
      ) : expression === "wink" ? (
        <>
          <path className="ticker-face-eyes" d="M28 28h5v8h-5z" fill="#a7e2a4" />
          <path d="M40 31h6v3h-6zm-8 8h10v3H32zm5 3h4v3h-4z" fill="#a7e2a4" />
        </>
      ) : (
        <>
          <path className="ticker-face-eyes" d="M28 30h5v6h-5zm12-3h6v9h-6z" fill="#a7e2a4" />
          <path d="M39 23h8v2h-8zm-5 16h5v5h-5z" fill="#a7e2a4" />
          <path d="M35 40h3v3h-3z" fill="#153c33" />
        </>
      )}
      <path d="M18 52h29v5H32v4H16v-4H8v-4h10z" fill="#24766b" />
      <path d="M17 53h27v2H29v3H16v-3H9v-2z" fill="#52a88b" />
    </svg>
  );
}
