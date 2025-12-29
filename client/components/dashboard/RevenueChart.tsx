
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 7000 },
  { name: 'Feb', value: 6800 },
  { name: 'Mar', value: 7500 },
  { name: 'Apr', value: 8500 },
  { name: 'May', value: 9200 },
  { name: 'Jun', value: 10100 },
  { name: 'Jul', value: 10800 },
];

const RevenueChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Revenue</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">vs</span>
          <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">+12.5%</span>
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#222" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ background: '#1A1A22', borderColor: '#333', borderRadius: '4px' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value) => [`$${value}`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;