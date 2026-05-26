"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Package, MapPin, Users, Clock } from "lucide-react"
import { useDashboard } from "@/app/shared/hooks/use-dashboard"

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
      label: "Locations",
      value: isLoading ? "..." : data?.location_summary.total_locations ?? "—",
      icon: MapPin,
    },
    {
      label: "Categories",
      value: isLoading ? "..." : data?.asset_summary.total_categories ?? "—",
      icon: Users,
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
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
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
