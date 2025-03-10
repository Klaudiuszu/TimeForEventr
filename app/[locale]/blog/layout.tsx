import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

export default function BlogLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}