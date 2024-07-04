import { useNavigate, useSearchParams } from "react-router-dom";
import GolabTable from "../../../ui/tabel/index.tsx";
import { useQuery } from "react-query";
import { GetAllData } from "../../../service/global.ts";
import React, { useState } from "react";
import { Button } from "primereact/button";
import paramsToObject from "../../../hooks/paramsToObject";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import StatusBtn from "../../../ui/status/index.tsx";

export default function ProductPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [params, setSearchParam] = useSearchParams();
  const [page, setPage] = useState<any>(params.get("page") || 0);
  const [opemNavigate, setopemNavigate] = useState<any>(false);
  const pageSize = 20;
  const { isLoading, data: product } = useQuery(["products", page], () =>
    GetAllData("products/distribute", {
      populate: "*",
      pagination: {
        page: page / pageSize + 1,
        pageSize: pageSize
      }
    })
  );

  const compony = window.localStorage.getItem("compony");
  const columns = [
    {
      header: t("image"),
      field: "avatar.aws_path",
      id: 1,
      // sortable: true,
      exportable: false,
      body: (itemData: any) => {
        return (
          <>
            {itemData?.image?.aws_path ? (
              <img
                src={
                  import.meta.env.VITE_APP_AWS_PATH + itemData?.image?.aws_path
                }
                width={50}
                height={50}
              />
            ) : (
              <i className="pi pi-image" style={{ fontSize: "2rem" }} />
            )}
          </>
        );
      }
      // ItemRender: (itemData, itemcoulmns,index) => {}
    },
    {
      header: t("title"),
      field: "title",
      id: 2,
      exportable: false,
      style: { minWidth: "12rem" }
    },

    {
      header: t("description"),
      field: "description",
      id: 3,
      exportable: false
    },
    {
      header: t("type"),
      field: "type",
      id: 4,
      exportable: false
    },
    {
      header: t("visible"),
      field: "visible",
      id: 5,
      exportable: false,
      body: (itemData: any) => {
        return (
          <StatusBtn
            className={"inline-block"}
            label={itemData?.visible ? t("visible") : t("unvisible")}
            status={itemData?.visible ? "completed" : "cancelled"}
          />
        );
      }
      // ItemRender: (itemData, itemcoulmns,index) => {}
    },
    {
      header: t("status"),
      field: "status",
      id: 6,
      exportable: false,
      body: (itemData: any) => {
        return (
          <StatusBtn
            className={"inline-block"}
            label={
              itemData?.confirmed
                ? t("confirmed")
                : itemData?.rejected
                ? t("cancelled")
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
      // ItemRender: (itemData, itemcoulmns,index) => {}
    }
  ];

  const NavigateDialog = (
    <React.Fragment>
      <Button
        label={t("no")}
        icon="pi pi-times"
        outlined
        onClick={() => setopemNavigate(false)}
      />
      <Button
        label={"yes"}
        icon="pi pi-check"
        severity="danger"
        onClick={async () => {
          navigate("/compony/new");
        }}
      />
    </React.Fragment>
  );

  return (
    <>
      <GolabTable
        isLoading={isLoading}
        data={product?.data}
        columns={columns}
        totalProduct={product?.meta?.pagination?.total}
        pageSize={pageSize}
        currentPage={page}
        tableTile={t("products")}
        url={"/product"}
        deleteUrl={"products"}
        Isupdate={true}
        checked={(value: any) => {
          console.log(value);
        }}
        pageChange={(event: any) => {
          setPage(event.first);
          setSearchParam({
            ...paramsToObject(params.entries()),
            page: event.first
          });
        }}
        deleteFunction={(rowItem: any) => {
          console.log(rowItem);
        }}
        newAdd={() => {
          if (compony && compony != "undefined") {
            navigate("/product/new");
          } else {
            setopemNavigate(true);
          }
        }}
      />

      <Dialog
        visible={opemNavigate}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={t("confirm")}
        modal
        footer={NavigateDialog}
        onHide={() => setopemNavigate(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>{t("logToCompony")}</span>
        </div>
      </Dialog>
    </>
  );
}
