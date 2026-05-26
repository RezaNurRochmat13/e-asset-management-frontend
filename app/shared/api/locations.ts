import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3001/api/locations",
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

export type Location = {
  id: number
  name: string
  address: string
  description: string
  created_at: string
  updated_at: string
}

type ApiResponse<T> = {
  status: string
  data: T
}

export type CreateLocationRequest = {
  name: string
  address: string
  description: string
}

export type UpdateLocationRequest = {
  name: string
  address: string
  description: string
}

export async function getLocations(): Promise<Location[]> {
  const response = await api.get<ApiResponse<Location[]>>("/")
  return response.data.data
}

export async function getLocation(id: number): Promise<Location> {
  const response = await api.get<ApiResponse<Location>>(`/${id}`)
  return response.data.data
}

export async function createLocation(
  data: CreateLocationRequest
): Promise<Location> {
  const response = await api.post<ApiResponse<Location>>("/", data)
  return response.data.data
}

export async function updateLocation(
  id: number,
  data: UpdateLocationRequest
): Promise<Location> {
  const response = await api.put<ApiResponse<Location>>(`/${id}`, data)
  return response.data.data
}
