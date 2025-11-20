import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Student Mentorship Platform',
  description:
    'Connect students with mentors for academic guidance and career development',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}