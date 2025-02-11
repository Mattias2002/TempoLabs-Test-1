import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  PiggyBank,
  CreditCard,
  DollarSign,
} from "lucide-react";

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  trend?: "positive" | "negative" | "neutral";
}

interface SummarySectionProps {
  income?: number;
  expenses?: number;
  bills?: number;
  savings?: number;
  netCashFlow?: number;
  amountLeftToSpend?: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title = "Summary",
  amount = 0,
  icon,
  trend = "neutral",
}) => {
  const trendColor = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-gray-500",
  }[trend];

  return (
    <Card className="p-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-full">{icon}</div>
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className={`text-xl font-semibold ${trendColor}`}>
              ${amount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const SummarySection: React.FC<SummarySectionProps> = ({
  income = 5000,
  expenses = 2000,
  bills = 1500,
  savings = 500,
  netCashFlow = 1000,
  amountLeftToSpend = 1000,
}) => {
  const getBudgetStatus = (amount: number) => {
    if (amount > 2000) return "bg-green-100 text-green-800";
    if (amount > 500) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="w-full bg-gray-50 p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Budget Summary</h2>
        <Badge
          className={`text-lg px-4 py-2 ${getBudgetStatus(amountLeftToSpend)}`}
        >
          ${amountLeftToSpend.toLocaleString()} Left to Spend
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <SummaryCard
          title="Income"
          amount={income}
          icon={<ArrowUpCircle className="text-green-500" />}
          trend="positive"
        />
        <SummaryCard
          title="Expenses"
          amount={expenses}
          icon={<ArrowDownCircle className="text-red-500" />}
          trend="negative"
        />
        <SummaryCard
          title="Bills"
          amount={bills}
          icon={<Wallet className="text-blue-500" />}
          trend="neutral"
        />
        <SummaryCard
          title="Savings"
          amount={savings}
          icon={<PiggyBank className="text-purple-500" />}
          trend="positive"
        />
        <SummaryCard
          title="Net Cash Flow"
          amount={netCashFlow}
          icon={<DollarSign className="text-green-500" />}
          trend={netCashFlow >= 0 ? "positive" : "negative"}
        />
        <SummaryCard
          title="Debt"
          amount={0}
          icon={<CreditCard className="text-gray-500" />}
          trend="neutral"
        />
      </div>
    </div>
  );
};

export default SummarySection;
