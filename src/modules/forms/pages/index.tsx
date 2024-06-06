import { FormContainer } from "../../../components/Forms";
import { FieldArray } from "formik";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import FromAction from "../../../ui/form-top-actions";
import ProductContentInputs from "../ui/contect";
import { useQuery } from "react-query";
import { GetAllData } from "../../../service/global";

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
        customData={{}}
        onSubmit={() => {
          setLoader(true);
        }}
        validateOnMount={false}
      >
        {(formik) => {
          console.log(formik.values);
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

              <div>
                <FieldArray
                  name="friends"
                  render={(arrayHelpers) => (
                    <div>
                      {formik.values.friends &&
                      formik.values.friends.length > 0 ? (
                        formik.values.friends.map((friend: any, index: any) => (
                          <div key={index}>
                            <InputText
                              id={`friends.${index}`}
                              name={`friends.${index}`}
                              value={friend}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              placeholder={t("identifier")}
                              invalid={formik.errors.identifier ? true : false}
                            />
                            {/*<Field name={`friends.${index}`} />*/}
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")} // insert an empty string at a position
                            >
                              +
                            </button>
                          </div>
                        ))
                      ) : (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          {/* show this when user has removed all friends from the list */}
                          Add a friend
                        </button>
                      )}
                    </div>
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
