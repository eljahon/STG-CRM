import React from "react";
import { DataTable } from "primereact/datatable";
import {Column, ColumnProps} from "primereact/column";
import { Button } from "primereact/button";
import { TableDataSkleton } from "./table-data-skleton";
import {Paginator} from "primereact/paginator";
export interface RowDataType {
  created_by: null;
  full_name: string;
  id: string;
  logo: string;
  phone: string;
  role: {id: string, name: string} ;
  status: string;
}
interface DynamicDataTableProps {
  column: ColumnProps[];
  datas: RowDataType[]|undefined;
  first:number,
  onPage:(pages:{first:number, page: number, rows: number})=> void,
  totalRecords: number,
  rows: number,
  onEdit: (rowData: RowDataType) => void;
  onDelete: (rowData: RowDataType) => void;
  loading: boolean;
}
export const DynamicDataTable:React.FC<DynamicDataTableProps> = ({column,totalRecords,rows, onPage,first, datas, onEdit, onDelete, loading}) => {



  const actionTemplate = (rowData: RowDataType) => {
    return (
      <div className="flex column-gap-2">
        <Button
          style={{ width: 40, height: 40 }}
          rounded outlined severity="success"
          icon="pi pi-pencil"
          size="small"
          className=" p-button-success"
          onClick={() => onEdit(rowData)}
        />
        <Button
          style={{ width: 40, height: 40 }}
          icon="pi pi-trash"
          className=" p-button-danger"
          size="small"
          rounded outlined severity="danger"
          onClick={() => onDelete(rowData)}
        />
      </div>
    );
  };
  return (
    <div>
      {loading ? (
        <TableDataSkleton />
      ) : (
        <div>
          <DataTable
              size={'small'}
              footer={<Paginator first={first} rows={rows} totalRecords={totalRecords} onPageChange={onPage} rowsPerPageOptions={[5,10,15,20,25,30,35,40]}/>}
            value={datas}
            dataKey="id"
            tableStyle={{ minWidth: "50rem" }}
          >
            {column?.map((col, i) => (
              <Column
                style={{ width: 600 }}
                key={i}
                {...col}
              />
            ))}
            <Column header="Action" body={actionTemplate} />
          </DataTable>
        </div>
      )}
    </div>
  );
};
