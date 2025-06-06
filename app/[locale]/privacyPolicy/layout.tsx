import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PrivacyPolicyLayout({ children }: Props) {
  return (
        <div>
          {children}
        </div>
  );
}