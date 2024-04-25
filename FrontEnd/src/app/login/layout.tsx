import React from "react";
import AppProviders from "@/providers/appProviders/indext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProviders>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AppProviders>
  );
}
