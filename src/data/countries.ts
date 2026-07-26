export type Country = {
  value: string;
  label: string;
  flagCode: string;
};

export const countries: Country[] = [
  { value: "uk", label: "United Kingdom", flagCode: "gb" },
  { value: "canada", label: "Canada", flagCode: "ca" },
  { value: "australia", label: "Australia", flagCode: "au" },
  { value: "new-zealand", label: "New Zealand", flagCode: "nz" },
  { value: "malaysia", label: "Malaysia", flagCode: "my" },
  { value: "south-korea", label: "South Korea", flagCode: "kr" },
  { value: "japan", label: "Japan", flagCode: "jp" },
  { value: "italy", label: "Italy", flagCode: "it" },
  { value: "malta", label: "Malta", flagCode: "mt" },
  { value: "cyprus", label: "Cyprus", flagCode: "cy" },
  { value: "finland", label: "Finland", flagCode: "fi" },
];
