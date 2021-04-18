import React from "react";
// import Button from "@material-ui/core/Button";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

export const ExportCSV = ({csvData, fileName}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    let ws = XLSX.utils.json_to_sheet(csvData);
    ws["A1"].s = {
      font: {
        name: "",
        sz: 24,
        bold: true,
        color: { rgb: "#4bbf73" },
      },
    };
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      //   style: "#endregion",
    });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      type="submit"
    //   aria-label="submit"
    //   variant="contained"
    //   color="primary"
      style={{
        float: "left",
        marginTop: "10px",
        marginLeft: "5px",
        textTransform: "capitalize",
        backgroundColor: "#4bbf73",
        // width: "136px",
      }}
      disableElevation
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      Export Excel
      <SiMicrosoftexcel
        style={{
          width: "40px",
          height: "18px",
        }}
      />
    </button>
  );
};