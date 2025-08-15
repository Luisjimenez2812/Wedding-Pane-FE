# 🎉 Aplicación Web de Boda

Una aplicación web moderna para gestionar una boda, construida con React, TypeScript y TanStack Router.

## ✨ Características

- **Landing Page**: Página principal con información de la boda
- **Sistema de Login**: Acceso administrativo para los novios
- **Dashboard**: Panel de control con estadísticas y gestión
- **Control de Invitados**: Gestión completa de la lista de invitados
- **Invitaciones Individuales**: Páginas personalizadas para cada invitado con RSVP

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework de interfaz de usuario
- **TypeScript** - Tipado estático
- **TanStack Router** - Enrutamiento moderno y type-safe
- **Vite** - Build tool y servidor de desarrollo
- **CSS3** - Estilos modernos con diseño responsive

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run dev:host` - Inicia el servidor de desarrollo accesible en la red local
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run preview:host` - Previsualiza la build accesible en la red local
- `npm run lint` - Ejecuta el linter
- `npm run router:generate` - Regenera las rutas de TanStack Router

#### 🎨 Comandos de Formateo
- `npm run format` - Formatea archivos de src/
- `npm run format:check` - Verifica formato sin cambios
- `npm run format:all` - Formatea todos los archivos
- `npm run code:fix` - Formatea y corrige errores de linting
- `npm run code:check` - Verifica formato y linting

#### 🌐 Comandos de Hosting
- `npm run dev:host` - Comparte la aplicación en desarrollo en tu red local
- `npm run preview:host` - Comparte la versión de producción en tu red local

> 📖 Ver `COMANDOS_HOSTING.md` para instrucciones detalladas sobre cómo compartir la aplicación.

## 📁 Estructura del Proyecto

```
src/
├── routes/                 # Rutas de TanStack Router
│   ├── __root.tsx         # Ruta raíz
│   ├── index.tsx          # Landing page
│   ├── login.tsx          # Página de login
│   ├── dashboard.tsx      # Panel administrativo
│   ├── guests.tsx         # Control de invitados
│   └── invitation.$invitationId.tsx  # Invitación individual
├── components/            # Componentes reutilizables
├── pages/                 # Páginas adicionales
├── main.tsx              # Punto de entrada
├── index.css             # Estilos globales
└── routeTree.gen.ts      # Rutas generadas automáticamente
```

## 🛣️ Rutas Disponibles

- `/` - Página principal (Landing Page)
- `/login` - Acceso administrativo
- `/dashboard` - Panel de administración
- `/guests` - Control de invitados
- `/invitation/:id` - Invitación individual (ej: `/invitation/ABC123`)

## 🎨 Personalización

### Cambiar Información de la Boda

Edita los siguientes archivos para personalizar la información:

- `src/routes/index.tsx` - Información principal de la boda
- `src/routes/invitation.$invitationId.tsx` - Detalles de las invitaciones

### Modificar Estilos

Los estilos están en `src/index.css` y están organizados por secciones:

- Landing Page Styles
- Login Page Styles  
- Dashboard Styles
- Guests Page Styles
- Invitation Page Styles

### Agregar Nuevas Rutas

1. Crea un nuevo archivo en `src/routes/`
2. Usa `createFileRoute` de TanStack Router
3. Ejecuta `npm run router:generate` para actualizar las rutas

## 🔧 Configuración de TanStack Router

La aplicación utiliza TanStack Router para el enrutamiento. Las rutas se generan automáticamente basándose en la estructura de archivos en `src/routes/`.

### Generar Rutas

Si agregas nuevas rutas, ejecuta:
```bash
npm run router:generate
```

### Tipos TypeScript

TanStack Router proporciona tipado completo para las rutas. Los tipos se generan automáticamente en `src/routeTree.gen.ts`.

## 📱 Diseño Responsive

La aplicación está diseñada para funcionar en todos los dispositivos:

- **Desktop**: Layout completo con navegación lateral
- **Tablet**: Adaptación de grids y navegación
- **Mobile**: Navegación optimizada y controles táctiles

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Despliegue en Vercel/Netlify

1. Conecta tu repositorio a Vercel o Netlify
2. Configura el directorio de build como `dist`
3. El comando de build será `npm run build`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación de [TanStack Router](https://tanstack.com/router)
2. Abre un issue en el repositorio
3. Contacta al equipo de desarrollo

---

¡Feliz desarrollo! 🎉
