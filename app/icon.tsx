import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

/**
 * Favicon generated from the Student OS monogram so browser tabs match the
 * in-app brand mark. Uses the same navy/blue gradient and "S" glyph.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          borderRadius: 13,
          color: "#ffffff",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: "-1px",
        }}
      >
        S
      </div>
    ),
    size,
  );
}
