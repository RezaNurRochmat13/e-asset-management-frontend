"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type Column<T> = {
  header: string
  accessor?: keyof T
  render?: (item: T) => React.ReactNode
  className?: string
}

type Action<T> = {
  icon: React.ReactNode
  onClick: (item: T) => void
  label?: string
}

type DataTableProps<T> = {
  data: T[] | undefined
  columns: Column<T>[]
  isLoading?: boolean
  isError?: boolean
  error?: Error | null
  emptyMessage?: string
  actions?: Action<T>[]
  pageSize?: number
  keyExtractor: (item: T) => string | number
}

export function DataTable<T>({
  data,
  columns,
  isLoading,
  isError,
  error,
  emptyMessage = "No data yet.",
  actions,
  pageSize = 10,
  keyExtractor,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1)
  const totalPages = data ? Math.ceil(data.length / pageSize) : 1
  const paginated = data?.slice((page - 1) * pageSize, page * pageSize)
  const colSpan = columns.length + (actions ? 1 : 0)

  useEffect(() => {
    setPage(1)
  }, [data])

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.header}
                  className={`px-4 py-3 text-left font-medium text-gray-500 ${col.className ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 text-right font-medium text-gray-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={colSpan} className="px-4 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={colSpan} className="px-4 py-8 text-center text-red-500">
                  Error: {error?.message || "Failed to load data"}
                </td>
              </tr>
            ) : paginated?.length ? (
              paginated.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className="border-b border-gray-100 last:border-0"
                >
                  {columns.map((col) => (
                    <td key={col.header} className={`px-4 py-3 ${col.className ?? ""}`}>
                      {col.render
                        ? col.render(item)
                        : col.accessor
                          ? String(item[col.accessor] ?? "—")
                          : "—"}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => action.onClick(item)}
                            className="text-gray-400 hover:text-gray-600 transition"
                            title={action.label}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={colSpan} className="px-4 py-8 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data && data.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500">
            Page {page} of {totalPages} ({data.length} total)
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
            ))}
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
    </div>
  )
}
