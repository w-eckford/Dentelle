import './globals.css';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-5xl mx-auto p-6">
          <header className="mb-6"><h1 className="text-2xl font-semibold">Dentelle</h1></header>
          {children}
        </div>
      </body>
    </html>
  );
}

