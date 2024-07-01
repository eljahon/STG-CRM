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
  const { data: seller, isLoading } = useQuery(["product-seller", page], () =>
    GetAllData("product-seller", {
      populate: "*",
      pagination: {
        page: page / pageSize + 1,
        pageSize: pageSize
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
            pageChange={(event: any) => {
              setPage(event.first);
            }}
            // deleteFunction={(rowItem: any) => {
            //   console.log(rowItem);
            // }}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerProductPage;
