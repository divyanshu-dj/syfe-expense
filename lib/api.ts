import axios from 'axios'
import type { ExchangeRate } from './types'

const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY

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
