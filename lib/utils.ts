import type { ExchangeRate} from './types'

export const formatCurrency = (amount: number, currency: 'INR' | 'USD'): string => {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }
}

export const convertCurrency = (
  amount: number,
  fromCurrency: 'INR' | 'USD',
  toCurrency: 'INR' | 'USD',
  exchangeRate: ExchangeRate
): number => {
  if (fromCurrency === toCurrency) return amount
  
  if (fromCurrency === 'USD' && toCurrency === 'INR') {
    return amount * exchangeRate.INR
  } else if (fromCurrency === 'INR' && toCurrency === 'USD') {
    return amount / exchangeRate.INR
  }
  
  return amount
}

export const validateAmount = (amount: string): boolean => {
  const num = parseFloat(amount)
  return !isNaN(num) && num > 0 && num <= 1000000000 // Max 1 billion
}

export const validateGoalName = (name: string): boolean => {
  return name.trim().length > 0 && name.trim().length <= 50
}

export const calculateProgress = (current: number, target: number): number => {
  if (target === 0) return 0
  return Math.min((current / target) * 100, 100)
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}


