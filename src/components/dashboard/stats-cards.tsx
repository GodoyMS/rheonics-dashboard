"use client"

import type React from "react"

import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, BarChart3, Database, Lock, Shield } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

// Sample data for different charts
const productiveTimeData = [
  { value: 8.2 },
  { value: 9.1 },
  { value: 7.8 },
  { value: 10.2 },
  { value: 11.5 },
  { value: 12.1 },
  { value: 12.4 },
]

const revenueData = [
  { value: 45000 },
  { value: 52000 },
  { value: 48000 },
  { value: 61000 },
  { value: 55000 },
  { value: 67000 },
  { value: 73000 },
]

const usersData = [
  { value: 1200 },
  { value: 1350 },
  { value: 1180 },
  { value: 1420 },
  { value: 1680 },
  { value: 1850 },
  { value: 2100 },
]

const ordersData = [
  { value: 45 },
  { value: 52 },
  { value: 38 },
  { value: 61 },
  { value: 55 },
  { value: 67 },
  { value: 73 },
]

const chartConfig = {
  value: {
    color: "hsl(var(--primary))",
  },
}

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  icon: React.ReactNode
  chartData: Array<{ value: number }>
  chartType: "line" | "area" | "bar"
  chartColor?: string
}

function StatCard({
  title,
  value,
  change,
  changeType,
  icon,
  chartData,
  chartType,
  chartColor = "hsl(var(--primary))",
}: StatCardProps) {
  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 5, left: 5, bottom: 5 },
    }

    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              fill={chartColor}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        )
      case "bar":
        return (
          <BarChart {...commonProps}>
            <Bar dataKey="value" fill={chartColor} radius={2} />
          </BarChart>
        )
      default:
        return (
          <LineChart {...commonProps}>
            <Line type="monotone" dataKey="value" stroke={chartColor} strokeWidth={2.5} dot={false} />
          </LineChart>
        )
    }
  }

  return (
    <Card className="relative overflow-hidden   bg-transparent">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {icon}
              <span>{title}</span>
            </div>
            <div className="text-2xl font-bold tracking-tight">{value}</div>
            <div className="flex items-center space-x-1">
              {changeType === "positive" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className={`text-sm font-medium ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {change}
              </span>
              <span className="text-sm text-muted-foreground">vs last week</span>
            </div>
          </div>
          <div className="h-16 w-24">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 ">
      <StatCard
        title="Active users"
        value="124"
        change="+23%"
        changeType="positive"
        icon={<Users className="h-4 w-4" />}
        chartData={productiveTimeData}
        chartType="line"
        chartColor="hsl(220, 70%, 50%)"
      />

      <StatCard
        title="Database Size"
        value="1.2 GB"
        change="+18%"
        changeType="positive"
        icon={<Database className="h-4 w-4" />}
        chartData={revenueData}
        chartType="area"
        chartColor="hsl(142, 76%, 36%)"
      />

      <StatCard
        title="Security Score"
        value="92%"
        change="+12%"
        changeType="positive"
        icon={<Shield className="h-4 w-4" />}
        chartData={usersData}
        chartType="bar"
        chartColor="hsl(262, 83%, 58%)"
      />

      <StatCard
        title="Auth requests"
        value="24 k"
        change="-5%"
        changeType="negative"
        icon={<Lock className="h-4 w-4" />}
        chartData={ordersData}
        chartType="line"
        chartColor="hsl(346, 77%, 49%)"
      />
    </div>
  )
}
