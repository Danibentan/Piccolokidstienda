import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  title: 'Piccolo Kids | Nueva tienda personalizada',
  description: 'Base de migración frontend para Piccolo Kids, lista para desplegar en Vercel y consumir el backend existente.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
