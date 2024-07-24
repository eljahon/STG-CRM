import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetAllData } from "../../../service/global";
import GolabTable from "../../../ui/tabel";
import debounce from "../../../hooks/debounce";
import OrderDetails from "../ui/order-madal";
import TabBar from "../ui/tab-bar";
import getSocket from "../../../service/socket";
import StatusBtn from "../../../ui/status";

const SellerOrderPage = () => {
  const [page, setPage] = useState<any>(0);
  const [productId, setProductId] = useState<any>(null);
  const pageSize = 15;
  const [filterValue, setFilterValue] = useState<any>(null);
  const { t } = useTranslation();
  const socket = getSocket();

  useEffect(() => {
    socket.connect();
    socket.emit("count");
    socket.on("clients", (res: any) => {
      console.log("listing", res);
    });

    return () => {
      // socket.off("clients");
      socket.disconnect();
    };
  }, []);

  const { data: seller, isLoading } = useQuery(
    ["seller/orders", page, filterValue],
    () =>
      GetAllData("seller/orders", {
        populate: "*",
        pagination: {
          page: page / pageSize + 1,
          pageSize: pageSize
        },
        filters: {
          product: {
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
          visible: {
            $containsi:
              filterValue?.["visible"]?.value == "cancelled"
                ? false
                : filterValue?.["visible"]?.value == "completed"
                ? true
                : undefined
          }
        }
      })
  );

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

  return (
    <div className="w-full flex gap-5">
      <div className="w-full">
        <TabBar />
        <GolabTable
          isLoading={isLoading}
          data={seller?.data}
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
