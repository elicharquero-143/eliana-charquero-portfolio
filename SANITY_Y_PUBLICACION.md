# Sanity y publicación

## Editar contenido

El sitio ya está preparado para leer proyectos, categorías, servicios, testimonios y textos principales desde Sanity.

Para cargar proyectos conviene seguir este orden:

1. Crear las categorías en Sanity.
2. Crear cada proyecto.
3. Completar título, slug, categoría, año, descripción, rol, servicios, herramientas e imágenes.
4. Activar `featured` en los proyectos que quieras mostrar en Home.

Si Sanity todavía no tiene contenido, la web usa los proyectos locales actuales como respaldo.

## Variables necesarias

En local:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=nbqf9vde
NEXT_PUBLIC_SANITY_DATASET=production
```

En Vercel hay que agregar las mismas variables en Project Settings > Environment Variables.

## Sanity Studio

El panel local queda disponible en:

```txt
http://localhost:3004/studio
```

Si aparece un aviso de CORS, hay que agregar este origen en el proyecto de Sanity:

```txt
http://localhost:3004
```

Cuando el sitio esté publicado, también hay que agregar el dominio final de Vercel como origen permitido.

## Próximos pasos para publicar

1. Iniciar sesión en Sanity y permitir el origen local.
2. Crear un repositorio en GitHub y subir el proyecto.
3. Crear un proyecto en Vercel conectado a ese repositorio.
4. Agregar las variables de entorno de Sanity en Vercel.
5. Agregar el dominio de Vercel en CORS de Sanity.
6. Hacer el primer deploy.
