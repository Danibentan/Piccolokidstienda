import { commercialRules, criticalFlows } from '../../src/data/siteAudit';

export default function MigrationPlan() {
  return (
    <main className="document">
      <p className="eyebrow">Checklist funcional</p>
      <h1>Plan para rediseñar solo el frontend</h1>
      <p>
        Antes de diseñar pantallas nuevas, cada integración debe mapearse contra el backend real para que la tienda conserve el comportamiento operativo actual.
      </p>
      <h2>Backoffice y lógica que no se modifica</h2>
      <ol>{criticalFlows.map((item) => <li key={item}>{item}</li>)}</ol>
      <h2>Contenido comercial visible</h2>
      <ol>{commercialRules.map((item) => <li key={item}>{item}</li>)}</ol>
      <h2>Stack configurado</h2>
      <ul>
        <li>Vercel: despliegue del workspace <code>@piccolo/web</code> con Next.js.</li>
        <li>Railway: despliegue del workspace <code>@piccolo/api</code> como BFF/proxy hacia el backend existente.</li>
        <li>Variables: <code>NEXT_PUBLIC_API_URL</code>, <code>BACKEND_ORIGIN</code> y <code>ALLOWED_ORIGINS</code>.</li>
      </ul>
    </main>
  );
}
