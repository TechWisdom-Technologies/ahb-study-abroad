"use client";

import { useState } from "react";
import CrudPage, { FieldDef, ExcelColumnMap } from "../CrudPage";
import DestinationEditor from "./DestinationEditor";

const fields: FieldDef[] = [
  { key: "name", label: "Country Name", type: "text", required: true },
  { key: "flag_code", label: "Flag Code (e.g. gb, au)", type: "text", required: true },
  { key: "flag_image_url", label: "Flag Image URL (optional)", type: "text", placeholder: "https://..." },
  { key: "university_count", label: "Number of Universities", type: "number" },
  { key: "expense_range", label: "Expense Range (e.g. £10,000 - £38,000/yr)", type: "text" },
  { key: "special_feature", label: "Special Feature", type: "text", placeholder: "e.g. 3-year post-study work visa" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "sort_order", label: "Sort Order", type: "number" },
  { key: "is_active", label: "Active", type: "boolean" },
];

const columns = [
  { key: "name", label: "Name" },
  { key: "flag_code", label: "Flag" },
  { key: "university_count", label: "Unis" },
  { key: "expense_range", label: "Expense" },
  { key: "is_active", label: "Active", render: (v: boolean) => v ? "✅" : "❌" },
];

const excelImport = {
  columnMap: [
    { excelColumn: "Country Name", dbKey: "name" },
    { excelColumn: "Flag Code", dbKey: "flag_code" },
    { excelColumn: "Flag Image URL", dbKey: "flag_image_url" },
    { excelColumn: "University Count", dbKey: "university_count", transform: (v: any) => Number(v) || 0 },
    { excelColumn: "Expense Range", dbKey: "expense_range" },
    { excelColumn: "Special Feature", dbKey: "special_feature" },
    { excelColumn: "Description", dbKey: "description" },
  ] as ExcelColumnMap[],
  sampleColumns: ["Country Name", "Flag Code", "Flag Image URL", "University Count", "Expense Range", "Special Feature", "Description"],
};

export default function CountriesAdminPage() {
  const [editingDestination, setEditingDestination] = useState<{ id: string; name: string } | null>(null);

  if (editingDestination) {
    return (
      <DestinationEditor
        countryId={editingDestination.id}
        countryName={editingDestination.name}
        onBack={() => setEditingDestination(null)}
      />
    );
  }

  return (
    <CrudPage
      title="Country"
      table="countries"
      fields={fields}
      columns={columns}
      excelImport={excelImport}
      extraActions={(row) => (
        <button
          onClick={() => setEditingDestination({ id: row.id, name: row.name })}
          className="text-[10px] px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors font-semibold"
          title="Configure destination page"
        >
          📄 Page
        </button>
      )}
    />
  );
}
