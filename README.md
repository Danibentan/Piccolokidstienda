# Piccolo Kids · Migración frontend

Base inicial para migrar `https://www.piccolokids.com.ar/` hacia una tienda personalizada manteniendo la lógica del backend/backoffice existente.

## Stack configurado

- **Frontend:** Next.js en `apps/web`, preparado para desplegar en **Vercel**.
- **Backend/BFF:** Express en `apps/api`, preparado para desplegar en **Railway** como proxy/controlador de integración con el backend actual.
- **Monorepo:** npm workspaces para separar frontend, API y código compartido.

## Variables de entorno

Copiar `.env.example` y configurar en cada proveedor:

- `NEXT_PUBLIC_API_URL`: URL pública del servicio Railway.
- `BACKEND_ORIGIN`: URL del backend/plataforma actual que se debe preservar.
- `ALLOWED_ORIGINS`: dominios autorizados a consumir el BFF.

## Despliegue

### Vercel

1. Importar este repositorio.
2. Mantener la configuración raíz con `vercel.json`.
3. Definir `NEXT_PUBLIC_API_URL` con la URL generada por Railway.
4. Build command: `npm run build --workspace @piccolo/web`.

### Railway

1. Crear un servicio desde este repositorio.
2. Usar el `railway.json` de la raíz del repo para construir y arrancar `@piccolo/api`.
3. Definir `BACKEND_ORIGIN` y `ALLOWED_ORIGINS`.
4. Verificar `/health` después del deploy.

## Desarrollo local

```bash
npm install
npm run dev:web
npm run dev:api
```

## Principio de migración

El frontend nuevo se implementa en `apps/web`. La carpeta `apps/api` no reemplaza la lógica comercial: funciona como capa de compatibilidad para conectar la UI nueva con el backend actual o futuro sin exponer secretos al navegador.
