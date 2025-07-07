import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import React from "react";
// ... outros imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}