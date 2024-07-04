import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetAllData } from "../../../service/global";
import GolabTable from "../../../ui/tabel";
import { useNavigate } from "react-router-dom";
import StatusBtn from "../../../ui/status";
import { Dropdown } from "primereact/dropdown";
import debounce from "../../../hooks/debounce";
import ProductDetails from "../ui/product-madal";

const statuses = [
  {
    value: "completed",
    label: "visible"
  },
  {
    value: "cancelled",
    label: "unvisible"
  }
];
const SellerProductPage = () => {
  const [page, setPage] = useState<any>(0);
  const [productId, setProductId] = useState<any>(null);
  const pageSize = 8;
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState<any>(null);
  const { t } = useTranslation();
  const { data: seller, isLoading } = useQuery(
    ["seller-products", page, filterValue],
    () =>
      GetAllData("seller-products", {
        populate: "product, product.company, product.image, product.gallery ",
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
  const statusItemTemplate = (option: any) => {
    return (
      <StatusBtn
        className={"inline-block"}
        label={t(option?.label)}
        status={option?.value}
      />
    );
  };

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
            {itemData?.product?.image?.aws_path ? (
              <img
                src={
                  import.meta.env.VITE_APP_AWS_PATH +
                  itemData?.product?.image?.aws_path
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
    },
    {
      header: t("companyName"),
      field: "product.company.name",
      id: 2,
      exportable: false,
      filter: true,
      filterPlaceholder: t("search")
    },
    {
      header: t("productName"),
      field: "product.title",
      id: 3,
      exportable: false,
      filter: true,
      filterPlaceholder: t("search")
    },
    {
      header: t("visible"),
      field: "visible",
      id: 4,
      exportable: false,
      body: (itemData: any) => {
        return (
          <StatusBtn
            className={"inline-block"}
            label={itemData?.visible ? t("visible") : t("unvisible")}
            status={itemData?.visible ? "completed" : "cancelled"}
          />
        );
      },
      filter: true,
      filterElement: (options: any) => {
        return (
          <Dropdown
            value={options.value}
            options={statuses}
            onChange={(e: any) => options.filterApplyCallback(e.value)}
            itemTemplate={statusItemTemplate}
            placeholder="Select One"
            className="p-column-filter"
            showClear
            style={{ minWidth: "12rem" }}
          />
        );
      }
    },
    {
      header: t("price"),
      field: "price",
      id: 4,
      exportable: false
    },
    {
      header: t("count"),
      field: "count",
      id: 5,
      exportable: false
    }
  ];

  return (
    <div className="w-full flex gap-5">
      <div className="w-full">
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
          tableTile={t("products")}
          newAdd={() => {
            navigate("/product-seller/new");
          }}
          Isupdate={true}
          pageChange={(event: any) => {
            setPage(event.first);
          }}
          deleteFunction={(rowItem: any) => {
            console.log(rowItem);
          }}
          deleteUrl={"seller-products"}
        />
      </div>

      {productId && (
        <ProductDetails data={productId} close={() => setProductId(null)} />
      )}
    </div>
  );
};

export default SellerProductPage;
