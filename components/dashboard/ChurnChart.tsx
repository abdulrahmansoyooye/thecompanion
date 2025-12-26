

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 2.3 },
  { name: 'Feb', value: 2.5 },
  { name: 'Mar', value: 2.1 },
  { name: 'Apr', value: 1.9 },
  { name: 'May', value: 1.7 },
  { name: 'Jun', value: 1.8 },
  { name: 'Jul', value: 1.6 },
];

const ChurnChart = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Churn Rate</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">vs</span>
          <span className="rounded bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">-0.4%</span>
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{ background: '#1A1A22', borderColor: '#333', borderRadius: '4px' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value) => [`${value}%`, 'Churn Rate']}
            />
            <Bar 
              dataKey="value" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChurnChart;
