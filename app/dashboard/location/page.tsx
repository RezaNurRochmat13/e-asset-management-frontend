"use client"

import { useState } from "react"
import { Plus, Pencil, Eye } from "lucide-react"
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
import { DataTable, type Column } from "@/app/shared/components/ui/data-table"
import type { Location } from "@/app/shared/api/locations"
import {
  useLocations,
  useCreateLocation,
} from "@/app/shared/hooks/use-locations"
import { EditLocationDialog } from "./edit-dialog"

export default function LocationPage() {
  const { data: locations, isLoading, isError, error } = useLocations()
  const createLocation = useCreateLocation()

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

  const columns: Column<Location>[] = [
    { header: "Name", accessor: "name" },
    { header: "Address", render: (l) => l.address || "—" },
    { header: "Description", render: (l) => l.description || "—" },
  ]

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

      <DataTable
        data={locations}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        error={error}
        emptyMessage="No locations yet."
        keyExtractor={(l) => l.id}
        actions={[
          {
            icon: <Eye className="h-4 w-4" />,
            onClick: (l) => setPreviewLocation(l),
            label: "View",
          },
          {
            icon: <Pencil className="h-4 w-4" />,
            onClick: (l) => setEditLocation(l),
            label: "Edit",
          },
        ]}
      />

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
