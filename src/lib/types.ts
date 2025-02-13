export interface BudgetEntry {
  id: string;
  user_id: string;
  category: string;
  date: string;
  description: string;
  amount: number;
  created_at: string;
}

export interface BudgetData {
  income: number;
  expenses: number;
  bills: number;
  savings: number;
  netCashFlow: number;
  amountLeftToSpend: number;
}
