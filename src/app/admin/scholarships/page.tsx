"use client";

import { useEffect, useState } from "react";
import CrudPage, { FieldDef, ExcelColumnMap } from "../CrudPage";

export default function ScholarshipsAdminPage() {
  const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("/api/countries");
        if (res.ok) {
          const data = await res.json();
          setCountryOptions((data || []).map((c: any) => ({ value: c.id, label: c.name })));
        }
      } catch (err) {
        console.error("Error loading countries for scholarships dropdown:", err);
      }
    };
    fetchCountries();
  }, []);

  const fields: FieldDef[] = [
    { key: "title", label: "Scholarship Name", type: "text", required: true },
    { key: "description", label: "Features (e.g. Full Funding / Funding + Living)", type: "text" },
    { key: "country_id", label: "Country", type: "select", options: countryOptions },
    { key: "amount", label: "Image URL", type: "text", placeholder: "Scholarship image URL" },
    { key: "eligibility", label: "Flag Image Code (e.g. gb)", type: "text" },
    { key: "deadline", label: "Deadline", type: "text", placeholder: "e.g. March 2025" },
  ];

  const columns = [
    { key: "title", label: "Scholarship Name" },
    { key: "description", label: "Features" },
    { key: "deadline", label: "Deadline" },
  ];

  const excelImport = {
    columnMap: [
      { excelColumn: "Scholarship Name", dbKey: "title" },
      { excelColumn: "Features", dbKey: "description" },
      { excelColumn: "Deadline", dbKey: "deadline" },
      { excelColumn: "Image URL", dbKey: "amount" },
      { excelColumn: "Flag Code", dbKey: "eligibility" },
    ] as ExcelColumnMap[],
    sampleColumns: ["Scholarship Name", "Features", "Deadline", "Image URL", "Flag Code"],
  };

  return <CrudPage title="Scholarship" table="scholarships" fields={fields} columns={columns} excelImport={excelImport} />;
}
