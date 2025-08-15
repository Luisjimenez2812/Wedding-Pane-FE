# 🔗 Enrutamiento en GitHub Pages

## ¿Cómo Funciona el Enrutamiento?

### **Problema:**
GitHub Pages es un servidor de archivos estáticos que no entiende rutas de SPA (Single Page Application). Cuando alguien visita `/login` directamente, GitHub Pages busca un archivo llamado `login.html` que no existe, resultando en un error 404.

### **Solución Implementada:**

#### **1. Archivo `404.html`**
- **Función**: Captura todas las rutas que no existen
- **Proceso**: 
  1. Usuario visita `/login`
  2. GitHub Pages no encuentra `login.html`
  3. Sirve `404.html` en su lugar
  4. `404.html` redirige a `/?p=/login`

#### **2. Archivo `index.html`**
- **Función**: Maneja la redirección y restaura la ruta
- **Proceso**:
  1. Recibe la URL `/?p=/login`
  2. Extrae el parámetro `p`
  3. Restaura la ruta original `/login`
  4. TanStack Router maneja la navegación

#### **3. Archivo `.nojekyll`**
- **Función**: Evita que GitHub Pages procese el sitio con Jekyll
- **Necesario**: Para que los archivos se sirvan correctamente

## 🔄 Flujo Completo de Navegación

### **Escenario 1: Navegación Interna**
```
Usuario hace clic en "Login" → TanStack Router navega a /login → ✅ Funciona
```

### **Escenario 2: Acceso Directo**
```
Usuario visita /login directamente:
1. GitHub Pages busca login.html → ❌ No existe
2. Sirve 404.html → ✅ Captura la ruta
3. 404.html redirige a /?p=/login → ✅ Redirección
4. index.html restaura /login → ✅ Ruta restaurada
5. TanStack Router renderiza Login → ✅ Página mostrada
```

### **Escenario 3: Refresh de Página**
```
Usuario refresca /dashboard:
1. GitHub Pages busca dashboard.html → ❌ No existe
2. Sirve 404.html → ✅ Captura la ruta
3. 404.html redirige a /?p=/dashboard → ✅ Redirección
4. index.html restaura /dashboard → ✅ Ruta restaurada
5. TanStack Router renderiza Dashboard → ✅ Página mostrada
```

## 📁 Archivos Clave

### **`404.html`**
```javascript
// Redirige rutas no encontradas a index.html con parámetro
var redirectUrl = '/Wedding-Pane-FE/?p=' + encodeURIComponent(path + search + hash);
window.location.replace(redirectUrl);
```

### **`index.html`**
```javascript
// Restaura la ruta original desde el parámetro
var path = urlParams.get('p');
if (path) {
  var decodedPath = decodeURIComponent(path);
  window.history.replaceState(null, null, decodedPath);
}
```

### **`vite.config.ts`**
```typescript
// Configura el base path para GitHub Pages
base: process.env.NODE_ENV === 'production' ? '/Wedding-Pane-FE/' : '/',
```

## 🧪 Pruebas del Enrutamiento

### **URLs que Deben Funcionar:**
- ✅ `https://luisjimenez2812.github.io/Wedding-Pane-FE/` (Página principal)
- ✅ `https://luisjimenez2812.github.io/Wedding-Pane-FE/login` (Login)
- ✅ `https://luisjimenez2812.github.io/Wedding-Pane-FE/dashboard` (Dashboard)
- ✅ `https://luisjimenez2812.github.io/Wedding-Pane-FE/guests` (Invitados)
- ✅ `https://luisjimenez2812.github.io/Wedding-Pane-FE/invitation/ABC123` (Invitación)

### **Comportamiento Esperado:**
1. **Acceso directo**: Debe cargar la página correcta
2. **Refresh**: Debe mantener la página actual
3. **Navegación**: Debe funcionar sin recargas
4. **URLs**: Deben ser limpias (sin parámetros visibles)

## 🔧 Solución de Problemas

### **Error 404 en todas las rutas:**
- ✅ Verificar que `404.html` esté en la carpeta `dist/`
- ✅ Verificar que `.nojekyll` esté en la carpeta `dist/`
- ✅ Verificar que GitHub Pages esté configurado para usar `/dist`

### **Rutas no funcionan al refrescar:**
- ✅ Verificar que el script en `index.html` esté correcto
- ✅ Verificar que el script en `404.html` esté correcto
- ✅ Limpiar cache del navegador (Ctrl+F5)

### **Página en blanco:**
- ✅ Verificar la consola del navegador para errores
- ✅ Verificar que los assets se carguen correctamente
- ✅ Verificar que el base path esté configurado correctamente

## 🚀 Despliegue

### **Comando de Build:**
```bash
npm run build:deploy
```

### **Archivos Generados:**
```
dist/
├── index.html      # Página principal con script de redirección
├── 404.html        # Página de redirección para rutas no encontradas
├── .nojekyll       # Evita procesamiento con Jekyll
├── assets/         # CSS, JS, imágenes
└── rings.svg       # Icono de la aplicación
```

### **Subir a GitHub:**
```bash
git add .
git commit -m "Fix routing for GitHub Pages"
git push origin main
```

¡Con esta configuración, el enrutamiento debería funcionar perfectamente en GitHub Pages! 🎉
