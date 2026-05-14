# Análisis funcional de piccolokids.com.ar

Fecha de análisis: 2026-05-14.

## Objetivo

Migrar la tienda a una experiencia frontend 100% personalizada manteniendo intactas las funciones de backend/backoffice existentes: catálogo, stock, variantes, carrito, checkout, medios de pago, envíos, cuentas de usuario, newsletter y páginas institucionales.

## Hallazgos de la tienda actual

### Navegación y categorías

- Inicio.
- Productos.
- Kids Nenes (4 a 18 años): Remeras, Pantalones, Buzos, Camperas, Camisas, Sweaters, Camperas importadas, Short/Bermudas, Trajes de Baño.
- Kids Nenas (4 a 18 años): Camisas, Remeras, Calzas/Bikers, Buzos, Pantalones, Camperas, Camperas importadas, Trajes de Baño, Short.
- feria.
- CAMPERAS IMPORTADAS.
- Contacto, Política de Devolución, ¿Cómo Comprar?, ¿Quiénes Somos?

### Funciones comerciales visibles

- Login y creación de cuenta.
- Banner de cookies.
- Carrito lateral/modal.
- Mensajes de agregado al carrito, falta de stock y carrito vacío.
- Cálculo de envío por código postal.
- Envío gratis comunicado desde $150.000 en la barra/carrito.
- Bloques institucionales con envío a todo el país, cuotas sin interés, transferencia con 15% off, cambios y devoluciones.
- Productos con variantes por color y talle.
- Precios ARS, precio por transferencia y cuotas.
- Ordenamiento del catálogo por precio, nombre, novedad y ventas.
- Filtros por categoría, color, talle y precio.
- Newsletter.
- WhatsApp, Instagram y Facebook.
- Medios de pago y medios de envío.
- Botón de arrepentimiento y defensa del consumidor.

## Arquitectura recomendada

```text
Vercel (Next.js frontend)
        |
        | HTTPS / API pública
        v
Railway (BFF / proxy / integración segura)
        |
        | APIs privadas / plataforma ecommerce actual
        v
Backend existente (sin modificar lógica operativa)
```

## Reglas para no romper backend

1. No duplicar lógica de precios, stock, cuotas, descuentos ni envíos en el frontend.
2. El frontend solo debe presentar datos y disparar acciones contra endpoints existentes o contra el BFF.
3. Las credenciales de la plataforma, pagos y envíos deben vivir en Railway, nunca en Vercel como variables públicas.
4. El carrito debe validar stock y totales contra backend en cada cambio.
5. Los mensajes comerciales del frontend deben venir idealmente de configuración o CMS para evitar hardcodear cambios operativos.

## Próximos pasos

1. Confirmar plataforma backend actual y endpoints/API disponibles.
2. Mapear endpoints de catálogo, producto, variante, carrito, checkout, usuario, newsletter y páginas institucionales.
3. Diseñar componentes frontend desacoplados de la fuente de datos.
4. Implementar adaptadores en Railway para normalizar respuestas.
5. Ejecutar migración progresiva por secciones: home, PLP, PDP, carrito, checkout.
