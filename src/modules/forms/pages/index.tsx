import { FormContainer } from "../../../components/Forms";
import { FieldArray } from "formik";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import FromAction from "../../../ui/form-top-actions";
import ProductContentInputs from "../ui/contect";
import { useQuery } from "react-query";
import { GetAllData } from "../../../service/global";
import Itemsform from "../ui/items-form";
import { Button } from "primereact/button";
import lodash from "lodash";
export default function ProductPage() {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false);
  const [cropArr, setCropArr] = useState<any>([]);
  const [diseasesArr, setDiseasesArr] = useState<any>([]);
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
      .catch((errors) => console.log(errors));
  };

  const getDiseesesByCrop = async (
    crop?: string,
    diseases?: string,
    indexNumber?: any,
    isfilter?: any
  ) => {
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
      .catch((errors) => console.log(errors));
  };

  useEffect(() => {
    setCropArr([crops?.data]);
  }, [crops]);

  useEffect(() => {
    setDiseasesArr([diseeses?.data]);
  }, [diseeses]);

  return (
    <>
      <FormContainer
        url={"user"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "title",
            validations: [{ type: "required" }]
          },
          {
            name: "price",
            validations: [{ type: "required" }]
          },
          {
            name: "type",
            validations: [{ type: "required" }],
            value: "drug"
          },
          {
            name: "unit",
            validations: [{ type: "required" }]
          },
          {
            name: "state",
            validationType: "object",
            value: {
              items: [""]
            }
          }
        ]}
        onSuccess={(e: any) => {
          console.log(e, "onSuccess");
        }}
        onError={(e: any) => {
          console.log(e, "onError");
        }}
        onFinal={() => {
          setLoader(false);
          console.log("onFinal");
        }}
        // customData={{}}
        // onSubmit={() => {
        // }}
        validateOnMount={false}
      >
        {(formik) => {
          return (
            <>
              <FromAction
                loader={loader}
                title={"Product"}
                cancel={"Cancel"}
                urlOnCancel={"/forms"}
              />
              <ProductContentInputs
                formik={formik}
                unitOption={units?.data}
                drugCategory={drugCategory?.data}
                fertilizerCategory={fertilizerCategory?.data}
              />

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
                                cropArr={cropArr?.[index]}
                                diseasesArr={diseasesArr?.[index]}
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
            </>
          );
        }}
      </FormContainer>
    </>
  );
}
