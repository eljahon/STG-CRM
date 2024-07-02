import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetAllData } from "../../../service/global";
import GolabTable from "../../../ui/tabel";
import { useNavigate } from "react-router-dom";

const SellerProductPage = () => {
  const [page, setPage] = useState<any>(0);
  const pageSize = 10;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: seller, isLoading } = useQuery(["seller-products", page], () =>
    GetAllData("seller-products", {
      populate: "product, product.company, product.image",
      pagination: {
        page: page / pageSize + 1,
        pageSize: pageSize
      }
    })
  );
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
      exportable: false
    },
    {
      header: t("productName"),
      field: "product.title",
      id: 3,
      exportable: false
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
    <div className="mt-5 tabhight w-full">
      <div className="w-full flex gap-5">
        <div className="w-full">
          <GolabTable
            isLoading={isLoading}
            data={seller?.data}
            columns={columns}
            pageSize={pageSize}
            totalProduct={seller?.meta?.pagination?.total}
            currentPage={page}
            url={"/product-seller"}
            checked={(value: any) => {
              console.log(value);
            }}
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
      </div>
    </div>
  );
};

export default SellerProductPage;
