import { useNavigate } from "react-router-dom";
import GolabTable from "../../ui/tabel";
import { useQuery } from "react-query";
import { GetAllData, GetMe } from "../../service/global";
import React, { useState } from "react";
import { Button } from "primereact/button";

import { Dialog } from "primereact/dialog";

export default function ProductPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState<any>(0);
  const [opemNavigate, setopemNavigate] = useState<any>(false);
  const company = window.localStorage.getItem("company");
  const { isLoading, data: product } = useQuery(["products", page], () =>
    GetAllData("products/distribute", { limit: 10, page: page / 10 + 1 })
  );
  const { data: me } = useQuery(["meComponye"], () => GetMe());
  const columns = [
    {
      header: "Image",
      field: "image.aws_path",
      id: 1,
      // sortable: true,
      exportable: false,
      body: (itemData: any) => {
        return (
          <img
            src={import.meta.env.VITE_APP_AWS_PATH + itemData?.image?.aws_path}
            width={50}
            height={50}
          />
        );
      }
      // ItemRender: (itemData, itemcoulmns,index) => {}
    },
    {
      header: "Title",
      field: "title",
      id: 2,
      exportable: false,
      style: { minWidth: "12rem" }
    },

    {
      header: "Description",
      field: "description",
      id: 3,
      exportable: false
    },
    {
      header: "Price",
      field: "price",
      id: 4,
      exportable: false
    },
    {
      header: "Type",
      field: "state.type",
      id: 5,
      exportable: false
    }
  ];
  const NavigateDialog = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={() => setopemNavigate(false)}
      />
      <Button
        label="Yes"
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
        data={product?.data?.items}
        columns={columns}
        totalProduct={product?.data?.meta?.total}
        currentPage={page}
        tableTile="Products"
        url={"/product"}
        deleteUrl={"products"}
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
          if (me?.data?.company && me?.data?.company != "undefined") {
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
        header="Confirm"
        modal
        footer={NavigateDialog}
        onHide={() => setopemNavigate(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>you don't have campony,please create campony</span>
        </div>
      </Dialog>
    </>
  );
}
