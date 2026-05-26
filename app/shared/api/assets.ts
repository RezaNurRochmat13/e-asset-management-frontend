import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3001/api/assets",
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

export type Asset = {
  id: number
  name: string
  description: string
  asset_code: string
  serial_number: string
  asset_type: string
  status: string
  asset_image_url: string
  acquisition_cost: number
  salvage_value: number
  useful_life: number
  buy_date: string
  tax_date: string
  notes: string
  remarks: string
  location_id: number
  created_at: string
  updated_at: string
}

type ApiResponse<T> = {
  status: string
  data: T
}

export type CreateAssetRequest = {
  name: string
  description: string
  asset_code: string
  serial_number: string
  asset_type: string
  status: string
  asset_image_url?: string
  acquisition_cost?: number
  salvage_value?: number
  useful_life?: number
  buy_date?: string
  tax_date?: string
  notes?: string
  remarks?: string
  location_id?: number
}

export type UpdateAssetRequest = CreateAssetRequest

export async function getAssets(): Promise<Asset[]> {
  const response = await api.get<ApiResponse<Asset[]>>("/")
  return response.data.data
}

export async function getAsset(id: number): Promise<Asset> {
  const response = await api.get<ApiResponse<Asset>>(`/${id}`)
  return response.data.data
}

export async function createAsset(
  data: CreateAssetRequest
): Promise<Asset> {
  const response = await api.post<ApiResponse<Asset>>("/", { asset: data })
  return response.data.data
}

export async function updateAsset(
  id: number,
  data: UpdateAssetRequest
): Promise<Asset> {
  const response = await api.put<ApiResponse<Asset>>(`/${id}`, { asset: data })
  return response.data.data
}
