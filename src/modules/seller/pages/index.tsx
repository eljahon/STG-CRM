import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import { GetAllData, UpdateData1One } from "../../../service/global";
import StatusBtn from "../../../ui/status";
import GolabTable from "../../../ui/tabel";
import Tab from "../ui/tab";
import { useSearchParams } from "react-router-dom";
import { Button } from "primereact/button";
import DialogSeller from "../ui/tab/dialog-seller";
import { toast } from "react-toastify";

const SellerPage = () => {
  const [page, setPage] = useState<any>(0);
  const [open, setOpen] = useState<any>(null);
  const [typeLoading, setTypeLoading] = useState<any>(false);
  const [params] = useSearchParams();
  const queryClient = useQueryClient();
  const pageSize = 10;
  const { t } = useTranslation();
  const { data: seller, isLoading } = useQuery(
    ["seller", page, params.get("status")],
    () =>
      GetAllData("company/followers", {
        populate: "*",
        pagination: {
          page: page / pageSize + 1,
          pageSize: pageSize
        },
        filters: {
          confirmed:
            params.get("status") == "pending"
              ? false
              : params.get("status") == "accepted"
              ? true
              : false,
          rejected:
            params.get("status") == "pending"
              ? false
              : params.get("status") == "rejected"
              ? true
              : false
        }
      })
  );
  const columns = [
    {
      header: t("name"),
      field: "seller.name",
      id: 1,
      exportable: false
    },
    {
      header: t("phone"),
      field: "seller.phone",
      id: 2,
      exportable: false
      // style: { minWidth: "12rem" }
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
              itemData?.confirmed
                ? t("accepted")
                : itemData?.rejected
                ? t("rejected")
                : t("pending")
            }
            status={
              itemData?.confirmed
                ? "completed"
                : itemData?.rejected
                ? "cancelled"
                : "pending"
            }
          />
        );
      }
    },
    {
      id: 6,
      exportable: false,
      style: { maxWidth: "100px" },
      body: (itemData: any) => {
        return (
          <div className="flex justify-content-end gap-4">
            {!itemData?.confirmed && !itemData?.rejected && (
              <Button
                label={t("confirm")}
                outlined
                onClick={() => {
                  setOpen({
                    id: itemData?.id,
                    type: "accept"
                  });
                }}
              />
            )}

            {!itemData?.rejected && (
              <Button
                label={t("reject")}
                severity="danger"
                outlined
                onClick={() => {
                  setOpen({
                    id: itemData?.id,
                    type: "reject"
                  });
                }}
              />
            )}
          </div>
        );
      }
    }
  ];
  return (
    <div className="mt-5 tabhight w-full">
      <div className="w-full flex gap-5">
        <div className="w-full">
          <Tab />
          <GolabTable
            isLoading={isLoading}
            data={seller?.data}
            columns={columns}
            pageSize={pageSize}
            totalProduct={seller?.meta?.pagination?.total}
            currentPage={page}
            // url={"/branch"}

            checked={(value: any) => {
              console.log(value);
            }}
            pageChange={(event: any) => {
              setPage(event.first);
            }}
            // deleteFunction={(rowItem: any) => {
            //   console.log(rowItem);
            // }}
          />
        </div>
      </div>

      <DialogSeller
        open={open}
        setOpen={setOpen}
        loading={typeLoading}
        onClick={async () => {
          setTypeLoading(true);
          await UpdateData1One("seller/request", open?.id, {
            type: open?.type
          })
            .then((res: any) => {
              if (res?.status == "200" || res?.status == "201") {
                toast.success("status  changed seccesfuly");
                queryClient.invalidateQueries(["seller"]);
              }
            })
            .finally(() => {
              setTypeLoading(true);
              setOpen(false);
            });
        }}
        text={open?.type == "reject" ? t("rejectText") : t("confirmText")}
      />
    </div>
  );
};

export default SellerPage;
