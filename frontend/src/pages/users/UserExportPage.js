import React from "react";
import * as FileSaver from "file-saver";
import { Link } from "react-router-dom";
import XLSX from "sheetjs-style";
import { useApi } from "../../contexts/ApiProvider";
import AppLayout from "../../components/layouts/AppLayout";

export default function ItemExport() {
  const api = useApi();

  const ExportToExcel = ({ excelData, fileName }) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,charset-UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const handLoadData = async (e) => {
    e.preventDefault();
    const response = await api.get(`/api/users`);
    if (!response.error) {
      if (!response.error) {
        ExportToExcel({ excelData: response, fileName: "users" });
      } else {
        console.log("Hello");
      }
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col">
        <div className="p-[2rem] flex items-center justify-between gap-[0.5] pt-[1rem] pb-[1rem]">
          <h1 className="text-2xl font-extrabold text-blue-500">
            EXPORTER DES DONNEES
          </h1>
        </div>
        <div className="pt-[1rem] p-[2rem]">
          <div className="bg-white flex-1 overflow-auto p-5">
            <div className="flex max-w-[40rem] flex-col gap-[1rem]">
              <h3 className="layout-center">
                Cliquer sur exporter pour avoir vos données sous excel
              </h3>
              <div className="flex justify-end gap-2">
                <Link className="buttonSecondary" to="/users">
                  ANNULER
                </Link>
                <button className="buttonPrimary" onClick={handLoadData}>
                  EXPORTER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
