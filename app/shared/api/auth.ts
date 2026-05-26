import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3001/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
})

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  user: {
    username: string
    first_name: string
    last_name: string
    email: string
    password: string
  }
}

export type AuthResponse = {
  data: {
    token: string
    user: {
      id: string
      username: string
      email: string
    }
  }
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/login", data)
  return response.data
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/register", data)
  return response.data
}
