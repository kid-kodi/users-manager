import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApi } from "../../contexts/ApiProvider";
import { useFlash } from "../../contexts/FlashProvider";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";

const uploadSchema = Yup.object().shape({});

export default function InvoiceImportPage() {
  const navigate = useNavigate();
  const api = useApi();
  const flash = useFlash();

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
    const response = await api.get(`/users`);
    if (!response.error) {
      if (!response.error) {
        ExportToExcel({ excelData: response, fileName: "users" });
      } else {
        console.log("Hello");
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      excelFile: null,
    },
    validationSchema: uploadSchema,
    onSubmit: async (values) => {
      if (values.excelFile) {
        let data = new FormData();
        values.excelFile && data.append("excelFile", values.excelFile);
        const response = await api.post(`/users/import`, data);
        if (!response.error) {
          flash("Chargement de données effectuées", "success");
          navigate("/");
        } else {
          flash(`${response.error}`);
        }
      } else {
        flash("choisir un fichier", "danger");
      }
    },
  });

  return (
    <div className="flex flex-col">
      <div className="p-[2rem] flex items-center justify-between gap-[0.5] pt-[1rem] pb-[1rem]">
        <h1 className="text-2xl font-extrabold text-blue-500">
          IMPORTER LES DONNEES DE VOS UTILISATEURS
        </h1>
      </div>
      <div className="pt-[1rem] p-[2rem]">
        <div className="bg-white flex-1  overflow-auto p-5">
          <form
            className="flex max-w-[40rem] flex-col gap-[1rem]"
            onSubmit={formik.handleSubmit}
          >
            <input
              id="excelFile"
              name="excelFile"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("excelFile", event.currentTarget.files[0]);
              }}
            />

            <div>
              <button
                className="buttonSecondary"
                onClick={(e) => handLoadData(e)}
              >
                TELECHARGER UN MODELE
              </button>
            </div>

            <div className="flex justify-end gap-2">
              <Link className="buttonSecondary" to="/users">
                ANNULER
              </Link>
              <button className="buttonPrimary" type="submit">
                CHARGER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
