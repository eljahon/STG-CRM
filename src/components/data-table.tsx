import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { UsersColumnTypes } from "../modules/users/page/users";
import { UsersGetDataTypes } from "../modules/users/types/user-types";
import { Button } from "primereact/button";
import { TableDataSkleton } from "./table-data-skleton";

interface DynamicDataTableProps {
  column: UsersColumnTypes[];
  datas: RowDataType[];
  onEdit: (rowData: RowDataType) => void;
  onDelete: (rowData: RowDataType) => void;
  loading: boolean;
}

interface SelectedValueType {
  value: UsersGetDataTypes[] | null;
}

export interface RowDataType {
  created_by: null;
  full_name: string;
  id: string;
  logo: string;
  phone: string;
  role: { id: string; name: string };
  status: string;
}

export const DynamicDataTable: React.FC<DynamicDataTableProps> = ({
  column,
  datas,
  onEdit,
  onDelete,
  loading,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<
    UsersGetDataTypes[] | null
  >(null);
  console.log(datas);

  const actionTemplate = (rowData: RowDataType) => {
    return (
      <div className="flex column-gap-2">
        <Button
          style={{ width: 40, height: 40 }}
          rounded
          icon="pi pi-pencil"
          className=" p-button-success"
          onClick={() => onEdit(rowData)}
        />
        <Button
          style={{ width: 40, height: 40 }}
          rounded
          icon="pi pi-trash"
          className=" p-button-danger"
          onClick={() => onDelete(rowData)}
        />
      </div>
    );
  };

  const statusTemplate = (rowData: RowDataType) => {
    return (
      <span
        className={`${
          rowData.status === "active" ? "active_status" : "inactive_status"
        }`}
      >
        {rowData.status}
      </span>
    );
  };

  return (
    <div>
      {loading ? (
        <TableDataSkleton />
      ) : (
        <div className="card">
          <DataTable
            value={datas?.map((data) => ({
              full_name: data?.full_name,
              role: data?.role?.name,
              status: data?.status,
              phone: data?.phone,
              id: data.id,
            }))}
            selection={selectedProducts}
            onSelectionChange={(e: SelectedValueType) =>
              setSelectedProducts(e.value)
            }
            dataKey="id"
            tableStyle={{ minWidth: "50rem" }}
          >
            {column?.map((col, i) => (
              <Column
                style={{ width: 600 }}
                key={i}
                selectionMode={col?.selectionMode}
                field={col?.field}
                header={col?.header}
                headerStyle={{ width: "3rem" }}
              />
            ))}
            <Column header="Status" body={statusTemplate} />
            <Column header="Action" body={actionTemplate} />
          </DataTable>
        </div>
      )}
    </div>
  );
};
