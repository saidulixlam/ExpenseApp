import { createSlice } from "@reduxjs/toolkit";
// Define your convertDataToCSV function here
function convertDataToCSV(data) {
    // Implement the logic to format your data into a CSV string
    // Example: Convert an array of objects into a CSV string
    const csvRows = [];
    for (const item of data) {
      const values = Object.values(item);
      const row = values.map(value => `"${value}"`).join(",");
      csvRows.push(row);
    }
    return csvRows.join("\n");
  }
  

export  const csvExportSLice = createSlice({
    name: 'csvFile',
    initialState: [],
    reducers: {
        fileToCsv: (state, action) =>{
            // You can format the data and create a CSV string here
            // action.payload contains the data you want to export
            // Convert the data to a CSV format
            const csvData = convertDataToCSV(action.payload);
            // You can create a Blob or File object and trigger download
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.csv';
            a.click();
        }
    }
})

export const csvActions = csvExportSLice.actions;