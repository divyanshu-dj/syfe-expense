'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { validateAmount, validateGoalName } from '@/lib/utils'

interface AddGoalModalProps {
  isOpen: boolean
  onClose: () => void
  onAddGoal: (name: string, targetAmount: number, currency: 'INR' | 'USD') => void
  isLoading: boolean
}

export default function AddGoalModal({ isOpen, onClose, onAddGoal, isLoading }: AddGoalModalProps) {
  const [name, setName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')
  const [errors, setErrors] = useState<{ name?: string; amount?: string }>({})
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Auto-focus the name input when modal opens
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      // Small delay to ensure modal is fully rendered
      setTimeout(() => {
        nameInputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { name?: string; amount?: string } = {}
    
    if (!validateGoalName(name)) {
      newErrors.name = 'Goal name must be between 1-50 characters'
    }
    
    if (!validateAmount(targetAmount)) {
      newErrors.amount = 'Please enter a valid amount (1 to 1,000,000,000)'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      onAddGoal(name.trim(), parseFloat(targetAmount), currency)
      setName('')
      setTargetAmount('')
      setCurrency('INR')
      setErrors({})
    }
  }

  const handleClose = () => {
    setName('')
    setTargetAmount('')
    setCurrency('INR')
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Add New Goal</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="goalName" className="block text-sm font-medium text-gray-700 mb-2">
              Goal Name
            </label>
            <input
              ref={nameInputRef}
              id="goalName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Emergency Fund, Trip to Japan"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              maxLength={50}
              autoComplete="off"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Target Amount
            </label>
            <input
              id="targetAmount"
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              min="1"
              max="1000000000"
              step="0.01"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

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
              {isLoading ? 'Adding...' : 'Add Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
