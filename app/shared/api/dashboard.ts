import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3001/api/dashboard",
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export type AssetSummary = {
  total_assets: number
  total_value: string
  average_value: string
  by_status: Record<string, number>
}

export type LocationSummary = Record<string, number>

export type TotalLocationsData = {
  total: number
}

export type RecentActivity = {
  id: number
  user: string
  asset: string
  action: string
  remarks: string
  created_at: string
}

export type DashboardData = {
  asset_summary: AssetSummary
  location_summary: LocationSummary
  total_locations: number
  recent_activities: RecentActivity[]
}

type ApiResponse<T> = {
  status: string
  data: T
}

export async function getDashboardData(): Promise<DashboardData> {
  const [assetRes, locationRes, totalLocRes, activityRes] = await Promise.all([
    api.get<ApiResponse<AssetSummary>>("/asset_summary"),
    api.get<ApiResponse<LocationSummary>>("/location_summary"),
    api.get<ApiResponse<TotalLocationsData>>("/total_locations"),
    api.get<ApiResponse<RecentActivity[]>>("/recent_activities"),
  ])

  return {
    asset_summary: assetRes.data.data,
    location_summary: locationRes.data.data,
    total_locations: totalLocRes.data.data.total,
    recent_activities: activityRes.data.data,
  }
}
