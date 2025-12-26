
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const subscriptions = [
  {
    id: "SUB-1234",
    customer: "Acme Inc.",
    plan: "Pro Plan",
    amount: "$99",
    status: "active",
    nextBilling: "Aug 12, 2023",
  },
  {
    id: "SUB-1235",
    customer: "Globex Corp",
    plan: "Enterprise Plan",
    amount: "$299",
    status: "active",
    nextBilling: "Aug 15, 2023",
  },
  {
    id: "SUB-1236",
    customer: "Wayne Enterprises",
    plan: "Team Plan",
    amount: "$199",
    status: "trialing",
    nextBilling: "Aug 18, 2023",
  },
  {
    id: "SUB-1237",
    customer: "Sirius Cybernetics",
    plan: "Pro Plan",
    amount: "$99",
    status: "active",
    nextBilling: "Aug 20, 2023",
  },
  {
    id: "SUB-1238",
    customer: "Initech",
    plan: "Basic Plan",
    amount: "$49",
    status: "past_due",
    nextBilling: "Aug 5, 2023",
  },
];

const statusStyles = {
  active: "bg-green-500/10 text-green-500",
  trialing: "bg-blue-500/10 text-blue-500",
  past_due: "bg-red-500/10 text-red-500",
};

const SubscriptionTable = () => {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Subscriptions</CardTitle>
        <Badge variant="outline" className="ml-auto">
          {subscriptions.length} Total
        </Badge>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next Billing</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell className="font-mono text-xs">{subscription.id}</TableCell>
                <TableCell>{subscription.customer}</TableCell>
                <TableCell>{subscription.plan}</TableCell>
                <TableCell>{subscription.amount}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={statusStyles[subscription.status as keyof typeof statusStyles]}
                  >
                    {subscription.status}
                  </Badge>
                </TableCell>
                <TableCell>{subscription.nextBilling}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SubscriptionTable;