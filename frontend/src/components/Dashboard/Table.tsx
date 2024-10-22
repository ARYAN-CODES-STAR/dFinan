"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface Transaction {
  id: number;
  amount: number;
  category: string;
  sentTo: string;
  timeDate: string;
}

const transactions: Transaction[] = [
  { id: 1, amount: 250.0, category: "Utilities", sentTo: "Alice", timeDate: "2024-10-01 10:00 AM" },
  { id: 2, amount: 150.0, category: "Groceries", sentTo: "Bob", timeDate: "2024-10-05 11:00 AM" },
  { id: 3, amount: 350.0, category: "Entertainment", sentTo: "Charlie", timeDate: "2024-10-03 09:30 AM" },
  { id: 4, amount: 450.0, category: "Rent", sentTo: "Dave", timeDate: "2024-10-07 08:00 AM" },
  { id: 5, amount: 550.0, category: "Travel", sentTo: "Eve", timeDate: "2024-10-02 02:15 PM" },
];

export function TableFilter() {
  const [data, setData] = useState<Transaction[]>(transactions);
  const [sortType, setSortType] = useState<string | null>(null);

  // Helper function to parse date strings
  const parseDate = (dateStr: string) => {
    const [datePart, timePart, period] = dateStr.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    let [hours, minutes] = timePart.split(':').map(Number);
    
    // Convert to 24-hour format if PM
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    return new Date(year, month - 1, day, hours, minutes);
  };

  // Function to sort data based on selected type
  const handleSort = (type: string) => {
    let sortedData = [...data];
    switch (type) {
      case "dateAsc":
        sortedData.sort((a, b) => parseDate(a.timeDate).getTime() - parseDate(b.timeDate).getTime());
        break;
      case "dateDesc":
        sortedData.sort((a, b) => parseDate(b.timeDate).getTime() - parseDate(a.timeDate).getTime());
        break;
      case "amountAsc":
        sortedData.sort((a, b) => a.amount - b.amount);
        break;
      case "amountDesc":
        sortedData.sort((a, b) => b.amount - a.amount);
        break;
      default:
        sortedData = transactions;
    }
    setData(sortedData);
    setSortType(type);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <select
          onChange={(e) => handleSort(e.target.value)}
          value={sortType || ""}
          className="border rounded-md p-2"
        >
          <option value="">Sort By</option>
          <option value="dateAsc">Date: Oldest to Newest</option>
          <option value="dateDesc">Date: Newest to Oldest</option>
          <option value="amountAsc">Amount: Low to High</option>
          <option value="amountDesc">Amount: High to Low</option>
        </select>
      </div>
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">S No.</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Sent To</TableHead>
            <TableHead>Time Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction, index) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.sentTo}</TableCell>
              <TableCell>{transaction.timeDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              ${data.reduce((acc, item) => acc + item.amount, 0).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}