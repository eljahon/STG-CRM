import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { GetAllData } from "../../../../service/global";
import StatusBtn from "../../../../ui/status";
import GolabTable from "../../../../ui/tabel";
import Tab from "../tab";

const Mydistributors = () => {
  const [params] = useSearchParams();
  const [page, setPage] = useState<any>(0);

  const pageSize = 10;
  const { t } = useTranslation();
  const { data: distributors, isLoading } = useQuery(
    ["distributors", params.get("status")],
    () =>
      GetAllData("seller/companies", {
        populate: "*",
        filters: {
          confirmed:
            params.get("status") == "pending"
              ? false
              : params.get("status") == "accepted"
              ? true
              : undefined,
          rejected:
            params.get("status") == "pending"
              ? false
              : params.get("status") == "cancelled"
              ? true
              : undefined
        }
      })
  );
  const columns = [
    {
      header: t("fullname"),
      field: "owner.fullname",
      id: 1,
      exportable: false,
      style: { minWidth: "12rem" }
    },
    {
      header: t("phone"),
      field: "company.phone",
      id: 2,
      exportable: false
      // style: { minWidth: "12rem" }
    },
    {
      header: t("companyName"),
      field: "company.name",
      id: 4,
      exportable: false
    },
    {
      header: t("status"),
      id: 5,
      exportable: false,
      body: (itemData: any) => {
        return (
          <StatusBtn
            className={"inline-block"}
            label={
                itemData?.rejected == true
                ? t("cancelled")
                : itemData?.confirmed == true
                ? t("completed")
                : t("pending")
            }
            status={
              itemData?.rejected == true
                ? "cancelled"
                : itemData?.confirmed == true
                ? "completed"
                : "pending"
            }
          />
        );
      }
    }
  ];
  return (
    <div className="w-full">
      <Tab />
      <GolabTable
        isLoading={isLoading}
        data={distributors?.data}
        columns={columns}
        pageSize={pageSize}
        totalProduct={distributors?.meta?.pagination?.total}
        currentPage={page}
        // url={"/branch"}
        // deleteUrl={"company-branches"}
        checked={(value: any) => {
          console.log(value);
        }}
        pageChange={(event: any) => {
          setPage(event.first);
        }}
        // deleteFunction={(rowItem: any) => {
        //   console.log(rowItem);
        // }}
        // newAdd={() => {

        // }}
      />
    </div>
  );
};

export default Mydistributors;
