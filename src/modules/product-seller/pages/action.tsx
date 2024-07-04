import { FormContainer } from "../../../components/Forms";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../ui/loader";
import FromAction from "../../../ui/form-top-actions";
import GlobalInput from "../../../ui/form/global-input";
import SwichInputLoc from "../../../ui/form/swich-input";
import lodash from "lodash";
import { GetAllData, GetByIdData } from "../../../service/global";
import { useQuery } from "react-query";
export default function SellerProductAction() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [compArr, setCompArr] = useState([]);
  const [productArr, setProductArr] = useState([]);
  const [productLoaging, setProductLoaging] = useState(false);
  const [compLoaging, setCompLoaging] = useState(false);
  const { id } = useParams();
  const { data: productOne, isLoading: productLoader } = useQuery(
    ["sellerProductId", id],
    () =>
      GetByIdData("seller-products", id, {
        populate: "product, product.company"
      }),
    {
      enabled: id !== "new"
    }
  );

  const getComp = async (copm?: string) => {
    setCompLoaging(true);
    GetAllData("seller/companies", {
      populate: "*",
      filters: {
        confirmed: true,
        rejected: false,
        company: {
          name: { $containsi: copm || undefined }
        }
      }
    })
      .then((e) => {
        const newArr: any = compArr ? [...compArr, ...e?.data] : e?.data;
        const updateDate = productOne?.product?.company
          ? [productOne.product, ...newArr]
          : newArr;
        const uniqueUsersByName: any = lodash.uniqBy(updateDate, "company.id");
        setCompArr(uniqueUsersByName);
      })
      .catch((errors) => console.log(errors))
      .finally(() => setCompLoaging(false));
  };
  const getProduct = async (product?: string, copmid?: any) => {
    setProductLoaging(true);
    GetAllData("distributor/products", {
      populate: "*",
      filters: {
        company: copmid || undefined,
        title: { $containsi: product || undefined }
      }
    })
      .then((e) => {
        const newArr = productArr ? [...productArr, ...e?.data] : e?.data;
        const updateDate = productOne?.product
          ? [productOne.product, ...newArr]
          : newArr;
        const uniqueUsersByName: any = lodash.uniqBy(updateDate, "id");
        setProductArr(uniqueUsersByName);
      })
      .catch((errors) => console.log(errors))
      .finally(() => setProductLoaging(false));
  };

  useEffect(() => {
    getComp();
    getProduct();
  }, [productOne]);
  return (
    <>
      <FormContainer
        url={"seller-products"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "product",
            validations: [{ type: "required" }],
            value: productOne?.product?.id || ""
          },
          {
            name: "price",
            validations: [{ type: "required" }],
            value: productOne?.price || ""
          },
          {
            name: "count",
            validations: [{ type: "required" }],
            value: productOne?.count || ""
          },
          {
            name: "visible",
            validations: [{ type: "required" }],
            value: id == "new" ? true : productOne?.visible
          }
        ]}
        onSuccess={() => {
          navigate("/product-seller");
        }}
        onError={(e: any) => {
          console.log(e, "onError");
        }}
        onFinal={() => {
          setLoader(false);
        }}
        // onSubmit={() => {
        // }}
        validateOnMount={false}
      >
        {(formik) => {
          return (
            <>
              <FromAction
                loader={loader}
                title={t("product")}
                cancel={t("cancel")}
                urlOnCancel={"/product-seller"}
              />
              <div className="flex gap-2 bg-white flex-wrap border-round-3xl p-4">
                <GlobalInput
                  type="select"
                  filter={(e: any) => {
                    getComp(e);
                  }}
                  formik={formik}
                  value={productOne?.product?.company?.id}
                  label={`${t("companyName")} `}
                  name={`company`}
                  id={"company"}
                  className={"mb-4 colm2 "}
                  options={compArr}
                  optionLabel="company.name"
                  optionValue="company.id"
                  localChange={(e: any) => {
                    getProduct("", e.value);
                  }}
                  placeholder={`${t("companyName")}`}
                  loading={compLoaging}
                />
                <GlobalInput
                  type="select"
                  filter={(e: any) => getProduct(e)}
                  formik={formik}
                  value={formik.values.product}
                  label={`${t("productName")} `}
                  name={`product`}
                  id={"product"}
                  className={"mb-4 colm2 "}
                  options={productArr}
                  optionLabel="title"
                  optionValue="id"
                  localChange={(e: any) => {
                    console.log(e);
                  }}
                  errors={formik.errors.product}
                  placeholder={`${t("productName")}`}
                  loading={productLoaging}
                />

                <GlobalInput
                  type="text"
                  typeValue={"number"}
                  formik={formik}
                  value={formik.values.price}
                  label={t("price")}
                  name={"price"}
                  id={"price"}
                  placeholder={t("price")}
                  className={"mb-4 colm2"}
                  errors={formik.errors.price}
                />
                <SwichInputLoc
                  formik={formik}
                  className={"mb-4 mt-4 colm2"}
                  value={formik.values.visible}
                  label={t("visible")}
                />
                <GlobalInput
                  type="text"
                  typeValue={"number"}
                  formik={formik}
                  value={formik.values.count}
                  label={t("count")}
                  name={"count"}
                  id={"count"}
                  placeholder={t("count")}
                  className={"mb-4 colm2"}
                  errors={formik.errors.count}
                />
              </div>
            </>
          );
        }}
      </FormContainer>
      {productLoader && <Loader />}
    </>
  );
}
