# Comandos de Hosting - Aplicación de Boda

## 🚀 Compartir la aplicación en tu red local

### Para desarrollo (modo desarrollo):
```bash
npm run dev:host
```

### Para producción (después de hacer build):
```bash
npm run build
npm run preview:host
```

## 📱 Cómo acceder desde otros dispositivos

1. **Ejecuta uno de los comandos anteriores**
2. **Vite mostrará las URLs disponibles**, por ejemplo:
   ```
   Local:   http://localhost:5173/
   Network: http://192.168.1.100:5173/
   ```
3. **Usa la URL de "Network"** para acceder desde otros dispositivos en tu red

## 🔧 Detalles técnicos

- **`dev:host`**: Inicia el servidor de desarrollo y lo hace accesible en la red local
- **`preview:host`**: Sirve la versión de producción (build) y la hace accesible en la red local
- **Puerto por defecto**: 5173 (puede cambiar si está ocupado)
- **Hot reload**: Funciona en modo desarrollo para cambios en tiempo real

## 📋 Requisitos

- Todos los dispositivos deben estar en la misma red WiFi/LAN
- El firewall de Windows debe permitir conexiones al puerto 5173
- La aplicación debe estar ejecutándose en tu computadora

## 🛡️ Seguridad

- Solo funciona en tu red local
- No es accesible desde Internet
- Perfecto para pruebas y compartir con familiares/amigos

## 💡 Consejos

- **Para compartir con familiares**: Usa `dev:host` durante desarrollo
- **Para presentación final**: Usa `preview:host` con la versión de producción
- **Si no funciona**: Verifica que el firewall no esté bloqueando el puerto
- **Cambiar puerto**: Si 5173 está ocupado, Vite automáticamente usará el siguiente disponible
