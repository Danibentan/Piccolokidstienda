# Piccolo Kids · Migración frontend

Base inicial para migrar `https://www.piccolokids.com.ar/` hacia una tienda personalizada manteniendo la lógica del backend/backoffice existente.

## Stack configurado

- **Frontend:** Next.js en `apps/web`, preparado para desplegar en **Vercel**.
- **Backend/BFF:** Express en `apps/api`, preparado para desplegar en **Railway** como proxy/controlador de integración con el backend actual.
- **Monorepo:** npm workspaces para separar frontend y API.

## Variables de entorno

Copiar `.env.example` y configurar en cada proveedor:

- `NEXT_PUBLIC_API_URL`: URL pública del servicio Railway.
- `BACKEND_ORIGIN`: URL del backend/plataforma actual que se debe preservar.
- `ALLOWED_ORIGINS`: dominios autorizados a consumir el BFF.

## Despliegue

### Vercel

### Configuración obligatoria de Vercel

En Vercel, el proyecto que publica la tienda debe apuntar al frontend:

```txt
Root Directory: apps/web
```

No usar `apps/api` como Root Directory en Vercel. `apps/api` es el BFF/API y se despliega en Railway. Si Vercel queda apuntando a `apps/api`, el deploy va a fallar o va a intentar publicar el servicio equivocado.

Con `Root Directory: apps/web`, Vercel usa `apps/web/vercel.json` y ejecuta:

```bash
npm install --no-audit --no-fund
npm run build
```

1. Importar este repositorio.
2. En **Project Settings > General**, configurar `Root Directory` como `apps/web` para publicar la tienda. Si el proyecto quedó creado con `apps/api`, cambiarlo a `apps/web` antes de redeployar.
3. En **Project Settings > Build & Development Settings**, borrar overrides manuales antiguos como `npm install --prefix apps/web`; dejar que Vercel use `apps/web/vercel.json` o configurar Install Command como `npm install --no-audit --no-fund` y Build Command como `npm run build`.
> Nota de compatibilidad: el repo incluye `apps/web/apps/web` como enlace simbólico hacia `apps/web` para tolerar deployments de Vercel que todavía tengan guardado el override viejo `npm install --prefix apps/web` mientras el Root Directory ya es `apps/web`. Aun así, la configuración correcta es borrar ese override y usar `npm install --no-audit --no-fund`.

4. Definir `NEXT_PUBLIC_API_URL` con la URL generada por Railway.
5. Redeployar el commit más nuevo; si Vercel muestra el commit `4f12ad2`, todavía está usando una versión vieja y hay que redeployar el último commit de la rama.

### Railway

1. Crear un servicio desde este repositorio.
2. Usar el `railway.json` de la raíz del repo para instalar, construir y arrancar solamente `apps/api`.
3. Definir `BACKEND_ORIGIN` y `ALLOWED_ORIGINS`.
4. Verificar `/health` después del deploy.

## Desarrollo local

```bash
cd apps/web && npm install
cd ../api && npm install
cd ../..
npm run dev:web
npm run dev:api
```

## Principio de migración

El frontend nuevo se implementa en `apps/web`. La carpeta `apps/api` no reemplaza la lógica comercial: funciona como capa de compatibilidad para conectar la UI nueva con el backend actual o futuro sin exponer secretos al navegador.
