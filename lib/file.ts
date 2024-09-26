export const exportCsv = <T extends Record<string, unknown>>(data: T[]) => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    Object.keys(data[0]).join(",") +
    "\n" +
    data.map((row) => Object.values(row).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "dashboard_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
