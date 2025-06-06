import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function BlogArticle({ children }: Props) {
  return (
        <div>
          {children}
        </div>
  );
}