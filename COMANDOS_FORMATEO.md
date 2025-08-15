# 🎨 Comandos de Formateo de Código

## 📋 Comandos Disponibles

### Formateo Básico
```bash
# Formatear solo archivos de src/
npm run format

# Verificar formato sin cambiar archivos
npm run format:check

# Formatear todos los archivos del proyecto
npm run format:all
```

### Comandos Combinados
```bash
# Formatear y corregir errores de linting
npm run code:fix

# Verificar formato y linting sin cambios
npm run code:check
```

## 🔧 Configuración de Prettier

### Archivo `.prettierrc`
```json
{
  "semi": true,              // Punto y coma al final
  "trailingComma": "es5",    // Comas finales en objetos
  "singleQuote": true,       // Comillas simples
  "printWidth": 80,          // Ancho máximo de línea
  "tabWidth": 2,             // Indentación de 2 espacios
  "useTabs": false,          // Usar espacios en lugar de tabs
  "bracketSpacing": true,    // Espacios en llaves
  "bracketSameLine": false,  // Llaves en línea separada
  "arrowParens": "avoid",    // Paréntesis en arrow functions
  "endOfLine": "lf",         // Fin de línea Unix
  "jsxSingleQuote": true,    // Comillas simples en JSX
  "proseWrap": "preserve"    // Preservar saltos de línea en markdown
}
```

### Archivo `.prettierignore`
Excluye archivos y carpetas del formateo:
- `node_modules/`
- `dist/`
- `src/routeTree.gen.ts` (archivo generado)
- Archivos de configuración
- Logs y archivos temporales

## 🚀 Uso Recomendado

### Para Desarrollo Diario
```bash
# Antes de hacer commit
npm run code:fix
```

### Para Verificar Código
```bash
# En CI/CD o antes de merge
npm run code:check
```

### Para Formateo Rápido
```bash
# Solo formatear archivos modificados
npm run format
```

## 📝 Integración con Editores

### VS Code
1. Instala la extensión "Prettier - Code formatter"
2. Configura como formateador por defecto
3. Habilita "Format on Save"

### Configuración de VS Code
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 🔍 Verificación de Formato

Para verificar que todo el código esté formateado correctamente:
```bash
npm run format:check
```

Si hay archivos sin formatear, el comando mostrará un error.

## 🛠️ Solución de Problemas

### Si Prettier no funciona
1. Verifica que esté instalado: `npm list prettier`
2. Reinstala: `npm install -D prettier`
3. Limpia cache: `npm run format -- --cache-location .prettiercache`

### Conflictos con ESLint
Si hay conflictos entre Prettier y ESLint, instala:
```bash
npm install -D eslint-config-prettier eslint-plugin-prettier
```

Y agrega a tu configuración de ESLint:
```json
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

¡Tu código ahora estará siempre bien formateado! 🎉
