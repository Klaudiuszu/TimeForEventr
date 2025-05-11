import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function cookies({ children }: Props) {
  return (
        <div>
          {children}
        </div>
  );
}