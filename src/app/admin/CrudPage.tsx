"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Upload, Download } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

export type FieldDef = {
  key: string;
  label: string;
  type: "text" | "textarea" | "boolean" | "select" | "number";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
};

export type ExcelColumnMap = {
  excelColumn: string;
  dbKey: string;
  transform?: (val: any) => any;
};

type CrudPageProps = {
  title: string;
  table: "countries" | "universities" | "english_tests" | "scholarships" | "testimonials" | "announcements" | "visa_approvals";
  fields: FieldDef[];
  columns: { key: string; label: string; render?: (val: any, row: any) => React.ReactNode }[];
  excelImport?: {
    columnMap: ExcelColumnMap[];
    sampleColumns: string[];
  };
  extraActions?: (row: any) => React.ReactNode;
  filterControls?: (onCountryFilter: (countryId: string) => void) => React.ReactNode;
};

const ImageUploadInput = ({ value, onChange, placeholder }: { value: string; onChange: (url: string) => void; placeholder?: string }) => {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to connect to server.");
    }
    setUploading(false);
  };

  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <input
        type="file"
        ref={fileRef}
        onChange={handleUpload}
        className="hidden"
        accept="image/*"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="px-3 shrink-0 rounded"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? "..." : "Upload"}
      </Button>
    </div>
  );
};

const CrudPage = ({ title, table, fields, columns, excelImport, extraActions, filterControls }: CrudPageProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [importing, setImporting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountryFilter, setSelectedCountryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const filteredData = data.filter((item) => {
    const matchesSearch = searchQuery === "" || 
      Object.values(item).some(val => String(val || "").toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCountry = selectedCountryFilter === "" || item.country_id === selectedCountryFilter;
    return matchesSearch && matchesCountry;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCountryFilterChange = (val: string) => {
    setSelectedCountryFilter(val);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const allSelected = filteredData.length > 0 && selectedIds.size === filteredData.length;
  const someSelected = selectedIds.size > 0;

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map(r => r.id)));
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${table}`);
      if (res.ok) {
        const rows = await res.json();
        setData(rows || []);
      } else {
        const errData = await res.json();
        toast({ title: "Error", description: errData.error || "Failed to fetch data.", variant: "destructive" });
      }
    } catch (err) {
      console.error("Fetch data error:", err);
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
    setLoading(false);
  }, [table, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedIds);
    try {
      const res = await fetch(`/api/admin/${table}?ids=${ids.join(",")}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({ title: "Deleted", description: `${ids.length} record(s) removed.` });
        setSelectedIds(new Set());
        fetchData();
      } else {
        const errData = await res.json();
        toast({ title: "Error", description: errData.error || "Failed to delete records.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
    setBulkDeleteOpen(false);
  };

  const openCreate = () => {
    setEditItem(null);
    const defaults: Record<string, any> = {};
    fields.forEach((f) => {
      defaults[f.key] = f.type === "boolean" ? true : "";
    });
    setForm(defaults);
    setDialogOpen(true);
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    const vals: Record<string, any> = {};
    fields.forEach((f) => { vals[f.key] = item[f.key] ?? (f.type === "boolean" ? false : ""); });
    setForm(vals);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const payload: Record<string, any> = {};
    fields.forEach((f) => {
      payload[f.key] = f.type === "number" ? (form[f.key] ? Number(form[f.key]) : 0) : form[f.key];
    });

    try {
      const url = editItem ? `/api/admin/${table}?id=${editItem.id}` : `/api/admin/${table}`;
      const method = editItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({ title: editItem ? "Updated" : "Created", description: `${title} saved successfully.` });
        setDialogOpen(false);
        fetchData();
      } else {
        const errData = await res.json();
        toast({ title: "Error", description: errData.error || "Failed to save record.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/${table}?id=${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({ title: "Deleted", description: `${title} removed.` });
        fetchData();
      } else {
        const errData = await res.json();
        toast({ title: "Error", description: errData.error || "Failed to delete record.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
    setDeleteId(null);
  };

  const handleExcelExport = () => {
    const sourceRows = selectedIds.size > 0
      ? filteredData.filter((r) => selectedIds.has(r.id))
      : filteredData;

    if (sourceRows.length === 0) {
      toast({ title: "Nothing to export", description: "No matching records to export.", variant: "destructive" });
      return;
    }

    const exportRows = sourceRows.map((row) => {
      const mapped: Record<string, any> = {};
      if (excelImport && excelImport.columnMap.length > 0) {
        excelImport.columnMap.forEach((col) => {
          const rawVal = row[col.dbKey];
          const fieldDef = fields.find((f) => f.key === col.dbKey);
          if (fieldDef?.type === "select" && fieldDef.options) {
            const opt = fieldDef.options.find((o) => o.value === rawVal);
            mapped[col.excelColumn] = opt ? opt.label : (rawVal ?? "");
          } else if (fieldDef?.type === "boolean" || typeof rawVal === "boolean") {
            mapped[col.excelColumn] = rawVal ? "Yes" : "No";
          } else {
            mapped[col.excelColumn] = rawVal ?? "";
          }
        });
      } else {
        fields.forEach((f) => {
          const rawVal = row[f.key];
          if (f.type === "select" && f.options) {
            const opt = f.options.find((o) => o.value === rawVal);
            mapped[f.label] = opt ? opt.label : (rawVal ?? "");
          } else if (f.type === "boolean") {
            mapped[f.label] = rawVal ? "Yes" : "No";
          } else {
            mapped[f.label] = rawVal ?? "";
          }
        });
      }
      return mapped;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${title}s`);
    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `${table}_export_${dateStr}.xlsx`);
    toast({ title: "Exported", description: `${exportRows.length} record(s) exported to Excel.` });
  };

  const handleExcelImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !excelImport) return;

    setImporting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

      if (jsonData.length === 0) {
        toast({ title: "Empty file", description: "No rows found in the Excel file.", variant: "destructive" });
        setImporting(false);
        return;
      }

      const rows = jsonData.map((row, index) => {
        const mapped: Record<string, any> = {};
        excelImport.columnMap.forEach((col) => {
          const val = row[col.excelColumn];
          mapped[col.dbKey] = col.transform ? col.transform(val) : (val ?? null);
        });
        if ('sort_order' in mapped && mapped.sort_order === null) {
          mapped.sort_order = index;
        }
        return mapped;
      });

      const res = await fetch(`/api/admin/${table}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rows),
      });

      if (res.ok) {
        toast({ title: "Imported", description: `${rows.length} ${title.toLowerCase()}(s) imported successfully.` });
        fetchData();
      } else {
        const errData = await res.json();
        toast({ title: "Import Error", description: errData.error || "Failed to import rows.", variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "File Error", description: err.message || "Failed to parse file.", variant: "destructive" });
    }
    setImporting(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground">{title}s</h1>
          <p className="text-sm text-muted-foreground">Manage and update {title.toLowerCase()}s in the system</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 h-9 rounded" onClick={handleExcelExport} disabled={loading || filteredData.length === 0}>
            <Download className="w-4 h-4" /> {selectedIds.size > 0 ? `Export Selected (${selectedIds.size})` : "Export Excel"}
          </Button>
          {excelImport && (
            <>
              <input type="file" ref={fileInputRef} onChange={handleExcelImport} className="hidden" accept=".xlsx, .xls" />
              <Button variant="outline" size="sm" className="gap-2 h-9 rounded" onClick={() => fileInputRef.current?.click()} disabled={importing}>
                <Upload className="w-4 h-4" /> {importing ? "Importing..." : "Import Excel"}
              </Button>
            </>
          )}
          <Button size="sm" className="bg-primary hover:bg-primary/95 text-primary-foreground gap-2 h-9 rounded" onClick={openCreate}>
            <Plus className="w-4 h-4" /> Add {title}
          </Button>
        </div>
      </div>

      {/* Search & Custom Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:w-72">
          <Input
            placeholder={`Search ${title.toLowerCase()}s...`}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-9 text-sm"
          />
        </div>
        {filterControls && filterControls(handleCountryFilterChange)}
      </div>

      {/* Bulk actions */}
      {someSelected && (
        <div className="bg-primary/5 border border-primary/20 rounded p-3 flex items-center justify-between">
          <span className="text-xs font-medium text-foreground">{selectedIds.size} item(s) selected</span>
          <Button variant="destructive" size="sm" onClick={() => setBulkDeleteOpen(true)} className="gap-1.5 h-8">
            <Trash2 className="w-3.5 h-3.5" /> Delete Selected
          </Button>
        </div>
      )}

      {/* Main Table */}
      <div className="bg-card border border-border rounded overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground text-sm">Loading records...</div>
        ) : filteredData.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">No {title.toLowerCase()}s found matching your search.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">
                      <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} className="rounded-sm border-gray-300" />
                    </TableHead>
                    {columns.map((c) => <TableHead key={c.key} className="text-foreground font-semibold">{c.label}</TableHead>)}
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((row) => (
                    <TableRow key={row.id} className="hover:bg-muted/30">
                      <TableCell className="text-center">
                        <Checkbox checked={selectedIds.has(row.id)} onCheckedChange={() => toggleSelect(row.id)} className="rounded-sm border-gray-300" />
                      </TableCell>
                      {columns.map((c) => (
                        <TableCell key={c.key} className="text-sm font-medium text-foreground max-w-[240px] truncate">
                          {c.render ? c.render(row[c.key], row) : row[c.key]?.toString()}
                        </TableCell>
                      ))}
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {extraActions && extraActions(row)}
                          <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-muted text-muted-foreground hover:text-foreground" onClick={() => openEdit(row)}>
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-red-500/10 text-muted-foreground hover:text-red-600" onClick={() => setDeleteId(row.id)}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/20">
              <div className="text-xs text-muted-foreground">
                Showing <strong className="text-foreground">{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
                <strong className="text-foreground">{Math.min(currentPage * itemsPerPage, filteredData.length)}</strong> of{" "}
                <strong className="text-foreground">{filteredData.length}</strong> entries
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="h-8 text-xs rounded px-2.5"
                >
                  Previous
                </Button>
                <span className="text-xs font-semibold px-2 text-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="h-8 text-xs rounded px-2.5"
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Editor Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md bg-background border border-border">
          <DialogHeader>
            <DialogTitle className="font-heading font-bold text-lg text-foreground">{editItem ? "Edit" : "Create"} {title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto px-1">
            {fields.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <Label className="text-xs font-semibold text-foreground">{f.label} {f.required && "*"}</Label>
                {f.type === "textarea" ? (
                  <Textarea value={form[f.key] || ""} onChange={(e) => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} rows={4} />
                ) : f.type === "boolean" ? (
                  <div className="flex items-center gap-2 pt-1">
                    <Switch checked={!!form[f.key]} onCheckedChange={(v) => setForm(p => ({ ...p, [f.key]: v }))} />
                    <span className="text-xs text-muted-foreground">{form[f.key] ? "Active / Enabled" : "Inactive / Disabled"}</span>
                  </div>
                ) : f.type === "select" ? (
                  <select value={form[f.key] || ""} onChange={(e) => setForm(p => ({ ...p, [f.key]: e.target.value }))} className="w-full rounded border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Select option</option>
                    {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : (f.key.toLowerCase().includes("image_url") || f.key.toLowerCase().includes("logo_url") || f.key.toLowerCase().includes("flag_url") || f.key === "amount" || f.key === "flag_url") ? (
                  <ImageUploadInput value={form[f.key] || ""} onChange={(url) => setForm(p => ({ ...p, [f.key]: url }))} placeholder={f.placeholder} />
                ) : (
                  <Input type={f.type} value={form[f.key] || ""} onChange={(e) => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} />
                )}
              </div>
            ))}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" className="rounded" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button size="sm" className="bg-primary hover:bg-primary/95 text-primary-foreground rounded" onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-background border border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading font-bold text-foreground">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete this record.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white rounded" onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirm */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent className="bg-background border border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading font-bold text-foreground">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently delete {selectedIds.size} record(s).</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white rounded" onClick={handleBulkDelete}>Delete All</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CrudPage;
