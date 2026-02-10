interface EnvConfig {
  WEATHER_API_KEY: string
  NINJA_API_KEY: string
}

function validateEnv(): EnvConfig {
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
  const ninjaApiKey = import.meta.env.VITE_NINJA_API_KEY

  if (!weatherApiKey) {
    throw new Error('VITE_WEATHER_API_KEY is not defined in environment variables')
  }

  if (!ninjaApiKey) {
    throw new Error('VITE_NINJA_API_KEY is not defined in environment variables')
  }

  return {
    WEATHER_API_KEY: weatherApiKey,
    NINJA_API_KEY: ninjaApiKey
  }
}

export const env = validateEnv()
