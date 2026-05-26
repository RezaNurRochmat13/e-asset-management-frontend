"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Package, MapPin, DollarSign, Clock, BarChart3 } from "lucide-react"
import { useDashboard } from "@/app/shared/hooks/use-dashboard"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type User = {
  id: string
  username: string
  email: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const { data, isLoading } = useDashboard()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    const stored = localStorage.getItem("user")
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [router])

  if (!user) return null

  const stats = [
    {
      label: "Total Assets",
      value: isLoading ? "..." : data?.asset_summary.total_assets ?? "—",
      icon: Package,
    },
    {
      label: "Total Value",
      value: isLoading ? "..." : data?.asset_summary.total_value ? Number(data.asset_summary.total_value).toLocaleString() : "—",
      icon: DollarSign,
    },
    {
      label: "Locations",
      value: isLoading ? "..." : data?.total_locations ?? "—",
      icon: MapPin,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {user.username}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <stat.icon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Location chart */}
      {data?.location_summary && Object.keys(data.location_summary).length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-gray-500" />
            <h2 className="text-base font-semibold text-gray-900">
              Assets per Location
            </h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={Object.entries(data.location_summary).map(([name, count]) => ({
                  name,
                  count,
                }))}
                margin={{ top: 0, right: 0, left: -16, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#111827"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-gray-500" />
          <h2 className="text-base font-semibold text-gray-900">
            Recent Activity
          </h2>
        </div>
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : data?.recent_activities?.length ? (
          <div className="space-y-3">
            {data.recent_activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user} — {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.asset}{activity.remarks ? ` — ${activity.remarks}` : ""}
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  {new Date(activity.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No recent activity to show.</p>
        )}
      </div>
    </div>
  )
}
