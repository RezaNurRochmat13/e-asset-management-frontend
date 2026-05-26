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
import type { Asset } from "@/app/shared/api/assets"
import {
  useAssets,
  useCreateAsset,
} from "@/app/shared/hooks/use-assets"
import { useLocations } from "@/app/shared/hooks/use-locations"
import { EditAssetDialog } from "./edit-dialog"

export default function AssetPage() {
  const { data: assets, isLoading, isError, error } = useAssets()
  const { data: locations } = useLocations()
  const createAsset = useCreateAsset()

  const [createOpen, setCreateOpen] = useState(false)
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null)
  const [editAsset, setEditAsset] = useState<Asset | null>(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [assetCode, setAssetCode] = useState("")
  const [serialNumber, setSerialNumber] = useState("")
  const [assetType, setAssetType] = useState("")
  const [status, setStatus] = useState("")
  const [acquisitionCost, setAcquisitionCost] = useState("")
  const [salvageValue, setSalvageValue] = useState("")
  const [usefulLife, setUsefulLife] = useState("")
  const [buyDate, setBuyDate] = useState("")
  const [taxDate, setTaxDate] = useState("")
  const [notes, setNotes] = useState("")
  const [remarks, setRemarks] = useState("")
  const [locationId, setLocationId] = useState("")

  const resetForm = () => {
    setName("")
    setDescription("")
    setAssetCode("")
    setSerialNumber("")
    setAssetType("")
    setStatus("")
    setAcquisitionCost("")
    setSalvageValue("")
    setUsefulLife("")
    setBuyDate("")
    setTaxDate("")
    setNotes("")
    setRemarks("")
    setLocationId("")
  }

  const getLocationName = (id: number) =>
    locations?.find((l) => l.id === id)?.name ?? "—"

  const columns: Column<Asset>[] = [
    {
      header: "Code",
      render: (a) => <span className="font-mono text-xs">{a.asset_code}</span>,
    },
    { header: "Name", accessor: "name", className: "font-medium" },
    { header: "Type", accessor: "asset_type" },
    {
      header: "Status",
      render: (a) => (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
          a.status === "active" ? "bg-green-100 text-green-700" :
          a.status === "maintenance" ? "bg-yellow-100 text-yellow-700" :
          a.status === "retired" ? "bg-red-100 text-red-700" :
          "bg-gray-100 text-gray-700"
        }`}>
          {a.status}
        </span>
      ),
    },
    { header: "Location", render: (a) => getLocationName(a.location_id) },
  ]

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    createAsset.mutate(
      {
        name,
        description,
        asset_code: assetCode,
        serial_number: serialNumber,
        asset_type: assetType,
        status,
        acquisition_cost: acquisitionCost ? Number(acquisitionCost) : undefined,
        salvage_value: salvageValue ? Number(salvageValue) : undefined,
        useful_life: usefulLife ? Number(usefulLife) : undefined,
        buy_date: buyDate || undefined,
        tax_date: taxDate || undefined,
        notes,
        remarks,
        location_id: locationId ? Number(locationId) : undefined,
      },
      {
        onSuccess: () => {
          toast.success("Asset created successfully")
          setCreateOpen(false)
          resetForm()
        },
        onError: (err) => {
          toast.error(err?.message || "Failed to create asset")
        },
      }
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Asset</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your assets
          </p>
        </div>
        <Button onClick={() => { resetForm(); setCreateOpen(true) }}>
          <Plus className="h-4 w-4" />
          Add Asset
        </Button>
      </div>

      <DataTable
        data={assets}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        error={error}
        emptyMessage="No assets yet."
        keyExtractor={(a) => a.id}
        actions={[
          {
            icon: <Eye className="h-4 w-4" />,
            onClick: (a) => setPreviewAsset(a),
            label: "View",
          },
          {
            icon: <Pencil className="h-4 w-4" />,
            onClick: (a) => setEditAsset(a),
            label: "Edit",
          },
        ]}
      />

      {/* Create Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Asset</DialogTitle>
            <DialogDescription>Create a new asset.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="create-name">Name *</Label>
                <Input id="create-name" placeholder="Asset name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-code">Asset Code *</Label>
                <Input id="create-code" placeholder="AST-001" value={assetCode} onChange={(e) => setAssetCode(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-serial">Serial Number</Label>
                <Input id="create-serial" placeholder="SN-12345" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-type">Asset Type *</Label>
                <Input id="create-type" placeholder="Equipment / Vehicle / etc" value={assetType} onChange={(e) => setAssetType(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-status">Status *</Label>
                <Input id="create-status" placeholder="active / maintenance / retired" value={status} onChange={(e) => setStatus(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-location">Location</Label>
                <select
                  id="create-location"
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                >
                  <option value="">Select location</option>
                  {locations?.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-cost">Acquisition Cost</Label>
                <Input id="create-cost" type="number" placeholder="1000000" value={acquisitionCost} onChange={(e) => setAcquisitionCost(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-salvage">Salvage Value</Label>
                <Input id="create-salvage" type="number" placeholder="0" value={salvageValue} onChange={(e) => setSalvageValue(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-life">Useful Life (years)</Label>
                <Input id="create-life" type="number" placeholder="5" value={usefulLife} onChange={(e) => setUsefulLife(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-buy-date">Buy Date</Label>
                <Input id="create-buy-date" type="date" value={buyDate} onChange={(e) => setBuyDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-tax-date">Tax Date</Label>
                <Input id="create-tax-date" type="date" value={taxDate} onChange={(e) => setTaxDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-notes">Notes</Label>
                <Input id="create-notes" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-remarks">Remarks</Label>
                <Input id="create-remarks" placeholder="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="create-description">Description</Label>
                <Input id="create-description" placeholder="Asset description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createAsset.isPending}>
                {createAsset.isPending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewAsset} onOpenChange={(v) => { if (!v) setPreviewAsset(null) }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Asset Details</DialogTitle>
            <DialogDescription>Detailed information about this asset.</DialogDescription>
          </DialogHeader>
          {previewAsset && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div><p className="text-sm font-medium text-gray-500">Asset Code</p><p className="text-sm text-gray-900">{previewAsset.asset_code}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Name</p><p className="text-sm text-gray-900">{previewAsset.name}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Serial Number</p><p className="text-sm text-gray-900">{previewAsset.serial_number || "—"}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Type</p><p className="text-sm text-gray-900">{previewAsset.asset_type}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Status</p><p className="text-sm text-gray-900">{previewAsset.status}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Location</p><p className="text-sm text-gray-900">{getLocationName(previewAsset.location_id)}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Acquisition Cost</p><p className="text-sm text-gray-900">{previewAsset.acquisition_cost ?? "—"}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Salvage Value</p><p className="text-sm text-gray-900">{previewAsset.salvage_value ?? "—"}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Useful Life</p><p className="text-sm text-gray-900">{previewAsset.useful_life ?? "—"} years</p></div>
              <div><p className="text-sm font-medium text-gray-500">Buy Date</p><p className="text-sm text-gray-900">{previewAsset.buy_date || "—"}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Tax Date</p><p className="text-sm text-gray-900">{previewAsset.tax_date || "—"}</p></div>
              <div className="col-span-2"><p className="text-sm font-medium text-gray-500">Description</p><p className="text-sm text-gray-900">{previewAsset.description || "—"}</p></div>
              <div className="col-span-2"><p className="text-sm font-medium text-gray-500">Notes</p><p className="text-sm text-gray-900">{previewAsset.notes || "—"}</p></div>
              <div className="col-span-2"><p className="text-sm font-medium text-gray-500">Remarks</p><p className="text-sm text-gray-900">{previewAsset.remarks || "—"}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Created At</p><p className="text-sm text-gray-900">{new Date(previewAsset.created_at).toLocaleString()}</p></div>
              <div><p className="text-sm font-medium text-gray-500">Updated At</p><p className="text-sm text-gray-900">{new Date(previewAsset.updated_at).toLocaleString()}</p></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewAsset(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EditAssetDialog
        asset={editAsset}
        locations={locations ?? []}
        onClose={() => setEditAsset(null)}
      />
    </div>
  )
}
