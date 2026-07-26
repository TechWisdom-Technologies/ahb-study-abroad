"use client";

import CrudPage, { FieldDef, ExcelColumnMap } from "../CrudPage";

const fields: FieldDef[] = [
  { key: "name", label: "Course Title", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea" },
  { key: "fee", label: "Fee (BDT)", type: "text", placeholder: "e.g. 25,500" },
  { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 3 months" },
  { key: "image_url", label: "Course Image URL", type: "text", placeholder: "https://..." },
];

const columns = [
  { key: "name", label: "Course Title" },
  { key: "fee", label: "Fee (BDT)" },
  { key: "duration", label: "Duration" },
];

const excelImport = {
  columnMap: [
    { excelColumn: "Course Title", dbKey: "name" },
    { excelColumn: "Description", dbKey: "description" },
    { excelColumn: "Fee", dbKey: "fee" },
    { excelColumn: "Duration", dbKey: "duration" },
    { excelColumn: "Image URL", dbKey: "image_url" },
  ] as ExcelColumnMap[],
  sampleColumns: ["Course Title", "Description", "Fee", "Duration", "Image URL"],
};

export default function EnglishTestsAdminPage() {
  return (
    <CrudPage title="Course" table="english_tests" fields={fields} columns={columns} excelImport={excelImport} />
  );
}
