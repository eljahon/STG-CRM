import  { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetAllData, UpdateData1One } from "../../../../service/global";
import StatusBtn from "../../../../ui/status";
import { toast } from "react-toastify";
import GolabTable from "../../../../ui/tabel";

const Alldistributors = () => {
  const [page, setPage] = useState<any>(0);

  const pageSize = 10;
  const { t } = useTranslation();
  const { data: distributors, isLoading } = useQuery(
    ["distributors", page],
    () =>
      GetAllData("seller/available/companies", {
        populate: "*",
        pagination: {
          page: page / pageSize + 1,
          pageSize: pageSize
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
      field: "phone",
      id: 2,
      exportable: false
      // style: { minWidth: "12rem" }
    },
    {
      header: t("companyName"),
      field: "name",
      id: 4,
      exportable: false
    },
    {
      header: t("follow"),
      id: 5,
      exportable: false,
      body: (itemData: any) => {
        return (
          <StatusBtn
            className={"inline-block"}
            label={"Follow"}
            status={"completed"}
            onClick={async () => {
              await UpdateData1One("follow/company", itemData?.id).then(
                (res: any) => {
                  if (res?.status == "200" || res?.status == "201") {
                    toast.success("Company followed successfully");
                  }
                }
              );
            }}
          />
        );
      }
    }
  ];
  return (
    <div className="w-full">
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

export default Alldistributors;
