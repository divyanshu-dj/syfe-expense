'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Goal } from '@/lib/types'
import { formatCurrency, validateAmount } from '@/lib/utils'

interface AddContributionModalProps {
  isOpen: boolean
  onClose: () => void
  onAddContribution: (goalId: string, amount: number, date: Date) => void
  goal: Goal | null
  isLoading: boolean
}

export default function AddContributionModal({
  isOpen,
  onClose,
  onAddContribution,
  goal,
  isLoading
}: AddContributionModalProps) {
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })
  const [errors, setErrors] = useState<{ amount?: string; date?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!goal) return
    
    const newErrors: { amount?: string; date?: string } = {}
    
    if (!validateAmount(amount)) {
      newErrors.amount = 'Please enter a valid amount (1 to 1,000,000,000)'
    }
    
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    
    if (selectedDate > today) {
      newErrors.date = 'Date cannot be in the future'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      onAddContribution(goal.id, parseFloat(amount), selectedDate)
      setAmount('')
      const today = new Date()
      setDate(today.toISOString().split('T')[0])
      setErrors({})
    }
  }

  const handleClose = () => {
    setAmount('')
    const today = new Date()
    setDate(today.toISOString().split('T')[0])
    setErrors({})
    onClose()
  }

  if (!isOpen || !goal) return null

  const remaining = goal.targetAmount - goal.currentAmount
  const willComplete = parseFloat(amount) >= remaining

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Add Contribution</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">{goal.name}</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Target: {formatCurrency(goal.targetAmount, goal.currency)}</p>
            <p>Current: {formatCurrency(goal.currentAmount, goal.currency)}</p>
            <p>Remaining: {formatCurrency(remaining, goal.currency)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Contribution Amount ({goal.currency})
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              min="1"
              max="1000000000"
              step="0.01"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
            {amount && validateAmount(amount) && (
              <p className="mt-1 text-sm text-gray-600">
                = {formatCurrency(parseFloat(amount), goal.currency)}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          {willComplete && amount && validateAmount(amount) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                🎉 This contribution will complete your goal!
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Adding...' : 'Add Contribution'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
