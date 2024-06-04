import { useNavigate } from "react-router-dom";
import GolabTable from "../../../ui/tabel/index.tsx";
import { useQuery } from "react-query";
import { GetAllData } from "../../../service/global.ts";
import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function BranchList() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [page, setPage] = useState<any>(0);
  const pageSize = 10;
  const [opemNavigate, setopemNavigate] = useState<any>(false);
  const compony = window.localStorage.getItem("compony");
  const { isLoading, data: product } = useQuery(
    ["company-branches", page],
    () =>
      GetAllData("company-branches", {
        populate: "*",
        pagination: {
          page: page / pageSize + 1,
          pageSize: pageSize
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
        pageSize={pageSize}
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
          if (compony && compony != "undefined") {
            navigate("/branch/new");
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
