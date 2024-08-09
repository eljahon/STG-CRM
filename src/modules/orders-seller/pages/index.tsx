import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import {
  AddidData,
  GetAllData,
  GetByIdData,
  UpdateData1One
} from "../../../service/global";
import GolabTable from "../../../ui/tabel";
import debounce from "../../../hooks/debounce";
import OrderDetails from "../ui/order-madal";
import TabBar from "../ui/tab-bar";
import getSocket from "../../../service/socket";
import StatusBtn from "../../../ui/status";
import lodash from "lodash";
import { useSearchParams } from "react-router-dom";
import { Button } from "primereact/button";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
const SellerOrderPage = () => {
  const [page, setPage] = useState<any>(0);
  const [params] = useSearchParams();
  const [productId, setProductId] = useState<any>(null);
  const [sellerArr, setSelllerArr] = useState<any>([]);
  const [orderId, setOrderId] = useState<any>(null);
  const [orderCount, setOrderCount] = useState();
  const [filterValue, setFilterValue] = useState<any>(null);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [CancelReason, setCancelReason] = useState<any>(null);
  const pageSize = 15;
  const { t } = useTranslation();
  const socket = getSocket();

  const { data: seller, isLoading } = useQuery(
    ["seller/orders", page, filterValue, params.get("status")],
    () =>
      GetAllData("seller/orders", {
        populate: "*",
        pagination: {
          page: page / pageSize + 1,
          pageSize: pageSize
        },
        filters: {
          order: {
            company: {
              name: {
                $containsi:
                  filterValue?.["product.company.name"]?.value || undefined
              }
            },
            title: {
              $containsi: filterValue?.["product.title"]?.value || undefined
            }
          },
          status: params.get("status") || undefined
        }
      })
  );

  const { data: orderCountData } = useQuery("orderCount", () =>
    GetAllData("seller/orders/count")
  );

  const { data: oneOrder } = useQuery(
    ["oneOrder", productId],
    () =>
      GetByIdData("orders", productId, {
        populate: "*"
      }),
    {
      enabled: productId ? true : false
    }
  );
  useEffect(() => {
    socket.connect();
    socket.on("order", async (res: any) => {
      setOrderId(res?.id);
    });
    socket.on("orderCounts", async (res: any) => {
      setOrderCount(res);
    });
    return () => {
      socket.off("order");
      socket.off("orderCounts");
      socket.disconnect();
    };
  }, []);

  const columns = [
    {
      header: t("id"),
      field: "id",
      id: 1,
      exportable: false
    },

    {
      header: t("product"),
      field: "product.title",
      id: 2,
      exportable: false,
      filter: true,
      filterPlaceholder: t("search")
    },
    {
      header: t("client"),
      field: "client.fullname",
      id: 3,
      exportable: false,
      filter: true,
      filterPlaceholder: t("search")
    },
    {
      header: t("address"),
      field: "address",
      id: 4,
      exportable: false,
      filter: true,
      filterPlaceholder: t("search")
    },

    {
      header: t("status"),
      field: "status",
      id: 5,
      exportable: false,
      body: (itemData: any) => {
        return (
          <StatusBtn
            className={"inline-block"}
            label={t(itemData?.status)}
            status={itemData?.status}
          />
        );
      }
    },
    {
      header: t("count"),
      field: "count",
      id: 6,
      exportable: false
    },
    {
      header: t("is_paid"),
      field: "is_paid",
      id: 7,
      exportable: false,
      body: (itemData: any) => {
        return (
          <StatusBtn
            className={"inline-block"}
            label={itemData?.is_paid ? t("paid") : t("unPaid")}
            status={itemData?.is_paid ? "completed" : "canceled"}
          />
        );
      }
    },
    {
      id: 8,
      exportable: false,
      body: (itemData: any) => {
        if (itemData.status == "pending" || itemData.status == "accepted")
          return (
            <div className="flex gap-2">
              {itemData?.is_paid && (
                <Button
                  icon={
                    itemData?.status == "pending"
                      ? "pi pi-check"
                      : "pi pi-truck"
                  }
                  onClick={() =>
                    confirm1({
                      message: "Are you sure you want to change status?",
                      type: itemData?.status,
                      id: itemData?.id
                    })
                  }
                  tooltip="tooltip"
                  tooltipOptions={{ position: "bottom" }}
                  className="mr-2 h-2rem w-2rem"
                  rounded
                  outlined
                />
              )}
              {itemData.status == "pending" && (
                <Button
                  rounded
                  outlined
                  className="mr-2 h-2rem w-2rem"
                  icon="pi pi-times"
                  severity="danger"
                  tooltip="tooltip"
                  onClick={() => setVisibleCancel(itemData?.id)}
                />
              )}
            </div>
          );
      }
    }
  ];

  useEffect(() => {
    setSelllerArr(seller?.data);
  }, [seller]);

  useEffect(() => {
    setOrderCount(orderCountData?.data);
  }, [orderCountData]);
  useEffect(() => {
    const fetchone = async () => {
      await GetByIdData("orders", orderId, { populate: "*" })
        .then((data) => {
          const updatedItems = [...sellerArr];
          if (
            data?.data?.status == params.get("status") ||
            params.get("status") == "" ||
            !params.get("status")
          ) {
            updatedItems[index] = data?.data;
            setSelllerArr(updatedItems);
          } else {
            updatedItems.splice(index, 1);
            setSelllerArr(updatedItems);
          }
        })
        .catch((error: any) => {
          console.error(error);
        })
        .finally(() => {
          setOrderId(null);
        });
    };
    const index = lodash.findIndex(sellerArr, { id: orderId });
    if (index !== -1) {
      fetchone();
    }
  }, [orderId]);

  const confirm1 = ({ message, type, id }: any) => {
    confirmDialog({
      message: message,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        await UpdateData1One(
          type == "pending" ? "accept/order" : "shipping/order",
          id
        )
          .then((res: any) => {
            if (res?.status == "200" || res?.status == "201") {
              toast.success("Order status changed successfully");
              setProductId(null);
            }
          })
          .catch(() => console.log("err"));
      }
    });
  };
  const NavigateDialog = (
    <React.Fragment>
      <Button
        label={t("no")}
        icon="pi pi-times"
        outlined
        onClick={() => setVisibleCancel(false)}
      />
      <Button
        label={"yes"}
        icon="pi pi-check"
        severity="danger"
        onClick={async () => {
          if (CancelReason) {
            await AddidData("cancel/order", visibleCancel, {
              cancel_reason: CancelReason
            })
              .then((res: any) => {
                if (res?.status == "200" || res?.status == "201") {
                  toast.success("Order status changed successfully");
                  setProductId(null);
                  setVisibleCancel(false);
                }
              })
              .catch(() => console.log("err"));
          } else {
            toast.error("please write reason");
          }
        }}
      />
    </React.Fragment>
  );
  return (
    <div className="w-full flex gap-5">
      <div className="w-full">
        <TabBar count={orderCount} />
        <GolabTable
          isLoading={isLoading}
          data={sellerArr}
          columns={columns}
          pageSize={pageSize}
          totalProduct={seller?.meta?.pagination?.total}
          currentPage={page}
          showFunction={(e: any) => {
            setProductId(e.id);
          }}
          url={"/product-seller"}
          onFilter={debounce((e: any) => setFilterValue(e.filters), 700)}
          pageChange={(event: any) => {
            setPage(event.first);
          }}
        />
      </div>
      <ConfirmDialog baseZIndex={100000000000024} />

      <Dialog
        header="Confirmation"
        visible={visibleCancel ? true : false}
        style={{ width: "40vw" }}
        baseZIndex={100000000000024}
        onHide={() => {
          if (!visibleCancel) return;
          setVisibleCancel(false);
        }}
        footer={NavigateDialog}
      >
        <div className="mb-4 flex gap-1 align-items-center">
          <i className="pi pi-exclamation-triangle"></i>
          <p className="m-0">Do you realy wanna cancel this order</p>
        </div>
        <p className="m-0">{t("cancel_reason_lebel")}</p>
        <InputText
          className="w-full"
          value={CancelReason}
          placeholder={t("cancel_reason")}
          onChange={(e) => setCancelReason(e.target.value)}
        />
      </Dialog>
      {oneOrder && productId && (
        <OrderDetails
          cencel={() => {
            setVisibleCancel(productId);
          }}
          data={oneOrder?.data}
          close={() => {
            setProductId(null);
          }}
          changeStatus={() => {
            confirm1({
              message: "Are you sure you want to change status?",
              type: oneOrder?.data?.status,
              id: productId
            });
          }}
        />
      )}
    </div>
  );
};

export default SellerOrderPage;
