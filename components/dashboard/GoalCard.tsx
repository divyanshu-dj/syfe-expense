'use client'

import { Goal, ExchangeRate } from '@/lib/types'
import { formatCurrency, convertCurrency, calculateProgress } from '@/lib/utils'
import { PlusCircle, Target } from 'lucide-react'

interface GoalCardProps {
  goal: Goal
  exchangeRate: ExchangeRate
  onAddContribution: (goal: Goal) => void
}

export default function GoalCard({ goal, exchangeRate, onAddContribution }: GoalCardProps) {
  const progress = calculateProgress(goal.currentAmount, goal.targetAmount)
  const otherCurrency = goal.currency === 'INR' ? 'USD' : 'INR'
  const convertedTarget = convertCurrency(goal.targetAmount, goal.currency, otherCurrency, exchangeRate)
  const remaining = goal.targetAmount - goal.currentAmount

  return (
    <div className="bg-white rounded-xl p-6 card-shadow hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{goal.name}</h3>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Target className="w-4 h-4" />
          <span>{progress.toFixed(1)}%</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <p className="text-sm text-gray-600">Target Amount</p>
          <p className="text-xl font-bold text-gray-900">
            {formatCurrency(goal.targetAmount, goal.currency)}
          </p>
          <p className="text-sm text-gray-500">
            ≈ {formatCurrency(convertedTarget, otherCurrency)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Current Saved</p>
          <p className="text-lg font-semibold text-green-600">
            {formatCurrency(goal.currentAmount, goal.currency)}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="progress-bar h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Contributions Summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {goal.contributions.length} contribution{goal.contributions.length !== 1 ? 's' : ''}
        </p>
        {goal.contributions.length > 0 && (
          <p className="text-sm text-gray-500">
            Last: {formatCurrency(
              goal.contributions[goal.contributions.length - 1].amount,
              goal.currency
            )}
          </p>
        )}
      </div>

      {/* Add Contribution Button */}
      {remaining > 0 ? (
        <button
        onClick={() => onAddContribution(goal)}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Add Contribution</span>
      </button>
      ) : (
        <button
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <span>🥳Goal Achieved</span>
      </button>
      )}
    </div>
  )
}
