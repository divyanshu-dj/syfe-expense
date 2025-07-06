import { Target, DollarSign, TrendingUp } from "lucide-react";
import {
    formatCurrency,
    convertCurrency,
    calculateProgress,
} from "@/lib/utils";
import { Goal, ExchangeRate } from "@/lib/types";

interface StatsProps {
    goals: Goal[];
    exchangeRate: ExchangeRate;
}

export default function Stats({ goals, exchangeRate }: StatsProps) {
    const totalTarget = goals.reduce((sum, goal) => {
        return (
            sum +
            convertCurrency(
                goal.targetAmount,
                goal.currency,
                "INR",
                exchangeRate
            )
        );
    }, 0);
    const totalSaved = goals.reduce((sum, goal) => {
        return (
            sum +
            convertCurrency(
                goal.currentAmount,
                goal.currency,
                "INR",
                exchangeRate
            )
        );
    }, 0);
    const overallProgress = (goals: Goal[]): number => {
        if (goals.length === 0) return 0;

        const totalProgress = goals.reduce((sum, goal) => {
            return (
                sum + calculateProgress(goal.currentAmount, goal.targetAmount)
            );
        }, 0);

        return totalProgress / goals.length;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 card-shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Total Target
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(totalTarget, "INR")}
                        </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                        <Target className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 card-shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Total Saved
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(totalSaved, "INR")}
                        </p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 card-shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Overall Progress
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                            {overallProgress(goals).toFixed(1)}%
                        </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </div>
        </div>
    );
}
