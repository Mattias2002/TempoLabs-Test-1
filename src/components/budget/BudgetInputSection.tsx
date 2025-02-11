import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import DataGrid from "./DataGrid";

interface BudgetCategory {
  id: string;
  name: string;
  entries: Array<{
    id: string;
    date: string;
    description: string;
    amount: number;
  }>;
}

interface BudgetInputSectionProps {
  categories?: BudgetCategory[];
  onUpdateCategory?: (categoryId: string, entries: any[]) => void;
}

const defaultCategories: BudgetCategory[] = [
  {
    id: "income",
    name: "Income",
    entries: [
      {
        id: "1",
        date: "2024-03-01",
        description: "Salary",
        amount: 5000,
      },
    ],
  },
  {
    id: "expenses",
    name: "Expenses",
    entries: [
      {
        id: "1",
        date: "2024-03-02",
        description: "Groceries",
        amount: 200,
      },
    ],
  },
  {
    id: "bills",
    name: "Bills",
    entries: [
      {
        id: "1",
        date: "2024-03-03",
        description: "Electricity",
        amount: 100,
      },
    ],
  },
  {
    id: "savings",
    name: "Savings",
    entries: [
      {
        id: "1",
        date: "2024-03-04",
        description: "Emergency Fund",
        amount: 500,
      },
    ],
  },
  {
    id: "debt",
    name: "Debt",
    entries: [
      {
        id: "1",
        date: "2024-03-05",
        description: "Credit Card Payment",
        amount: 300,
      },
    ],
  },
];

const BudgetInputSection: React.FC<BudgetInputSectionProps> = ({
  categories = defaultCategories,
  onUpdateCategory = () => {},
}) => {
  return (
    <Card className="p-6 bg-white w-full">
      <Tabs defaultValue="income" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <DataGrid
              entries={category.entries}
              onAddEntry={(entry) => {
                const newEntries = [
                  ...category.entries,
                  { ...entry, id: Math.random().toString() },
                ];
                onUpdateCategory(category.id, newEntries);
              }}
              onDeleteEntry={(entryId) => {
                const newEntries = category.entries.filter(
                  (e) => e.id !== entryId,
                );
                onUpdateCategory(category.id, newEntries);
              }}
            />
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};

export default BudgetInputSection;
