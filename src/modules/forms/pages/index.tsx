import { FormContainer } from "../../../components/Forms";
import { FieldArray } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function ProductPage() {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false);
  return (
    <>
      <FormContainer
        url={"user"}
        isFormData={false}
        fields={[
          {
            name: "identifier",
            validations: [{ type: "required" }]
          },
          {
            name: "password",
            validations: [{ type: "required" }]
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
          console.log(formik);
          return (
            <>
              <div className="mb-5">
                <InputText
                  id="identifier"
                  name="identifier"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t("identifier")}
                  invalid={Boolean(formik.errors.identifier)}
                />
              </div>
              <div className="mb-5">
                <InputText
                  id="password"
                  name="password"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t("password")}
                  invalid={formik.errors.password ? true : false}
                />
              </div>
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
              {/*<FastField*/}
              {/*    name="password"*/}
              {/*    component={InputText}*/}
              {/*/>*/}
              <Button loading={loader} type="submit">
                submit
              </Button>
            </>
          );
        }}
      </FormContainer>
    </>
  );
}
