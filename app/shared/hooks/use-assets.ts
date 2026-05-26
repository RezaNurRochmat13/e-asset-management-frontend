"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  type CreateAssetRequest,
  type UpdateAssetRequest,
} from "@/app/shared/api/assets"

export function useAssets() {
  return useQuery({
    queryKey: ["assets"],
    queryFn: getAssets,
  })
}

export function useAsset(id: number) {
  return useQuery({
    queryKey: ["assets", id],
    queryFn: () => getAsset(id),
    enabled: !!id,
  })
}

export function useCreateAsset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateAssetRequest) => createAsset(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
    },
  })
}

export function useUpdateAsset(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateAssetRequest) => updateAsset(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] })
    },
  })
}
