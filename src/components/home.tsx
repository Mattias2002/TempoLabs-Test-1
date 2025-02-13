import React from "react";
import { supabase } from "@/lib/supabase";
import { default as SummarySection } from "../components/budget/SummarySection";
import AuthButton from "../components/auth/AuthButton";
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
    debt: 0,
    netCashFlow: 1000,
    amountLeftToSpend: 1000,
  },
}) => {
  const [budgetData, setBudgetData] = React.useState(initialData);
  const [budgetEntries, setBudgetEntries] = React.useState<
    Record<string, any[]>
  >({});
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadBudgetData(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadBudgetData(session.user.id);
      } else {
        setBudgetData(initialData);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadBudgetData = async (userId: string) => {
    const { data, error } = await supabase
      .from("budget_entries")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error loading budget data:", error);
      return;
    }

    const newBudgetData = { ...initialData };
    const newEntries: Record<string, any[]> = {};

    data.forEach((entry) => {
      // Group entries by category
      if (!newEntries[entry.category]) {
        newEntries[entry.category] = [];
      }
      newEntries[entry.category].push({
        id: entry.id,
        date: entry.date,
        description: entry.description,
        amount: entry.amount,
      });

      // Update budget totals
      switch (entry.category) {
        case "income":
          newBudgetData.income += entry.amount;
          break;
        case "expenses":
          newBudgetData.expenses += entry.amount;
          break;
        case "bills":
          newBudgetData.bills += entry.amount;
          break;
        case "savings":
          newBudgetData.savings += entry.amount;
          break;
        case "debt":
          newBudgetData.debt = (newBudgetData.debt || 0) + entry.amount;
          break;
      }
    });

    newBudgetData.netCashFlow =
      newBudgetData.income -
      (newBudgetData.expenses + newBudgetData.bills + newBudgetData.savings);
    newBudgetData.amountLeftToSpend = newBudgetData.netCashFlow;

    setBudgetData(newBudgetData);
    setBudgetEntries(newEntries);
  };

  const handleCategoryUpdate = async (categoryId: string, entries: any[]) => {
    // Update local state immediately
    setBudgetEntries((prev) => ({
      ...prev,
      [categoryId]: entries,
    }));

    // Update budget totals
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
        case "debt":
          newData.debt = totalAmount;
          break;
      }

      // Recalculate net cash flow and amount left to spend
      newData.netCashFlow =
        newData.income - (newData.expenses + newData.bills + newData.savings);
      newData.amountLeftToSpend = newData.netCashFlow;

      return newData;
    });

    // If not logged in, don't sync with Supabase
    if (!user) return;

    // Delete all existing entries for this category
    await supabase
      .from("budget_entries")
      .delete()
      .eq("user_id", user.id)
      .eq("category", categoryId);

    // Insert new entries
    const { error } = await supabase.from("budget_entries").insert(
      entries.map((entry) => ({
        user_id: user.id,
        category: categoryId,
        date: entry.date,
        description: entry.description,
        amount: entry.amount,
      })),
    );

    if (error) {
      console.error("Error updating budget entries:", error);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <div className="flex justify-end mb-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {" "}
          Get Controll of Your Budget Today!
        </h1>
        <AuthButton />
      </div>
      <SummarySection {...budgetData} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BudgetInputSection
            onUpdateCategory={handleCategoryUpdate}
            entries={budgetEntries}
          />
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
              { name: "Debt", value: budgetData.debt || 0, color: "#f97316" },
            ]}
          />
        </div>
      </div>
      <div className={"w-screen h-screen bg-white"}>
        <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl"}>
          Monthly Budget Calculator
        </h1>
      </div>
    </div>
  );
};

export default Home;
