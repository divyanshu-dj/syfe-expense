export interface Goal {
  id: string
  name: string
  targetAmount: number
  currency: 'INR' | 'USD'
  currentAmount: number
  contributions: Contribution[]
  createdAt: Date
}

export interface Contribution {
  id: string
  amount: number
  date: Date
  goalId: string
}

export interface ExchangeRate {
  USD: number
  INR: number
  lastUpdated: Date
}

export type Currency = 'INR' | 'USD'
