import AWS from 'aws-sdk'

AWS.config.update({
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
})

export type BrewEntry = {
  id?: string
  coffee_type: string
  brew_method: string
  grind_size: string
  water_temp: number
  brew_time: number
  ratio: string
  notes?: string
  rating: number
  created_at?: string
  updated_at?: string
}

export const brewMethods = [
  'French Press',
  'Pour Over',
  'Espresso',
  'AeroPress',
  'Cold Brew',
  'Chemex',
  'V60',
  'Moka Pot',
  'Drip Coffee'
] as const

export type BrewMethod = typeof brewMethods[number]
export const awsOperations = {
  async createBrew(_brewData: Omit<BrewEntry, 'id' | 'created_at' | 'updated_at'>): Promise<BrewEntry> {
    throw new Error('AWS not configured - using local storage fallback')
  },
  async getAllBrews(): Promise<BrewEntry[]> {
    throw new Error('AWS not configured - using local storage fallback')
  },
  async getBrewById(_id: string): Promise<BrewEntry | null> {
    throw new Error('AWS not configured - using local storage fallback')
  },
  async updateBrew(_id: string, _brewData: Omit<BrewEntry, 'id' | 'created_at' | 'updated_at'>): Promise<BrewEntry> {
    throw new Error('AWS not configured - using local storage fallback')
  },
  async deleteBrew(_id: string): Promise<void> {
    throw new Error('AWS not configured - using local storage fallback')
  }
}
export const localStorageOperations = {
  getBrews(): BrewEntry[] {
    const stored = localStorage.getItem('coffee-brews')
    return stored ? JSON.parse(stored) : []
  },

  saveBrews(brews: BrewEntry[]): void {
    localStorage.setItem('coffee-brews', JSON.stringify(brews))
  },

  createBrew(brewData: Omit<BrewEntry, 'id' | 'created_at' | 'updated_at'>): BrewEntry {
    const brews = this.getBrews()
    const newBrew: BrewEntry = {
      ...brewData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    brews.unshift(newBrew)
    this.saveBrews(brews)
    return newBrew
  },

  updateBrew(id: string, brewData: Omit<BrewEntry, 'id' | 'created_at' | 'updated_at'>): BrewEntry {
    const brews = this.getBrews()
    const index = brews.findIndex(brew => brew.id === id)
    if (index !== -1) {
      brews[index] = {
        ...brews[index],
        ...brewData,
        updated_at: new Date().toISOString()
      }
      this.saveBrews(brews)
      return brews[index]
    }
    throw new Error('Brew not found')
  },

  deleteBrew(id: string): void {
    const brews = this.getBrews()
    const filteredBrews = brews.filter(brew => brew.id !== id)
    this.saveBrews(filteredBrews)
  }
}





























