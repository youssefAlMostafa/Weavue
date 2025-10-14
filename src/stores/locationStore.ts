import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', {
  state: () => ({
    lat: 0,
    long: 0
  }),
  actions: {
    setLocation(latitude: number, longitude: number) {
      this.lat = latitude
      this.long = longitude
    },
    clearLocation() {
      this.lat = 0
      this.long = 0
    }
  },
  persist: true
})