"use client"

import { useQuery } from "@tanstack/react-query"
import { getDashboardData } from "@/app/shared/api/dashboard"

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  })
}
