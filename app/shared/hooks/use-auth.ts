"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { login, register, type LoginRequest, type RegisterRequest } from "@/app/shared/api/auth"

export function useLogin() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token)
      localStorage.setItem("user", JSON.stringify(data.data.user))
      router.push("/dashboard")
    },
  })
}

export function useRegister() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token)
      localStorage.setItem("user", JSON.stringify(data.data.user))
      router.push("/dashboard")
    },
  })
}
