interface IServerError {
  error: string;
  message: string;
  statusCode: number;
}

export function ServerErrors({ error }: { error: IServerError }) {
  if (!error) return null;

  return (
    <div
      style={{
        color: "red",
        fontSize: "14px",
        fontStyle: "italic",
        marginTop: "5px",
        textAlign: "center",
      }}
    >
      {error.message}
    </div>
  );
}
