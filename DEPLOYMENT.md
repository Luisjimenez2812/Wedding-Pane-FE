# 🚀 Despliegue en GitHub Pages

## Configuración para GitHub Pages

### 1. Configuración del Repositorio

1. **Crear repositorio en GitHub** (si no existe)
2. **Subir código** al repositorio
3. **Configurar GitHub Pages**:
   - Ve a `Settings` > `Pages`
   - En `Source`, selecciona `Deploy from a branch`
   - Selecciona la rama `main` (o `master`)
   - En `Folder`, selecciona `/docs` o `/dist`
   - Haz clic en `Save`

### 2. Configuración de Build

El proyecto está configurado para desplegar en GitHub Pages con las siguientes configuraciones:

#### `vite.config.ts`
```typescript
base: process.env.NODE_ENV === 'production' ? '/frontend/' : '/',
```

#### `index.html`
- Script de redireccionamiento en el `<head>`
- Configurado para manejar rutas de SPA

#### `404.html`
- Página de redireccionamiento para rutas no encontradas
- Estilos elegantes consistentes con la aplicación

### 3. Comandos de Despliegue

```bash
# Construir para producción
npm run build

# Si usas /docs como carpeta de despliegue:
npm run build && cp -r dist/* docs/

# Si usas /dist como carpeta de despliegue:
npm run build
# (GitHub Pages usará automáticamente la carpeta dist)
```

### 4. Estructura de Archivos para GitHub Pages

```
tu-repositorio/
├── src/
├── public/
├── dist/          # Carpeta de build (para GitHub Pages)
├── index.html     # Configurado para SPA
├── 404.html       # Redireccionamiento
└── vite.config.ts # Configuración de base path
```

### 5. URLs de la Aplicación

Una vez desplegada, las URLs serán:

- **Página principal**: `https://tu-usuario.github.io/frontend/`
- **Login**: `https://tu-usuario.github.io/frontend/login`
- **Dashboard**: `https://tu-usuario.github.io/frontend/dashboard`
- **Invitados**: `https://tu-usuario.github.io/frontend/guests`
- **Invitación**: `https://tu-usuario.github.io/frontend/invitation/ABC123`

### 6. Solución de Problemas

#### Rutas no funcionan al refrescar
- ✅ **Solución**: Los archivos `index.html` y `404.html` están configurados correctamente
- ✅ **Verificación**: El script de redireccionamiento está en el `<head>`

#### Assets no cargan
- ✅ **Solución**: El `base` path está configurado en `vite.config.ts`
- ✅ **Verificación**: Las rutas relativas se resuelven correctamente

#### Página en blanco
- ✅ **Solución**: Verificar que el build se generó correctamente
- ✅ **Verificación**: Revisar la consola del navegador para errores

### 7. Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Desarrollo en red local
npm run dev:host

# Build para producción
npm run build

# Preview del build
npm run preview

# Preview en red local
npm run preview:host
```

### 8. Notas Importantes

- **Base Path**: Cambia `/frontend/` en `vite.config.ts` por el nombre de tu repositorio
- **CORS**: GitHub Pages no tiene problemas de CORS para archivos estáticos
- **HTTPS**: GitHub Pages proporciona HTTPS automáticamente
- **Cache**: Los navegadores pueden cachear la aplicación, usar `Ctrl+F5` para forzar recarga

### 9. Verificación del Despliegue

1. **Construir**: `npm run build`
2. **Verificar dist/**: Los archivos deben estar en la carpeta `dist/`
3. **Subir a GitHub**: Commit y push de los cambios
4. **Esperar**: GitHub Pages puede tardar unos minutos en actualizar
5. **Probar**: Visitar la URL de tu aplicación

¡Tu aplicación de boda estará lista para ser compartida con todos tus invitados! 🎉
