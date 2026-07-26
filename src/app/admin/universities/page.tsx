"use client";

import { useEffect, useState } from "react";
import CrudPage, { FieldDef, ExcelColumnMap } from "../CrudPage";

export default function UniversitiesAdminPage() {
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
        console.error("Error loading countries for universities dropdown:", err);
      }
    };
    fetchCountries();
  }, []);

  const fields: FieldDef[] = [
    { key: "name", label: "University Name", type: "text", required: true },
    { key: "country_id", label: "Country", type: "select", required: true, options: countryOptions },
    { key: "tuition_fee_range", label: "Tuition Fee Range", type: "text", placeholder: "e.g. £12,000 - £25,000/year" },
    { key: "requirements", label: "Requirements", type: "textarea" },
    { key: "website_url", label: "Website URL", type: "text" },
    { key: "logo_url", label: "Logo URL", type: "text" },
    { key: "is_partner", label: "Partner University", type: "boolean" },
    { key: "scholarship_available", label: "Scholarship Available", type: "boolean" },
    { key: "is_active", label: "Active", type: "boolean" },
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "country_id", label: "Country", render: (_: string, row: any) => {
      const c = countryOptions.find(o => o.value === row.country_id);
      return c?.label || row.country_id;
    }},
    { key: "is_partner", label: "Partner", render: (v: boolean) => v ? "✅" : "—" },
    { key: "is_active", label: "Active", render: (v: boolean) => v ? "✅" : "❌" },
  ];

  const excelImport = {
    columnMap: [
      { excelColumn: "University Name", dbKey: "name" },
      { excelColumn: "Country", dbKey: "country_id", transform: (val: any) => {
        const match = countryOptions.find(o => o.label.toLowerCase() === String(val).toLowerCase());
        return match?.value || val;
      }},
      { excelColumn: "Tuition Fee Range", dbKey: "tuition_fee_range" },
      { excelColumn: "Requirements", dbKey: "requirements" },
      { excelColumn: "Website URL", dbKey: "website_url" },
      { excelColumn: "Logo URL", dbKey: "logo_url" },
      { excelColumn: "Partner", dbKey: "is_partner", transform: (v: any) => String(v).toLowerCase() === "yes" || v === true },
      { excelColumn: "Scholarship", dbKey: "scholarship_available", transform: (v: any) => String(v).toLowerCase() === "yes" || v === true },
    ] as ExcelColumnMap[],
    sampleColumns: ["University Name", "Country", "Tuition Fee Range", "Requirements", "Website URL", "Logo URL", "Partner", "Scholarship"],
  };

  return <CrudPage title="University" table="universities" fields={fields} columns={columns} excelImport={excelImport} />;
}
