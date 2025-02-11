import React from "react";
import { default as SummarySection } from "../components/budget/SummarySection";
import { default as BudgetInputSection } from "../components/budget/BudgetInputSection";
import { default as BudgetChart } from "../components/budget/BudgetChart";

interface HomeProps {
  initialData?: {
    income?: number;
    expenses?: number;
    bills?: number;
    savings?: number;
    netCashFlow?: number;
    amountLeftToSpend?: number;
  };
}

const Home: React.FC<HomeProps> = ({
  initialData = {
    income: 5000,
    expenses: 2000,
    bills: 1500,
    savings: 500,
    netCashFlow: 1000,
    amountLeftToSpend: 1000,
  },
}) => {
  const [budgetData, setBudgetData] = React.useState(initialData);

  const handleCategoryUpdate = (categoryId: string, entries: any[]) => {
    const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);

    setBudgetData((prev) => {
      const newData = { ...prev };
      switch (categoryId) {
        case "income":
          newData.income = totalAmount;
          break;
        case "expenses":
          newData.expenses = totalAmount;
          break;
        case "bills":
          newData.bills = totalAmount;
          break;
        case "savings":
          newData.savings = totalAmount;
          break;
      }

      // Recalculate net cash flow and amount left to spend
      newData.netCashFlow =
        newData.income - (newData.expenses + newData.bills + newData.savings);
      newData.amountLeftToSpend = newData.netCashFlow;

      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <SummarySection {...budgetData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BudgetInputSection onUpdateCategory={handleCategoryUpdate} />
        </div>
        <div>
          <BudgetChart
            data={[
              { name: "Income", value: budgetData.income, color: "#22c55e" },
              {
                name: "Expenses",
                value: budgetData.expenses,
                color: "#ef4444",
              },
              { name: "Bills", value: budgetData.bills, color: "#3b82f6" },
              { name: "Savings", value: budgetData.savings, color: "#a855f7" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
