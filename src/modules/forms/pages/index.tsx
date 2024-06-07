import { FormContainer } from "../../../components/Forms";
import { FieldArray } from "formik";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import FromAction from "../../../ui/form-top-actions";
import ProductContentInputs from "../ui/contect";
import { useQuery } from "react-query";
import { GetAllData } from "../../../service/global";
import Itemsform from "../ui/items-form";
import { Button } from "primereact/button";

export default function ProductPage() {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false);
  const { data: units } = useQuery(["units"], () => GetAllData(`units`));
  const { data: drugCategory } = useQuery("drugCategory", () =>
    GetAllData("drug-categories")
  );
  const { data: fertilizerCategory } = useQuery("fertilizerCategory", () =>
    GetAllData("fertilizer-categories")
  );
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
            validationType: "object"
          },
          {
            name: "friends",
            validations: [{ type: "required" }],
            validationType: "array",
            value: [""]
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
          // console.log(formik.values);
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
                      {formik.values.friends && formik.values.friends.length > 0
                        ? formik.values.friends.map(
                            (value: any, index: any) => (
                              <Itemsform
                                formik={formik}
                                arrayHelpers={arrayHelpers}
                                key={index}
                                value={value}
                                index={index}
                              />
                            )
                          )
                        : ""}

                      <Button
                        severity="success"
                        className="border-round-3xl px-5"
                        label={t("add")}
                        type="button"
                        onClick={() => arrayHelpers.push("")}
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
