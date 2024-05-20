import { useNavigate } from "react-router-dom";
import GolabTable from "../../../ui/tabel/index.tsx";
import { useQuery } from "react-query";
import { GetAllData } from "../../../service/global.ts";
import { useState } from "react";

import { useTranslation } from "react-i18next";

export default function BranchList() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [page, setPage] = useState<any>(0);
  const { isLoading, data: product } = useQuery(
    ["company-branches", page],
    () =>
      GetAllData("company-branches", {
        populate: "*",
        pagination: {
          page: page / 10 + 1,
          pageSize: 20
        }
      })
  );
  const columns = [
    {
      header: t("branchName"),
      field: "name",
      id: 2,
      exportable: false,
      style: { minWidth: "12rem" }
    },

    {
      header: t("region"),
      field: "region.name",
      id: 3,
      exportable: false
    },
    {
      header: t("district"),
      field: "district.name",
      id: 4,
      exportable: false
    },
    {
      header: t("fullname"),
      field: "owner.fullname",
      id: 5,
      exportable: false
    },
    {
      header: t("phone"),
      field: "owner.phone",
      id: 5,
      exportable: false
    }
  ];

  return (
    <>
      <GolabTable
        isLoading={isLoading}
        data={product?.data}
        columns={columns}
        totalProduct={product?.meta?.pagination?.total}
        currentPage={page}
        tableTile={t("branch")}
        url={"/branch"}
        deleteUrl={"company-branches"}
        checked={(value: any) => {
          console.log(value);
        }}
        pageChange={(event: any) => {
          setPage(event.first);
        }}
        deleteFunction={(rowItem: any) => {
          console.log(rowItem);
        }}
        newAdd={() => {
          navigate("/branch/new");
        }}
      />
    </>
  );
}
