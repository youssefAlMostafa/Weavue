import { defineStore } from 'pinia'
import { useLocationStore } from './locationStore'

export const useCityStore = defineStore('city', {
  state: () => ({
    list: [] as Array<string>
  }),
  actions: {
    addCity(city: string) {
      const locationStore = useLocationStore()
      const maxCities = locationStore.lat !== 0 && locationStore.long !== 0 ? 5 : 6

      if (this.list.includes(city)) {
        return
      }
      if (this.list.length >= maxCities) {
        this.list.shift()
      }
      this.list.push(city)
    },
    removeCity(index: number) {
      this.list.splice(index, 1)
    },
    clearCities() {
      this.list = []
    }
  },
  persist: true
})