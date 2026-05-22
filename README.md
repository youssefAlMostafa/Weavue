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
-  **Dynamic Weather-Themed UI**: Background gradients and custom SVG illustrations automatically adapt based on current weather conditions (sunny, rainy, cloudy, snowy) and time of day
-  **Custom SVG Weather Illustrations**: Hand-crafted Sun, Moon, Cloud, Rain and Snow components that react to live weather data
-  **3-Day Forecast**: Extended weather forecast with detailed daily conditions
-  **Data Persistence**: Cities and location preferences saved to localStorage
-  **Day/Night Themes**: UI automatically adjusts colors and illustrations for day and night conditions
-  **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

##  Technologies Used

- **Frontend Framework**: Vue.js 3.5 with Composition API
- **State Management**: Pinia 3.0 with localStorage persistence
- **Type Safety**: TypeScript 5.7
- **Styling**: Tailwind CSS 4.0
- **Build Tool**: Vite 6.2
- **HTTP Client**: Axios
- **Typography**: Instrument Serif · Geist · Geist Mono

##  Prerequisites

- Node.js (>= 18.x)
- npm or yarn
- [WeatherAPI](https://www.weatherapi.com/) key (free tier available)
- [API Ninjas](https://api-ninjas.com/) key (free tier available)

##  Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/youssef-al-mostafa/Weavue.git
   cd Weavue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Open `.env` and replace the placeholder values with your API keys:
   ```env
   VITE_WEATHER_API_KEY=your_weather_api_key_here
   VITE_NINJA_API_KEY=your_api_ninjas_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

5. **Build for production** (optional)
   ```bash
   npm run build
   ```

##  Project Structure

```
weavue/
├── public/              # Static assets
├── src/                 # Source files
│   ├── assets/          # Images and global styles
│   ├── components/      # Vue components
│   │   ├── app/         # App-specific components (SearchRow, CitiesGrid, CityCard)
│   │   ├── core/        # Shell components (NavBar, Footer)
│   │   ├── sections/    # Page sections (HeroSection, HourlyRow, WeekForecast, DetailCards)
│   │   └── ui/          # UI primitives
│   │       └── weather/ # SVG weather illustrations (Sun, Moon, CloudDay, CloudNight, Rain, Snow)
│   ├── composables/     # Reusable composition functions (useWeather, useForecast)
│   ├── router/          # Vue Router configuration
│   ├── services/        # API service functions
│   ├── stores/          # Pinia stores (cities, location)
│   ├── types/           # TypeScript interfaces
│   ├── utils/           # Helper functions
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   └── main.ts          # Application entry point
├── index.html           # Entry HTML file
├── vite.config.ts       # Vite configuration
└── package.json         # Project dependencies
```


##  Key Highlights

- **Smart State Management**: Utilizes Pinia with persistence plugin for seamless data retention across sessions
- **Weather-Responsive Design**: UI dynamically changes gradients and SVG illustrations based on real-time weather conditions and time of day
- **Custom SVG Illustrations**: Hand-crafted weather components (Sun, Moon, CloudDay, CloudNight, Rain, Snow) — no icon libraries, no Lottie
- **Editorial Design System**: Clean cream/paper aesthetic with Instrument Serif, Geist and Geist Mono typography
- **Modern Architecture**: Built with TypeScript, ensuring type safety and better developer experience
- **Performance Optimized**: Lightning-fast builds with Vite and efficient reactivity with Vue 3 Composition API

##  Acknowledgements

- [WeatherAPI](https://www.weatherapi.com/) - Weather data and forecast API
- [API Ninjas](https://api-ninjas.com/) - City information
- [Google Fonts](https://fonts.google.com/) - Instrument Serif, Geist and Geist Mono fonts
- [Heroicons](https://heroicons.com/) - Beautiful UI icons

##  Contact

- Youssef Al Mostafa [LinkedIn](https://linkedin.com/in/youssef-al-mostafa)
- [youssefalmostafa2@gmail.com](mailto:youssefalmostafa2@gmail.com)
