# Aplicación Móvil de Pedidos de Empanadas

Esta es la versión móvil de nuestra aplicación web de pedidos de empanadas. Está desarrollada con React Native y Expo, permitiendo un despliegue rápido tanto en Android como en iOS.

## Características

- Visualización del menú de empanadas por categorías
- Carrito de compras con persistencia usando AsyncStorage
- Formularios para pedidos de delivery o pickup
- Seguimiento de pedidos y su estado
- Perfil de usuario
- Soporte para tema claro y oscuro

## Requisitos previos

- Node.js (versión 14 o superior)
- npm (viene con Node.js)
- Expo CLI (`npm install -g expo-cli`)
- XCode para iOS (solo en Mac)
- Android Studio para Android

## Configuración del proyecto

1. Clona este repositorio:
   ```
   git clone https://github.com/tu-usuario/empanadas-app-mobile.git
   cd empanadas-app-mobile
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Configura la dirección IP del servidor backend:
   - Abre el archivo `constants/Api.ts`
   - Cambia `API_BASE_URL` con tu dirección IP local donde está ejecutándose el backend
   - Ejemplo: `const API_BASE_URL = 'http://192.168.1.100:5001/api';`

## Ejecución de la aplicación

1. Inicia el servidor de desarrollo:
   ```
   npm start
   ```

2. Una vez que el servidor de Metro esté en ejecución, puedes:
   - Presionar `a` para abrir en un emulador de Android
   - Presionar `i` para abrir en un emulador de iOS (solo Mac)
   - Escanear el código QR con la aplicación Expo Go en tu dispositivo físico

## Estructura del proyecto

- `/app` - Directorio principal de la aplicación con Expo Router
- `/app/(tabs)` - Páginas principales de la aplicación (pestañas)
- `/components` - Componentes reutilizables
- `/constants` - Constantes como colores, API endpoints
- `/context` - Contextos de React (CartContext)
- `/services` - Servicios para comunicarse con la API
- `/types` - Definiciones de tipos TypeScript

## Implementación y Distribución

### Generar APK para Android

```
expo build:android -t apk
```

### Generar archivo IPA para iOS

```
expo build:ios -t archive
```

### Subir a las tiendas

Para publicar en las tiendas de aplicaciones, se requiere configuración adicional:

1. Play Store (Android)
   - Necesitarás una cuenta de desarrollador de Google ($25 una sola vez)
   - Necesitarás firmar tu APK

2. App Store (iOS)
   - Necesitarás una cuenta de desarrollador de Apple ($99/año)
   - Tendrás que pasar por el proceso de revisión de aplicaciones

## Backend

Esta aplicación móvil utiliza el mismo backend que la aplicación web. Asegúrate de que el servidor backend esté en ejecución en tu red local y accesible desde el dispositivo o emulador donde ejecutes la aplicación móvil.

## Capturas de pantalla

(Insertar capturas de pantalla aquí)

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE.md para más detalles.
