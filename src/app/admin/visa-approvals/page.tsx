"use client";

import CrudPage, { FieldDef, ExcelColumnMap } from "../CrudPage";

const fields: FieldDef[] = [
  { key: "student_name", label: "Student Name", type: "text", required: true },
  { key: "country", label: "Country", type: "text", required: true },
  { key: "visa_type", label: "Visa Type", type: "text", placeholder: "e.g. Student Visa, Work Permit" },
  { key: "flag_url", label: "Country Flag URL", type: "text", placeholder: "https://flagcdn.com/w40/gb.png" },
  { key: "sort_order", label: "Sort Order", type: "number" },
  { key: "is_active", label: "Active", type: "boolean" },
];

const columns = [
  { key: "student_name", label: "Student" },
  { key: "country", label: "Country", render: (v: string, row: any) => (
    <span className="inline-flex items-center gap-2">
      {row.flag_url && <img src={row.flag_url} alt="" className="w-5 h-3.5 object-cover rounded-sm" />}
      {v}
    </span>
  )},
  { key: "visa_type", label: "Visa Type", render: (v: string) => v || "—" },
  { key: "is_active", label: "Active", render: (v: boolean) => v ? "✅" : "❌" },
];

const excelImport = {
  columnMap: [
    { excelColumn: "Student Name", dbKey: "student_name" },
    { excelColumn: "Country", dbKey: "country" },
    { excelColumn: "Visa Type", dbKey: "visa_type" },
    { excelColumn: "Flag URL", dbKey: "flag_url" },
    { excelColumn: "Sort Order", dbKey: "sort_order", transform: (v: any) => (v ? Number(v) : null) },
  ] as ExcelColumnMap[],
  sampleColumns: ["Student Name", "Country", "Visa Type", "Flag URL", "Sort Order"],
};

export default function VisaApprovalsAdminPage() {
  return (
    <CrudPage
      title="Visa Approval"
      table="visa_approvals"
      fields={fields}
      columns={columns}
      excelImport={excelImport}
    />
  );
}
