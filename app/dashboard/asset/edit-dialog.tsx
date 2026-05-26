"use client"

import { useState, useEffect } from "react"
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
import type { Asset } from "@/app/shared/api/assets"
import type { Location } from "@/app/shared/api/locations"
import { useUpdateAsset } from "@/app/shared/hooks/use-assets"

type Props = {
  asset: Asset | null
  locations: Location[]
  onClose: () => void
}

export function EditAssetDialog({ asset, locations, onClose }: Props) {
  const open = !!asset
  const updateAsset = useUpdateAsset(asset?.id ?? 0)

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

  useEffect(() => {
    if (asset) {
      setName(asset.name)
      setDescription(asset.description ?? "")
      setAssetCode(asset.asset_code)
      setSerialNumber(asset.serial_number ?? "")
      setAssetType(asset.asset_type)
      setStatus(asset.status)
      setAcquisitionCost(asset.acquisition_cost?.toString() ?? "")
      setSalvageValue(asset.salvage_value?.toString() ?? "")
      setUsefulLife(asset.useful_life?.toString() ?? "")
      setBuyDate(asset.buy_date ?? "")
      setTaxDate(asset.tax_date ?? "")
      setNotes(asset.notes ?? "")
      setRemarks(asset.remarks ?? "")
      setLocationId(asset.location_id?.toString() ?? "")
    }
  }, [asset])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!asset) return
    updateAsset.mutate(
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
          toast.success("Asset updated successfully")
          onClose()
        },
        onError: (err) => {
          toast.error(err?.message || "Failed to update asset")
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose() }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Asset</DialogTitle>
          <DialogDescription>Update asset details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name *</Label>
              <Input id="edit-name" placeholder="Asset name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-code">Asset Code *</Label>
              <Input id="edit-code" placeholder="AST-001" value={assetCode} onChange={(e) => setAssetCode(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-serial">Serial Number</Label>
              <Input id="edit-serial" placeholder="SN-12345" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">Asset Type *</Label>
              <Input id="edit-type" placeholder="Equipment / Vehicle / etc" value={assetType} onChange={(e) => setAssetType(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status *</Label>
              <Input id="edit-status" placeholder="active / maintenance / retired" value={status} onChange={(e) => setStatus(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <select
                id="edit-location"
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
              <Label htmlFor="edit-cost">Acquisition Cost</Label>
              <Input id="edit-cost" type="number" placeholder="1000000" value={acquisitionCost} onChange={(e) => setAcquisitionCost(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-salvage">Salvage Value</Label>
              <Input id="edit-salvage" type="number" placeholder="0" value={salvageValue} onChange={(e) => setSalvageValue(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-life">Useful Life (years)</Label>
              <Input id="edit-life" type="number" placeholder="5" value={usefulLife} onChange={(e) => setUsefulLife(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-buy-date">Buy Date</Label>
              <Input id="edit-buy-date" type="date" value={buyDate} onChange={(e) => setBuyDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tax-date">Tax Date</Label>
              <Input id="edit-tax-date" type="date" value={taxDate} onChange={(e) => setTaxDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Input id="edit-notes" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-remarks">Remarks</Label>
              <Input id="edit-remarks" placeholder="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input id="edit-description" placeholder="Asset description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={updateAsset.isPending}>
              {updateAsset.isPending ? "Saving..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
