import React from "react";
import { DataTable, DataTableValue } from "primereact/datatable";
import { Column, ColumnProps } from "primereact/column";
import { Button } from "primereact/button";
import { TableDataSkleton } from "./table-data-skleton";
import { Paginator } from "primereact/paginator";
import { useTranslation } from "react-i18next";
import { Skeleton } from "primereact/skeleton";
import { isFunction } from "lodash";
import noData from "../assets/noData.png"
const EmptyMessage:React.FC<{message:string}> = ({message}) => {
  return (
    <div className="flex justify-content-center items-center h-full">
      <div className="flex flex-column align-items-center">
      <span className="text-primary"><b>{message}</b></span>
        <img width="200" height="200" src={noData} alt="no data" />
      </div>
    </div>
  )
}
interface DynamicDataTableProps {
  column: ColumnProps[];
  datas: DataTableValue[] | undefined;
  first: number;
  onPage?: (pages: { first: number; page: number; rows: number }) => void;
  totalRecords: number;
  rows: number;
  onEdit?: (rowData: DataTableValue) => void;
  onDelete?: (rowData: DataTableValue) => void;
  onView?: (rowData: DataTableValue) => void;
  loading: boolean;
  loadingDelete?: boolean;
}
export const DynamicDataTable: React.FC<DynamicDataTableProps> = ({
  column,
  totalRecords,
  rows,
  onPage,
  first,
  datas,
  onEdit,
  onDelete,
  onView,
  loading,
  loadingDelete,
}) => {
  const { t } = useTranslation();
  const actionTemplate = (rowData: DataTableValue) => {
    return (
      <div className="flex column-gap-2">
        {isFunction(onView)&& <Button
          style={{ width: 40, height: 40 }}
          icon="pi pi-eye"
          className=" p-button-info"
          size="small"
          rounded
          outlined
          severity="info"
          onClick={() => onView(rowData)}
        />}
        {isFunction(onEdit) && <Button
          style={{ width: 40, height: 40 }}
          rounded
          outlined
          severity="success"
          icon="pi pi-pencil"
          size="small"
          className=" p-button-success"
          onClick={() => onEdit(rowData)}
        />}
        {isFunction(onDelete) && <Button
          style={{ width: 40, height: 40 }}
          icon="pi pi-trash"
          className=" p-button-danger"
          size="small"
          rounded
          outlined
          severity="danger"
          onClick={() => onDelete(rowData)}
        />}
      
      </div>
    );
  };
  // function dataKey(item: DataTableValue):string {
  //   return item.id + Math.random() * 1000;
  // }

  return (
    <div>
      {loading ? (
        <TableDataSkleton />
      ) : (
        <div>
          <DataTable
            size={"small"}
            emptyMessage={<EmptyMessage message={t("noData")}/>}
            footer={
              isFunction(onPage) &&totalRecords > 0 && <Paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPageChange={onPage}
                rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 35, 40]}
              />
            }
            value={datas}
            dataKey={'id'}
            tableStyle={{ minWidth: "50rem" }}
          >
            {column?.map((col, i) => (
              <Column
                style={{ width: 600 }}
                key={i + Math.random() * 1000}
                {...col}
              />
            ))}
           { (isFunction(onDelete) || isFunction(onEdit) || isFunction(onView) )&& <Column
              header={
                loadingDelete ? (
                  <Skeleton width="80px" height="22px" />
                ) : (
                  t("action")
                )
              }
              body={actionTemplate}
            />}
          </DataTable>
        </div>
      )}
    </div>
  );
};
