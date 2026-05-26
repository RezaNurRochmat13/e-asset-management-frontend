"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/app/shared/components/ui/button"
import { Input } from "@/app/shared/components/ui/input"
import { Label } from "@/app/shared/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/shared/components/ui/dialog"
import type { Location } from "@/app/shared/api/locations"
import {
  useLocations,
  useCreateLocation,
} from "@/app/shared/hooks/use-locations"
import { EditLocationDialog } from "./edit-dialog"

const PAGE_SIZE = 10

export default function LocationPage() {
  const { data: locations, isLoading, isError, error } = useLocations()
  const createLocation = useCreateLocation()

  const [page, setPage] = useState(1)
  const [createOpen, setCreateOpen] = useState(false)
  const [previewLocation, setPreviewLocation] = useState<Location | null>(null)
  const [editLocation, setEditLocation] = useState<Location | null>(null)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")

  const resetForm = () => {
    setName("")
    setAddress("")
    setDescription("")
  }

  const totalPages = locations ? Math.ceil(locations.length / PAGE_SIZE) : 1
  const paginatedLocations = locations?.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  useEffect(() => {
    setPage(1)
  }, [locations])

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    createLocation.mutate(
      { name, address, description },
      {
        onSuccess: () => {
          toast.success("Location created successfully")
          setCreateOpen(false)
          resetForm()
        },
        onError: (err) => {
          toast.error(err?.message || "Failed to create location")
        },
      }
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Location</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your locations
          </p>
        </div>
        <Button onClick={() => { resetForm(); setCreateOpen(true) }}>
          <Plus className="h-4 w-4" />
          Add Location
        </Button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Address
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Description
              </th>
              <th className="px-6 py-3 text-right font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-red-500">
                  Error: {(error as Error)?.message || "Failed to load locations"}
                </td>
              </tr>
            ) : paginatedLocations?.length ? (
              paginatedLocations.map((location) => (
                <tr key={location.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {location.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {location.address || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {location.description || "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => setPreviewLocation(location)}
                        className="text-gray-400 hover:text-gray-600 transition"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditLocation(location)}
                        className="text-gray-400 hover:text-gray-600 transition"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No locations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {locations && locations.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500">
            Page {page} of {totalPages} ({locations.length} total)
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    p === page
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Location</DialogTitle>
            <DialogDescription>
              Create a new location.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="create-name">Name</Label>
                <Input
                  id="create-name"
                  placeholder="Warehouse A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-address">Address</Label>
                <Input
                  id="create-address"
                  placeholder="123 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-description">Description</Label>
                <Input
                  id="create-description"
                  placeholder="Main warehouse location"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createLocation.isPending}>
                {createLocation.isPending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewLocation} onOpenChange={(v) => { if (!v) setPreviewLocation(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Location Details</DialogTitle>
            <DialogDescription>
              Detailed information about this location.
            </DialogDescription>
          </DialogHeader>
          {previewLocation && (
            <div className="space-y-4 py-4">
              <div>
                <p className="text-sm font-medium text-gray-500">ID</p>
                <p className="text-sm text-gray-900">{previewLocation.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-sm text-gray-900">{previewLocation.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-sm text-gray-900">{previewLocation.address || "—"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-sm text-gray-900">{previewLocation.description || "—"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p className="text-sm text-gray-900">
                  {new Date(previewLocation.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Updated At</p>
                <p className="text-sm text-gray-900">
                  {new Date(previewLocation.updated_at).toLocaleString()}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewLocation(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EditLocationDialog
        location={editLocation}
        onClose={() => setEditLocation(null)}
      />
    </div>
  )
}
