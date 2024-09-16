import { CustomPagination } from "../../../components/custom-pagination";
import { DynamicDataTable } from "../../../components/data-table";
import { useGetUsers } from "../service/query/useGetUsers";
import { useState } from "react";

export interface UsersColumnTypes {
  field: string;
  header: string;
  selectionMode?: string | undefined;
}

export const Users = () => {
  const [filter, setFilter] = useState<{ limit: number; page: number }>({
    limit: 5,
    page: 1,
  });
  const { page } = filter;
  const { data, isLoading } = useGetUsers(filter);
  const total = data?.total;

  const UsersColumns: UsersColumnTypes[] = [
    {
      selectionMode: "multiple",
      field: "",
      header: "",
    },
    { field: "full_name", header: "Name" },
    { field: "phone", header: "Phone" },
    { field: "role", header: "Role" },
  ];

  const editUsers = (userData) => {
    console.log(userData.id);
  };

  const deleteUsers = (userData) => {
    console.log(userData);
  };

  return (
    <div>
      <DynamicDataTable
        onEdit={editUsers}
        onDelete={deleteUsers}
        datas={data?.data}
        column={UsersColumns}
        loading={isLoading}
      />
      <CustomPagination
        total={total}
        page={page}
        filter={filter}
        filterSet={setFilter}
      />
    </div>
  );
};
