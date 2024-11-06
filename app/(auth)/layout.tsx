import styles from "./layout.module.css";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div className={styles.authLayout}>{children}</div>;
}
