// Rutas de imágenes centralizadas
export const IMAGE_PATHS = {
  // Hero section
  hero: {
    main: '/images/hero/hero-exercise.jpg',
    athletes: '/images/hero/athletes-training.jpg',
  },

  // Features
  features: {
    dashboard: '/images/features/dashboard-icon.png',
    exercises: '/images/features/exercises-icon.png',
    history: '/images/features/history-icon.png',
  },

  // Ejercicios
  exercises: {
    saltoVertical: '/images/exercises/salto-vertical.jpg',
    extensiones: '/images/exercises/extensiones-brazos.jpg',
    carrera50m: '/images/exercises/carrera-50m.jpg',
    carrera1000m: '/images/exercises/carrera-1000m.jpg',
    natacion: '/images/exercises/natacion-50m.jpg',
    carrera6km: '/images/exercises/carrera-6km.jpg',
  },

  // UI
  avatars: {
    default: '/images/avatars/default-user.png',
    placeholder: '/images/avatars/user-placeholder.svg',
  },

  // Placeholders
  placeholder: '/images/placeholder.png',
} as const;

// Función para obtener imagen con fallback
export const getImageUrl = (
  path: string,
  fallback: string = IMAGE_PATHS.placeholder
): string => {
  return path || fallback;
};

// Función para generar URLs de Unsplash (temporal)
export const getUnsplashImage = (
  query: string,
  width: number = 800,
  height: number = 600
): string => {
  return `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=${width}&h=${height}&fit=crop&crop=faces&q=80`;
};

// URLs temporales para ejercicios (mientras conseguimos las imágenes)
export const TEMP_EXERCISE_IMAGES = {
  saltoVertical:
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&q=80',
  extensiones:
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop&q=80',
  carrera50m:
    'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop&q=80',
  carrera1000m:
    'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop&q=80',
  natacion:
    'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=400&h=300&fit=crop&q=80',
  carrera6km:
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=300&fit=crop&q=80',
} as const;
