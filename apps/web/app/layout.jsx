import './styles.css';

export const metadata = {
  title: 'Piccolo Kids | Nueva tienda personalizada',
  description: 'Base de migración frontend para Piccolo Kids, lista para desplegar en Vercel y consumir el backend existente.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
