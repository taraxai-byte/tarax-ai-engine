import React from 'react';

export const metadata = {
  title: 'TARAX AI Engine',
  description: 'Autonomous B2B Trade & Negotiation Engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0a0a0a' }}>
        {children}
      </body>
    </html>
  );
}
