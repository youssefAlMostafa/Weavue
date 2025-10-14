# Weavue 🌦️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-brightgreen.svg)](https://vuejs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0-ffd859.svg)](https://pinia.vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF.svg)](https://vitejs.dev/)

A modern, elegant weather application built with Vue.js that provides accurate weather forecasts for multiple locations.

## Features

-  **Current Location Detection**: Automatically fetch weather for your current location with geolocation API
-  **Multi-City Search**: Add and track weather for multiple cities simultaneously
-  **Real-time Weather Data**: Live temperature, humidity, precipitation, and weather conditions
-  **Dynamic Weather-Themed UI**: Banner background and colors automatically adapt based on current weather conditions (sunny,  rainy,  cloudy, snowy) and time of day
-  **Interactive Forecast Charts**: Visual temperature trends with Chart.js showing max/min temperatures
-  **3-Day Forecast**: Extended weather forecast with detailed daily conditions
-  **Data Persistence**: Cities and location preferences saved to localStorage
-  **Day/Night Themes**: UI automatically adjusts colors for day and night conditions
-  **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

##  Technologies Used

- **Frontend Framework**: Vue.js 3.5 with Composition API
- **State Management**: Pinia 3.0 with localStorage persistence
- **Type Safety**: TypeScript 5.7
- **Styling**: Tailwind CSS 4.0 + DaisyUI
- **Charts**: Chart.js + vue-chartjs
- **Build Tool**: Vite 6.2
- **HTTP Client**: Axios
- **Animations**: Lottie animations for weather icons

##  Prerequisites

- Node.js (>= 18.x)
- npm or yarn


##  Project Structure

```
weavue/
├── public/              # Static assets
├── src/                 # Source files
│   ├── assets/          # Images and global styles
│   ├── components/      # Vue components
│   ├── composables/     # Reusable composition functions (useWeather)
│   ├── router/          # Vue Router configuration
│   ├── services/        # API service functions
│   ├── stores/          # Pinia stores (cities, location)
│   ├── types/           # TypeScript interfaces
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   └── main.ts          # Application entry point
├── index.html           # Entry HTML file
├── vite.config.ts       # Vite configuration
└── package.json         # Project dependencies
```


##  Key Highlights

- **Smart State Management**: Utilizes Pinia with persistence plugin for seamless data retention across sessions
- **Weather-Responsive Design**: Unique feature where the UI dynamically changes colors based on real-time weather conditions
- **Data Visualization**: Professional temperature charts using Chart.js for better weather trend analysis
- **Modern Architecture**: Built with TypeScript, ensuring type safety and better developer experience
- **Performance Optimized**: Lightning-fast builds with Vite and efficient reactivity with Vue 3 Composition API

##  Acknowledgements

- [WeatherAPI](https://www.weatherapi.com/) - Weather data and forecast API
- [API Ninjas](https://api-ninjas.com/) - City information
- [Chart.js](https://www.chartjs.org/) - Interactive chart library
- [Google Fonts](https://fonts.google.com/) - Lobster, Lexend, Montserrat, and PT Sans fonts
- [DaisyUI](https://daisyui.com/) - Component library for Tailwind CSS
- [Heroicons](https://heroicons.com/) - Beautiful UI icons
- [Lottie](https://lottiefiles.com/) - Animated weather icons


##  Contact

- Youssef Al Mostafa [LinkedIn](https://linkedin.com/in/youssef-al-mostafa)
- [youssefalmostafa2@gmail.com](mailto:youssefalmostafa2@gmail.com)
  
