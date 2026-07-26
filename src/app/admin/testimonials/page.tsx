"use client";

import CrudPage, { FieldDef, ExcelColumnMap } from "../CrudPage";

const fields: FieldDef[] = [
  { key: "name", label: "Student Name", type: "text", required: true },
  { key: "university", label: "University", type: "text" },
  { key: "country", label: "Country", type: "text" },
  { key: "quote", label: "Review / Comment", type: "textarea" },
  { key: "image_url", label: "Photo URL", type: "text", placeholder: "Paste image URL" },
  { key: "media_url", label: "YouTube Video Link", type: "text", placeholder: "https://youtube.com/watch?v=..." },
];

const columns = [
  { key: "name", label: "Student" },
  { key: "university", label: "University" },
  { key: "country", label: "Country" },
];

const excelImport = {
  columnMap: [
    { excelColumn: "Student Name", dbKey: "name" },
    { excelColumn: "University", dbKey: "university" },
    { excelColumn: "Country", dbKey: "country" },
    { excelColumn: "Review", dbKey: "quote" },
    { excelColumn: "Photo URL", dbKey: "image_url" },
    { excelColumn: "YouTube Link", dbKey: "media_url" },
  ] as ExcelColumnMap[],
  sampleColumns: ["Student Name", "University", "Country", "Review", "Photo URL", "YouTube Link"],
};

export default function TestimonialsAdminPage() {
  return (
    <CrudPage title="Testimonial" table="testimonials" fields={fields} columns={columns} excelImport={excelImport} />
  );
}
