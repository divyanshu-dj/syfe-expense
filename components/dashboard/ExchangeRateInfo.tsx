
import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { ExchangeRate } from '@/lib/types'
import { formatDate } from '@/lib/utils'

import { getExchangeRates } from '@/lib/api'

interface ExchangeRateInfoProps {
  exchangeRate: ExchangeRate,
  setExchangeRate: (rate: ExchangeRate) => void
}

export default function ExchangeRateInfo({
  exchangeRate,
  setExchangeRate
}: ExchangeRateInfoProps) {

    const [isRefreshing, setIsRefreshing] = useState(false)

    const fetchExchangeRate = async () => {
      setIsRefreshing(true)
      try {
        const rate = await getExchangeRates()
        setExchangeRate(rate)
        localStorage.setItem('exchange-rate', JSON.stringify(rate))
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error)
      } finally {
        setIsRefreshing(false)
      }
    }

  return (
    <div className="bg-white rounded-xl p-4 mb-8 card-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="font-medium">Exchange Rate:</span>
            <span className="ml-2">1 USD = ₹{exchangeRate.INR.toFixed(2)}</span>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {formatDate(exchangeRate.lastUpdated)}
          </div>
        </div>
        <button
          onClick={fetchExchangeRate}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Get Latest Rate</span>
        </button>
      </div>
    </div>
  )
}
