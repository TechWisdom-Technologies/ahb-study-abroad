"use client";

import CrudPage, { FieldDef, ExcelColumnMap } from "../CrudPage";

const fields: FieldDef[] = [
  { key: "text", label: "Announcement Text", type: "text", required: true },
  { key: "link_url", label: "Link URL", type: "text" },
];

const columns = [
  { key: "text", label: "Text", render: (v: string) => v?.length > 60 ? v.slice(0, 60) + "..." : v },
  { key: "link_url", label: "Link", render: (v: string) => v ? "🔗" : "—" },
];

const excelImport = {
  columnMap: [
    { excelColumn: "Announcement Text", dbKey: "text" },
    { excelColumn: "Link URL", dbKey: "link_url" },
  ] as ExcelColumnMap[],
  sampleColumns: ["Announcement Text", "Link URL"],
};

export default function AnnouncementsAdminPage() {
  return (
    <CrudPage title="Announcement" table="announcements" fields={fields} columns={columns} excelImport={excelImport} />
  );
}
