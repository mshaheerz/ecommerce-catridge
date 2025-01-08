import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const recentOrders = [
    {
      id: "1",
      customer: "John Doe",
      status: "Completed",
      date: "2023-04-01",
      total: "$250.00",
    },
    {
      id: "2",
      customer: "Jane Smith",
      status: "Pending",
      date: "2023-04-02",
      total: "$175.50",
    },
    {
      id: "3",
      customer: "Bob Johnson",
      status: "Completed",
      date: "2023-04-03",
      total: "$320.75",
    },
    {
      id: "4",
      customer: "Alice Brown",
      status: "Canceled",
      date: "2023-04-04",
      total: "$95.20",
    },
    {
      id: "5",
      customer: "Charlie Wilson",
      status: "Pending",
      date: "2023-04-05",
      total: "$450.00",
    },
  ]
  
  export function RecentOrdersTable() {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  
  