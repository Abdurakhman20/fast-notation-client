"use client";

export function ZodErrors({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div
      key={index}
      style={{
        color: "red",
        fontSize: "14px",
        fontStyle: "italic",
        marginTop: "5px",
      }}
    >
      {err}
    </div>
  ));
}
