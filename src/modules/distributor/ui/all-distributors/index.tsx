import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetAllData } from "../../../../service/global";
import GolabTable from "../../../../ui/tabel";

const Alldistributors = () => {
  const [page, setPage] = useState<any>(0);
  // const [loadingType, setloadingType] = useState<any>(0);
  // const queryClient = useQueryClient();
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
      header: t("companyName"),
      field: "name",
      id: 1,
      exportable: false
    },
    {
      header: t("phone"),
      field: "phone",
      id: 2,
      exportable: false
      // style: { minWidth: "12rem" }
    }

    // {
    //   header: t("follow"),
    //   id: 5,
    //   exportable: false,
    //   body: (itemData: any) => {
    //     // isFollowed
    //     // isPending
    //     // isRejected
    //     return (
    //       <StatusBtn
    //         className={"inline-block"}
    //         loading={loadingType == itemData?.id ? true : false}
    //         label={
    //           itemData?.isFollowed == true
    //             ? t("followed")
    //             : itemData?.isPending == true
    //             ? t("pending")
    //             : itemData?.isRejected == true
    //             ? t("rejected")
    //             : t("follow")
    //         }
    //         status={
    //           itemData?.isFollowed == true
    //             ? "completed"
    //             : itemData?.isPending == true
    //             ? "pending"
    //             : itemData?.isRejected == true
    //             ? "canceled"
    //             : "accepted"
    //         }
    //       />
    //     );
    //   }
    // }
    // {
    //   id: 6,
    //   exportable: false,
    //   style: { maxWidth: "100px" },
    //   body: (itemData: any) => {
    //     if (
    //       !itemData?.isFollowed &&
    //       !itemData?.isPending &&
    //       !itemData?.isRejected
    //     ) {
    //       return (
    //         <div className="flex justify-content-end gap-4">
    //           <Button
    //             label={t("follow")}
    //             outlined
    //             loading={itemData?.id == loadingType}
    //             onClick={async () => {
    //               setloadingType(itemData?.id);
    //               await UpdateData1One("follow/company", itemData?.id)
    //                 .then((res: any) => {
    //                   if (res?.status == "200" || res?.status == "201") {
    //                     queryClient.invalidateQueries(["distributors"]);
    //                     toast.success("Company followed successfully");
    //                   }
    //                 })
    //                 .finally(() => setloadingType(false));
    //             }}
    //           />
    //         </div>
    //       );
    //     }
    //   }
    // }
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
