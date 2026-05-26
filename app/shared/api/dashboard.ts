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
  total_categories: number
}

export type LocationSummary = {
  total_locations: number
}

export type RecentActivity = {
  id: string
  action: string
  description: string
  created_at: string
}

export type DashboardData = {
  asset_summary: AssetSummary
  location_summary: LocationSummary
  recent_activities: RecentActivity[]
}

type ApiResponse<T> = {
  status: string
  data: T
}

export async function getDashboardData(): Promise<DashboardData> {
  const [assetRes, locationRes, activityRes] = await Promise.all([
    api.get<ApiResponse<AssetSummary>>("/asset_summary"),
    api.get<ApiResponse<LocationSummary>>("/location_summary"),
    api.get<ApiResponse<RecentActivity[]>>("/recent_activities"),
  ])

  return {
    asset_summary: assetRes.data.data,
    location_summary: locationRes.data.data,
    recent_activities: activityRes.data.data,
  }
}
