import { categories, commercialRules, criticalFlows } from '../src/data/siteAudit';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export default function Home() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Piccolo Kids · Migración frontend</p>
        <h1>Nueva tienda personalizada lista para Vercel, sin romper el backend actual.</h1>
        <p className="lead">
          Esta base separa el frontend en Next.js para Vercel y deja el backend como una capa BFF/proxy desplegable en Railway.
          El objetivo es rediseñar la experiencia visual manteniendo intactos catálogo, carrito, checkout, envíos y pagos existentes.
        </p>
        <div className="actions">
          <a href="/migration-plan">Ver plan de migración</a>
          <a className="secondary" href={`${apiUrl}/health`}>Probar API Railway</a>
        </div>
      </section>

      <section className="grid">
        <article>
          <h2>Funciones del backend a preservar</h2>
          <ul>{criticalFlows.map((flow) => <li key={flow}>{flow}</li>)}</ul>
        </article>
        <article>
          <h2>Reglas comerciales detectadas</h2>
          <ul>{commercialRules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
        </article>
      </section>

      <section className="catalogue">
        <h2>Arquitectura de categorías actual</h2>
        <div className="cards">
          {categories.map((category) => (
            <article className="card" key={category.title}>
              <h3>{category.title}</h3>
              <p>{category.items.join(' · ')}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
