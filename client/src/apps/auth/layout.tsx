// app/auth/layout.ts
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center bg-background px-4 py-8">
        {children}
    </div>
  );
}
