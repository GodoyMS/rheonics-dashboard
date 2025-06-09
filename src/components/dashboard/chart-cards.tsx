"use client"

import { Database, Users, Activity, Zap, TrendingUp, Eye } from "lucide-react"
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useTheme } from "@/providers/theme-provider"

const databaseActivityData = [
  { time: "00:00", queries: 1200, connections: 45, latency: 12, throughput: 85 },
  { time: "04:00", queries: 800, connections: 32, latency: 8, throughput: 92 },
  { time: "08:00", queries: 2400, connections: 78, latency: 18, throughput: 76 },
  { time: "12:00", queries: 3200, connections: 95, latency: 25, throughput: 68 },
  { time: "16:00", queries: 2800, connections: 87, latency: 22, throughput: 71 },
  { time: "20:00", queries: 2000, connections: 65, latency: 15, throughput: 83 },
  { time: "24:00", queries: 1400, connections: 52, latency: 10, throughput: 89 },
]

const performanceMetrics = [
  { name: "CPU Usage", value: 73, fill: "#00D9FF" },
  { name: "Memory", value: 86, fill: "#7C3AED" },
  { name: "Disk I/O", value: 45, fill: "#10B981" },
  { name: "Network", value: 67, fill: "#F59E0B" },
]


// User statistics data
const userActivityData = [
  { time: "Mon", active: 1247, new: 89, returning: 892, sessions: 2340 },
  { time: "Tue", active: 1356, new: 124, returning: 945, sessions: 2580 },
  { time: "Wed", active: 1189, new: 67, returning: 823, sessions: 2190 },
  { time: "Thu", active: 1445, new: 156, returning: 1034, sessions: 2890 },
  { time: "Fri", active: 1678, new: 203, returning: 1245, sessions: 3240 },
  { time: "Sat", active: 1234, new: 98, returning: 876, sessions: 2456 },
  { time: "Sun", active: 1098, new: 76, returning: 734, sessions: 2123 },
]

const userDemographics = [
  { name: "Desktop Users", value: 1247, fill: "#00D9FF" },
  { name: "Mobile Users", value: 1856, fill: "#7C3AED" },
  { name: "Tablet Users", value: 423, fill: "#10B981" },
  { name: "Other Devices", value: 234, fill: "#F59E0B" },
]

const chartConfig = {
  queries: { label: "Queries/min", color: "#00D9FF" },
  connections: { label: "Active Connections", color: "#7C3AED" },
  latency: { label: "Avg Latency (ms)", color: "#EF4444" },
  throughput: { label: "Throughput %", color: "#10B981" },
}


function DatabaseActivityCard() {
  const currentQueries = databaseActivityData[databaseActivityData.length - 1].queries
  const avgLatency = databaseActivityData[databaseActivityData.length - 1].latency
  const totalConnections = databaseActivityData[databaseActivityData.length - 1].connections

  return (
    <Card className="col-span-1  bg-gradient-to-b from-slate-50 to-slate-100 dark:bg-gradient-to-br dark:from-slate-900/90 dark:to-slate-800/50 dark:border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold flex items-center gap-3 ">
              <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/30">
                <Database className="h-5 w-5 text-cyan-400" />
              </div>
              Database Activity Monitor
            </CardTitle>
            <CardDescription className="">Real-time database performance metrics</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Combined Chart */}
        <div className="h-[240px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={databaseActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="queriesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00D9FF" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                    borderRadius: "8px",
                    color: "#F1F5F9",
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="queries"
                  stroke="#00D9FF"
                  strokeWidth={2}
                  fill="url(#queriesGradient)"
                  name="Queries/min"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="throughput"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#throughputGradient)"
                  name="Throughput %"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="connections"
                  stroke="#7C3AED"
                  strokeWidth={3}
                  dot={{ fill: "#7C3AED", strokeWidth: 2, r: 4 }}
                  name="Connections"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="latency"
                  stroke="#EF4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#EF4444", strokeWidth: 2, r: 3 }}
                  name="Latency (ms)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Performance Radial Chart */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold ">System Performance</h4>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={performanceMetrics}>
                  <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "rgba(148, 163, 184, 0.1)" }} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold ">Key Metrics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Current Queries</span>
                <span className="text-lg font-bold text-cyan-400">{currentQueries.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Avg Latency</span>
                <span className="text-lg font-bold text-red-400">{avgLatency}ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Connections</span>
                <span className="text-lg font-bold text-purple-400">{totalConnections}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm ">Database Online</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-yellow-400">High Load</span>
            </div>
          </div>
          <div className="text-xs text-slate-500">Updated 2s ago</div>
        </div>
      </CardContent>
    </Card>
  )
}

function UserStatisticsCard() {
  const totalUsers = userDemographics.reduce((sum, item) => sum + item.value, 0)
  const todayActive = userActivityData[userActivityData.length - 1].active
  const todaySessions = userActivityData[userActivityData.length - 1].sessions

  const{theme}=useTheme()

  return (
    <Card className="col-span-1 bg-gradient-to-br from-purple-50 to-pink-50/50 dark:bg-gradient-to-br dark:from-purple-900/90 dark:to-pink-900/50 dark:border-purple-700/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold flex items-center gap-3 ">
              <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                <Users className="h-5 w-5 text-purple-800 dark:text-purple-300" />
              </div>
              User Analytics Dashboard
            </CardTitle>
            <CardDescription className="">User engagement and activity insights</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-purple-800 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-800 dark:text-purple-400">Tracking</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main User Activity Chart */}
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={userActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#7C2D92" opacity={0.3} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#C4B5FD", fontSize: 12 }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: "#C4B5FD", fontSize: 12 }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#C4B5FD", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme==="dark"? "rgba(88, 28, 135, 0.95)" : "white",
                  border: "1px solid rgba(196, 181, 253, 0.2)",
                  borderRadius: "8px",
                  color: theme==="dark" ?"#F3E8FF": "black",
                }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="active"
                stroke="#A855F7"
                strokeWidth={2}
                fill="url(#activeGradient)"
                name="Active Users"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="sessions"
                stroke="#EC4899"
                strokeWidth={2}
                fill="url(#sessionsGradient)"
                name="Sessions"
              />
              <Bar yAxisId="left" dataKey="new" fill="#10B981" name="New Users" radius={[2, 2, 0, 0]} opacity={0.7} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="returning"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                name="Returning Users"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Device Distribution Pie Chart */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold ">Device Distribution</h4>
            <div className="h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userDemographics}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {userDemographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [value.toLocaleString(), "Users"]}
                  
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold ">Today's Stats</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Active Users</span>
                <span className="text-lg font-bold text-purple-400">{todayActive.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Total Sessions</span>
                <span className="text-lg font-bold text-pink-400">{todaySessions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Total Users</span>
                <span className="text-lg font-bold text-cyan-400">{totalUsers.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="flex items-center justify-between pt-4 border-t border-purple-700/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">+12% Growth</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-sm ">Real-time Tracking</span>
            </div>
          </div>
          <div className="text-xs text-slate-500">Last sync: now</div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ModernChartCards() {
  return (
    <div className=" flex flex-col gap-6 md:grid  md:grid-cols-2 w-full">
      <DatabaseActivityCard />
      <UserStatisticsCard />
    </div>
  )
}
