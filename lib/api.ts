import axios from 'axios'
import type { ExchangeRate } from './types'

const API_KEY = 'a22434de3d32d57cce055972'

export const getExchangeRates = async (): Promise<ExchangeRate> => {
  const response = await axios.get(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
  )

  const data = response.data

  if (data?.result === 'success' && data?.conversion_rates?.INR) {
    return {
      USD: 1,
      INR: data.conversion_rates.INR,
      lastUpdated: new Date()
    }
  }
  throw new Error('Invalid exchange rate response')
}
