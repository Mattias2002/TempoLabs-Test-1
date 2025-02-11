import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Plus } from "lucide-react";

interface Entry {
  id: string;
  date: string;
  description: string;
  amount: number;
}

interface DataGridProps {
  entries?: Entry[];
  onAddEntry?: (entry: Omit<Entry, "id">) => void;
  onDeleteEntry?: (id: string) => void;
}

const defaultEntries: Entry[] = [
  {
    id: "1",
    date: "2024-03-01",
    description: "Sample Entry 1",
    amount: 1000,
  },
  {
    id: "2",
    date: "2024-03-15",
    description: "Sample Entry 2",
    amount: 500,
  },
];

const DataGrid: React.FC<DataGridProps> = ({
  entries = defaultEntries,
  onAddEntry = () => {},
  onDeleteEntry = () => {},
}) => {
  const [newEntry, setNewEntry] = React.useState({
    date: "",
    description: "",
    amount: "",
  });

  const handleAddEntry = () => {
    if (newEntry.date && newEntry.description && newEntry.amount) {
      onAddEntry({
        date: newEntry.date,
        description: newEntry.description,
        amount: parseFloat(newEntry.amount),
      });
      setNewEntry({ date: "", description: "", amount: "" });
    }
  };

  return (
    <Card className="p-4 bg-white w-full">
      <div className="space-y-4">
        <div className="flex gap-4 mb-4">
          <Input
            type="date"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
            placeholder="Date"
            className="w-[200px]"
          />
          <Input
            type="text"
            value={newEntry.description}
            onChange={(e) =>
              setNewEntry({ ...newEntry, description: e.target.value })
            }
            placeholder="Description"
            className="flex-1"
          />
          <Input
            type="number"
            value={newEntry.amount}
            onChange={(e) =>
              setNewEntry({ ...newEntry, amount: e.target.value })
            }
            placeholder="Amount"
            className="w-[150px]"
          />
          <Button onClick={handleAddEntry} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell className="text-right">
                  ${entry.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteEntry(entry.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default DataGrid;
