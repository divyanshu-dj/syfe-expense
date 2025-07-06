import React, { useState } from "react";
import { PlusCircle, Target } from "lucide-react";

import { Goal, Contribution, ExchangeRate } from "@/lib/types";

import GoalCard from "./dashboard/GoalCard";
import Stats from "./dashboard/Stats";
import AddGoalModal from "./dashboard/model/AddGoalModal";
import AddContributionModal from "./dashboard/model/AddContibutionModal";

const Dashboard = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({
        USD: 1,
        INR: 83.0,
        lastUpdated: new Date(),
    });
    const [isLoading, setIsLoading] = useState(false)

    const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
    const [isAddContributionModalOpen, setIsAddContributionModalOpen] = useState(false)
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

    const saveGoals = (updated: Goal[]) => {
      setGoals(updated)
    //   localStorage.setItem('savings-goals', JSON.stringify(updated))
    }

    const addGoal = (
        name: string,
        targetAmount: number,
        currency: "INR" | "USD"
    ) => {
        setIsLoading(true);
        const newGoal: Goal = {
            id: crypto.randomUUID(),
            name,
            targetAmount,
            currency,
            currentAmount: 0,
            contributions: [],
            createdAt: new Date(),
        };
        saveGoals([newGoal, ...goals]);
        setIsAddGoalModalOpen(false);
        setIsLoading(false);
    };

    const addContribution = (goalId: string, amount: number, date: Date) => {
      setIsLoading(true)
      const newContribution: Contribution = { 
          id: crypto.randomUUID(), 
          amount, 
          date, 
          goalId 
      }
      const updatedGoals = goals.map(goal => {
        if (goal.id === goalId) {
        return {
          ...goal,
          currentAmount: goal.currentAmount + amount,
          contributions: [...goal.contributions, newContribution]
        }}
        return goal
      })
      saveGoals(updatedGoals)
      setIsAddContributionModalOpen(false)
        setSelectedGoal(null)
      setIsLoading(false)
    }

    return (
        <div className=" max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    💰 Goal-Based Savings Planner
                </h1>
                <p className="text-lg text-gray-600">
                    Track your financial goals and build your future
                </p>
            </div>

            <Stats
              goals={goals}
            exchangeRate={exchangeRate}
            />

            <div className="bg-white flex items-center justify-between mb-6 p-4 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-900">Your Goals</h2>
                <button
                    onClick={() => setIsAddGoalModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <PlusCircle className="w-5 h-5" />
                    <span>Add Goal</span>
                </button>
            </div>

            {goals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map((goal: Goal) => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            exchangeRate={exchangeRate}
                            onAddContribution={(goal: Goal) => {
                                setSelectedGoal(goal);
                                setIsAddContributionModalOpen(true)
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No goals yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Start your savings journey by creating your first
                        financial goal
                    </p>
                    <button
                        onClick={() => setIsAddGoalModalOpen(true)}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>Create Your First Goal</span>
                    </button>
                </div>
            )}

            <AddGoalModal
                isOpen={isAddGoalModalOpen}
                onClose={() => setIsAddGoalModalOpen(false)}
                onAddGoal={addGoal}
                isLoading={isLoading}
            />

            <AddContributionModal
              isOpen={isAddContributionModalOpen}
              onClose={() => {
                setIsAddContributionModalOpen(false)
                setSelectedGoal(null)
              }}
              onAddContribution={addContribution}
              goal={selectedGoal}
              isLoading={isLoading}
            />
        </div>
    );
};

export default Dashboard;
