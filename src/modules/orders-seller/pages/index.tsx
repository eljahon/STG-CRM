import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetAllData, GetByIdData } from "../../../service/global";
import GolabTable from "../../../ui/tabel";
import debounce from "../../../hooks/debounce";
import OrderDetails from "../ui/order-madal";
import TabBar from "../ui/tab-bar";
import getSocket from "../../../service/socket";
import StatusBtn from "../../../ui/status";
import lodash from "lodash";
import { useSearchParams } from "react-router-dom";
const SellerOrderPage = () => {
  const [page, setPage] = useState<any>(0);
  const [params] = useSearchParams();
  const [productId, setProductId] = useState<any>(null);
  const [sellerArr, setSelllerArr] = useState<any>([]);
  const [orderId, setOrderId] = useState<any>(null);
  const [orderCount, setOrderCount] = useState();
  const pageSize = 15;
  const [filterValue, setFilterValue] = useState<any>(null);
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
  useEffect(() => {
    socket.connect();
    socket.on("order", async (res: any) => {
      setOrderId(res?.id);
    });
    socket.on("orderCounts", async (res: any) => {
      setOrderCount(res);
      console.log(res);
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
      header: t("count"),
      field: "count",
      id: 5,
      exportable: false,
      filter: true,
      filterPlaceholder: t("search")
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
            label={t(itemData?.status)}
            status={itemData?.status}
          />
        );
      },
      filter: true,
      filterPlaceholder: t("search")
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
          updatedItems[index] = data?.data;
          setSelllerArr(updatedItems);
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
            setProductId(e);
          }}
          url={"/product-seller"}
          onFilter={debounce((e: any) => setFilterValue(e.filters), 700)}
          pageChange={(event: any) => {
            setPage(event.first);
          }}
        />
      </div>

      {productId && (
        <OrderDetails data={productId} close={() => setProductId(null)} />
      )}
    </div>
  );
};

export default SellerOrderPage;
