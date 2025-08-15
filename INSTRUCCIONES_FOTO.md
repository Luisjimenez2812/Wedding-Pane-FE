# 📸 Instrucciones para la Foto de los Novios

## ✅ Foto Configurada

¡Perfecto! Tu imagen `Image01.jpg` ya está configurada y se mostrará automáticamente en la página principal.

### Ubicación de la imagen
- **Archivo**: `src/assets/Image01.jpg`
- **Componente**: `src/components/CouplePhoto.tsx`

### Cómo cambiar la imagen

Si quieres usar una imagen diferente:

1. **Reemplaza la imagen** en `src/assets/Image01.jpg`
2. **O agrega una nueva imagen** y actualiza la importación en `src/components/CouplePhoto.tsx`:
   ```tsx
   import coupleImage from '../assets/tu-nueva-imagen.jpg'
   ```



## Formatos de imagen recomendados

- **Formato**: JPG, PNG, WebP
- **Tamaño**: 600x800 píxeles o similar (proporción 3:4)
- **Peso**: Menos de 500KB para mejor rendimiento
- **Calidad**: Alta resolución para que se vea nítida

## Consejos para la foto

- **Orientación**: Vertical (portrait) funciona mejor
- **Fondo**: Preferiblemente con fondo simple o desenfocado
- **Iluminación**: Buena iluminación natural
- **Composición**: Los novios centrados en la imagen

## Personalización adicional

Si quieres cambiar el tamaño o estilo de la foto, edita los estilos en `src/index.css`:

```css
.couple-photo {
  width: 300px;  /* Cambia el ancho */
  height: 400px; /* Cambia el alto */
  /* ... otros estilos */
}
```

¡Tu foto se verá perfecta en el diseño elegante que hemos creado! 🎉
