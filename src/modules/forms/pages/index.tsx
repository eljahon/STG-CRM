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

export default function ProductPage() {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false);
  const [cropArr, setCropArr] = useState<any>([]);
  const { data: units } = useQuery(["units"], () => GetAllData(`units`));
  const { data: drugCategory } = useQuery("drugCategory", () =>
    GetAllData("drug-categories")
  );
  const { data: fertilizerCategory } = useQuery("fertilizerCategory", () =>
    GetAllData("fertilizer-categories")
  );

  const { data: crops } = useQuery("crops", () => GetAllData("crops"));

  const getCrop = async (crop?: string, indexNumber?: any) => {
    await GetAllData(`crops`, {
      filters: { name: { $containsi: crop || undefined } }
    })
      .then((e) => {})
      .catch((errors) => console.log(errors));
  };

  useEffect(() => {
    setCropArr([crops?.data]);
  }, [crops]);
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
            value: { items: [""] }
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
          console.log(formik.values.state.items);
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
                  name="friends"
                  render={(arrayHelpers) => (
                    <>
                      {formik.values.state.items &&
                      formik.values.state.items.length > 0
                        ? formik.values.state.items.map(
                            (_: any, index: any) => (
                              <Itemsform
                                formik={formik}
                                arrayHelpers={arrayHelpers}
                                key={index}
                                index={index}
                                cropArr={cropArr?.[index]}
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
                          arrayHelpers.push("");
                          console.log(arrayHelpers);
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
