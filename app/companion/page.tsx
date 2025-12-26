import React from "react";
import Header from "@/components/layout/Navbar";
import RevenueChart from "@/components/dashboard/RevenueChart";
import ChurnChart from "@/components/dashboard/ChurnChart";
import SubscriptionTable from "@/components/dashboard/SubscriptionTable";
import QuickActions from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <div className="flex h-screen flex-1 flex-col bg-background">
      <Header title="Dashboard" />
      
      
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back, Alex</h2>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your subscriptions today.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <RevenueChart />
          </div>
          <ChurnChart />
        </div>
        
        <div className="mt-4 md:mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="lg:col-span-3">
            <SubscriptionTable />
          </div>
          <QuickActions />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;