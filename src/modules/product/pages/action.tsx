import { FormContainer } from "../../../components/Forms";
import { FieldArray } from "formik";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import FromAction from "../../../ui/form-top-actions";
import ProductContentInputs from "../ui/contect";
import { useQuery } from "react-query";
import { GetAllData, GetByIdData } from "../../../service/global";
import Itemsform from "../ui/items-form";
import { Button } from "primereact/button";
import lodash from "lodash";
import ProductItems from "../ui/items";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../ui/loader";
export default function ProductPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [loaderDis, setLoaderDis] = useState(false);
  const [loaderCrop, setLoaderCrop] = useState(false);
  const [cropArr, setCropArr] = useState<any>([]);
  const [diseasesArr, setDiseasesArr] = useState<any>([]);
  const [page, setPage] = useState<any>(0);
  const pageSize = 5;

  const { id } = useParams();
  const { data: productOne, isLoading: productLoader } = useQuery(
    ["productId", id],
    () => GetByIdData("products", id, { populate: "*" }),
    {
      enabled: id !== "new"
    }
  );
  const { data: units } = useQuery(["units"], () => GetAllData(`units`));
  const { data: drugCategory } = useQuery("drugCategory", () =>
    GetAllData("drug-categories")
  );
  const { data: fertilizerCategory } = useQuery("fertilizerCategory", () =>
    GetAllData("fertilizer-categories")
  );

  const { data: crops } = useQuery("crops", () => GetAllData("crops"));
  const { data: diseeses } = useQuery("diseases", () => GetAllData("diseases"));

  const getCrop = async (crop?: string, indexNumber?: any) => {
    setLoaderCrop(indexNumber);
    await GetAllData(`crops`, {
      filters: { name: { $containsi: crop || undefined } }
    })
      .then((e) => {
        const newArr = cropArr?.[indexNumber]
          ? [...cropArr?.[indexNumber], ...e?.data]
          : e?.data;
        const uniqueUsersByName: any = lodash.uniqBy(newArr, "id");
        const locArr = [...cropArr];
        locArr[indexNumber] = uniqueUsersByName;
        setCropArr(locArr);
      })
      .catch((errors) => console.log(errors))
      .finally(() => setLoaderCrop(false));
  };

  const getDiseesesByCrop = async (
    crop?: string,
    diseases?: string,
    indexNumber?: any,
    isfilter?: any
  ) => {
    setLoaderDis(indexNumber);
    await GetAllData(`diseases`, {
      filters: {
        name: { $containsi: diseases || undefined },
        crop: crop || undefined
      }
    })
      .then((e) => {
        if (isfilter) {
          const locArr = [...diseasesArr];
          locArr[indexNumber] = e?.data;
          setDiseasesArr(locArr);
        } else {
          const newArr = diseasesArr?.[indexNumber]
            ? [...diseasesArr?.[indexNumber], ...e?.data]
            : e?.data;
          const uniqueUsersByName: any = lodash.uniqBy(newArr, "id");
          const locArr = [...diseasesArr];
          locArr[indexNumber] = uniqueUsersByName;
          setDiseasesArr(locArr);
        }
      })
      .catch((errors) => console.log(errors))
      .finally(() => setLoaderDis(false));
  };

  const { data: fertilizerItems } = useQuery(
    ["fertilizerItems", productOne?.data?.fertilizer?.id, page],
    () =>
      GetAllData("fertilizations", {
        filters: {
          fertilizer: { id: { $eq: productOne?.data?.fertilizer?.id } }
        },
        populate: "*",
        pagination: {
          page: page / pageSize + 1,
          pageSize: pageSize
        }
      }),
    {
      enabled:
        productOne?.data?.confirmed && productOne?.data?.type == "fertilizer"
          ? true
          : false
    }
  );

  const { data: drugItems } = useQuery(
    ["drugItems", productOne?.data?.drug?.id, page],
    () =>
      GetAllData("treatments", {
        filters: { drug: { id: { $eq: productOne?.data.drug?.id } } },
        populate: "*",
        pagination: {
          page: page / pageSize + 1,
          pageSize: pageSize
        }
      }),
    {
      enabled:
        productOne?.data?.confirmed && productOne?.data?.type == "drug"
          ? true
          : false
    }
  );

  useEffect(() => {
    if (id == "new") {
      setCropArr([crops?.data]);
    } else {
      let locArr: any = [];
      productOne?.data?.state?.items?.map((e: any, i: any) => {
        if (productOne?.data?.type == "fertilizer") {
          const newArr =
            crops?.data && e?.crops
              ? [...e?.crops, ...crops?.data]
              : crops?.data;
          const uniqueUsersByName: any = lodash.uniqBy(newArr, "id");
          locArr[i] = uniqueUsersByName;
        } else if (productOne?.data?.type == "drug") {
          const newArr =
            crops?.data && e?.crop ? [e?.crop, ...crops?.data] : crops?.data;
          const uniqueUsersByName: any = lodash.uniqBy(newArr, "id");
          locArr[i] = uniqueUsersByName;
        }
      });
      setCropArr(locArr);
    }
  }, [crops, productOne, id]);

  useEffect(() => {
    if (id == "new") {
      setDiseasesArr([diseeses?.data]);
    }
  }, [diseeses, id]);

  useEffect(() => {
    let locArr: any = [];
    productOne?.data?.state?.items?.map((e: any, i: any) => {
      locArr[i] = e?.diseases;
    });
    setDiseasesArr(locArr);
  }, [productOne]);

  const updataFormat = (items: any) => {
    let returnResult = [...JSON.parse(JSON.stringify(items))];
    for (let i = 0; i < returnResult.length; i++) {
      if (items?.[i]?.crops) {
        returnResult[i].crops = items?.[i]?.crops?.map((e: any) => e?.id);
      }
      if (items?.[i]?.diseases) {
        returnResult[i].diseases = items?.[i]?.diseases?.map((e: any) => e?.id);
      }
      if (items?.[i]?.crop) {
        returnResult[i].crop = items?.[i]?.crop?.id;
      }
      if (items?.[i]?.unit) {
        returnResult[i].unit = items?.[i]?.unit.id;
      }
    }

    return returnResult;
  };
  return (
    <>
      <FormContainer
        url={"products"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "title",
            validations: [{ type: "required" }],
            value: productOne?.data?.title
          },

          {
            name: "type",
            validations: [{ type: "required" }],
            value: productOne?.data?.type || "drug"
          },
          {
            name: "unit",
            validations: [{ type: "required" }],
            value: productOne?.data?.unit?.id
          },
          {
            name: "description",
            value: productOne?.data?.description
          },
          {
            name: "visible",
            value: id == "new" ? true : productOne?.data?.visible
          },
          {
            name: "image",
            value: productOne?.data?.image?.id
          },
          {
            name: "cer",
            value: productOne?.data?.cer?.id
          },
          {
            name: "gallery",
            validationType: "array",
            value: productOne?.data?.gallery
              ? productOne?.data?.gallery?.map((e: any) => e?.id)
              : []
          },
          {
            name: "state",
            validationType: "object",
            value: {
              drug_category: productOne?.data?.state?.drug_category?.id,
              fertilizer_category:
                productOne?.data?.state?.fertilizer_category?.id,
              items: updataFormat(productOne?.data?.state?.items || [""]) || [
                ""
              ]
            }
          }
        ]}
        onSuccess={() => {
          navigate("/product");
        }}
        onError={(e: any) => {
          console.log(e, "onError");
        }}
        onFinal={() => {
          setLoader(false);
        }}
        customData={(value: any) => {
          let returnResult: any = JSON.parse(JSON.stringify(value));
          !returnResult["image"] && delete returnResult["image"];
          !returnResult["cer"] && delete returnResult["cer"];
          // !returnResult["gallery"]?.length && delete returnResult["gallery"];
          return returnResult;
        }}
        // onSubmit={() => {
        // }}
        validateOnMount={false}
      >
        {(formik) => {
          console.log(formik);
          return (
            <>
              <FromAction
                loader={loader}
                title={t("product")}
                cancel={t("cancel")}
                urlOnCancel={"/product"}
              />
              <ProductContentInputs
                formik={formik}
                unitOption={units?.data}
                drugCategory={drugCategory?.data}
                fertilizerCategory={fertilizerCategory?.data}
                productOne={productOne?.data}
              />

              {!productOne?.data?.confirmed ? (
                <div className="p-4 bg-white border-round-3xl mt-4 mb-8">
                  <FieldArray
                    name="state.items"
                    render={(arrayHelpers) => (
                      <>
                        {formik.values.state?.items &&
                        formik.values.state.items.length > 0
                          ? formik.values.state.items.map(
                              (valueFormik: any, index: any) => (
                                <Itemsform
                                  formik={formik}
                                  arrayHelpers={arrayHelpers}
                                  key={index}
                                  index={index}
                                  loaderDis={loaderDis === index ? true : false}
                                  loaderCrop={
                                    loaderCrop === index ? true : false
                                  }
                                  cropArr={cropArr?.[index] || cropArr?.[0]}
                                  diseasesArr={
                                    diseasesArr?.[index] ||
                                    diseasesArr?.[0] ||
                                    diseeses?.data
                                  }
                                  filterCrop={(value: any) => {
                                    getCrop(value, index);
                                  }}
                                  filterDiseeses={(value: any) => {
                                    getDiseesesByCrop(
                                      valueFormik?.crop,
                                      value,
                                      index
                                    );
                                  }}
                                  cropChange={(crop: any) => {
                                    if (formik.values.type == "drug") {
                                      getDiseesesByCrop(crop, "", index, true);
                                    }
                                  }}
                                  unitArr={units?.data}
                                />
                              )
                            )
                          : ""}
                        <Button
                          severity="success"
                          className="border-round-3xl px-5"
                          label={t("add")}
                          type="button"
                          onClick={() => {
                            getCrop("", formik.values.state.items.length);
                            if (formik.values.type == "drug") {
                              getDiseesesByCrop(
                                "",
                                "",
                                formik.values.state.items.length
                              );
                            }
                            arrayHelpers.push("");
                          }}
                        />
                      </>
                    )}
                  />
                </div>
              ) : (
                <ProductItems
                  fertilizerItems={fertilizerItems?.data}
                  drugItems={drugItems?.data}
                  type={productOne?.data?.type}
                  page={page}
                  setPage={setPage}
                  pageSize={pageSize}
                  totalProduct={
                    fertilizerItems?.meta?.pagination?.total ||
                    drugItems?.meta?.pagination?.total
                  }
                />
              )}
            </>
          );
        }}
      </FormContainer>
      {productLoader && <Loader />}
    </>
  );
}
