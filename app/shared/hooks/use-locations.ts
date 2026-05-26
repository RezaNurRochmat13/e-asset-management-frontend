"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  type CreateLocationRequest,
  type UpdateLocationRequest,
} from "@/app/shared/api/locations"

export function useLocations() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  })
}

export function useLocation(id: number) {
  return useQuery({
    queryKey: ["locations", id],
    queryFn: () => getLocation(id),
    enabled: !!id,
  })
}

export function useCreateLocation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateLocationRequest) => createLocation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] })
    },
  })
}

export function useUpdateLocation(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateLocationRequest) => updateLocation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] })
    },
  })
}
