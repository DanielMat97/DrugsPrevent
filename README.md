# PsyPrevenir

PsyPrevenir es una aplicación móvil desarrollada con React Native + Expo que ayuda a identificar y prevenir el uso de sustancias psicoactivas. La aplicación permite a los usuarios escanear sustancias con la cámara para identificarlas, generar alertas y contactar con entidades de ayuda.

## Características

- **Autenticación de usuarios**: Sistema de login y registro
- **Alertas de sustancias**: Creación y listado de alertas sobre posible consumo
- **Reconocimiento de sustancias**: Análisis de imágenes con IA para identificar sustancias
- **Contactos de ayuda**: Listado de entidades y contactos de emergencia

## Requisitos previos

- Node.js 14 o superior
- Yarn o npm
- Expo CLI
- XCode (para iOS) o Android Studio (para Android) si deseas ejecutar en emuladores

## Instalación

1. Clona este repositorio:
```
git clone https://github.com/tu-usuario/psyprevenir.git
cd psyprevenir
```

2. Instala las dependencias:
```
yarn install
```

3. Configura la clave API de OpenAI:
   - Abre el archivo `app.json`
   - Reemplaza `"openaiApiKey": "YOUR_OPENAI_API_KEY_HERE"` con tu clave API

## Ejecución

Inicia la aplicación con Expo:
```
yarn start
```

O directamente para una plataforma específica:
```
yarn ios     # Para iOS
yarn android # Para Android
```

## Estructura del proyecto

```
app/
├── (auth)               # Pantallas de autenticación
│   ├── _layout.tsx      # Layout para autenticación
│   ├── login.tsx        # Pantalla de inicio de sesión 
│   └── register.tsx     # Pantalla de registro
│
├── (tabs)               # Pestañas principales de la app
│   ├── _layout.tsx      # Layout para tabs
│   ├── index.tsx        # Pantalla de inicio y alertas
│   ├── scan.tsx         # Pantalla de escáner de sustancias
│   ├── contact.tsx      # Pantalla de contactos de ayuda
│   └── profile.tsx      # Pantalla de perfil y configuración
│
├── _layout.tsx          # Layout principal
├── +not-found.tsx       # Página 404
│
contexts/               # Contextos de React
├── AuthContext.tsx     # Contexto de autenticación
│
mocks/                  # Datos simulados
├── mocks.ts            # Alertas y contactos de ejemplo
│
services/               # Servicios
├── auth.ts             # Servicios de autenticación
├── alerts.ts           # Servicios de alertas
├── openai.ts           # Integración con OpenAI
│
types/                  # Definiciones de TypeScript
├── index.ts            # Interfaces y tipos
```

## Notas de desarrollo

- La autenticación es simulada mediante AsyncStorage
- Las funciones de API usan mocks con datos de ejemplo
- La integración con OpenAI requiere una clave API válida
- La aplicación usa react-native-paper para los componentes de UI

## Tecnologías utilizadas

- React Native
- Expo
- TypeScript
- React Navigation
- React Native Paper
- AsyncStorage
- OpenAI API

## Licencia

MIT
