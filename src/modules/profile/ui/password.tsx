import { useTranslation } from "react-i18next";
import { FormContainer } from "../../../components/Forms";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FromAction from "../../../ui/form-top-actions";
import { Password } from "primereact/password";

export default function ProfilePasswordPage() {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false);
  const [confirPasswordErr, setConfirPaswordErr] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div className="mb-4">
      <FormContainer
        url={"users-permissions/change-password"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "currentPassword",
            validations: [{ type: "required" }],
            value: ""
          },
          {
            name: "password",
            validations: [{ type: "required" }],
            value: ""
          }
        ]}
        onSuccess={() => {
          navigate("/dashboard");
        }}
        onError={(e: any) => {
          console.log(e, "onError");
        }}
        onFinal={() => {
          setLoader(false);
        }}
        validateOnMount={false}
      >
        {(formik) => {
          return (
            <>
              <FromAction
                loader={loader}
                title={t("password")}
                cancel={t("cancel")}
                urlOnCancel={"/dashboard"}
              />
              <div className="w-full bg-white border-round-3xl py-6 px-4 flex flex-wrap gap-5 ">
                <div className="card">
                  <p className="label-my">{t("currentpassword")}</p>
                  <Password
                    name="currentPassword"
                    toggleMask
                    onChange={(e: any) =>
                      formik.setFieldValue("currentPassword", e.target.value)
                    }
                  />
                </div>
                <div className="card">
                  <p className="label-my"> {t("newpassword")}</p>
                  <Password
                    toggleMask
                    name="password"
                    onChange={(e: any) => {
                      formik.setFieldValue("password", e.target.value);
                    }}
                  />
                </div>
                <div className="card relative">
                  <p className="label-my"> {t("confirmpassword")}</p>
                  <Password
                    toggleMask
                    feedback={false}
                    onChange={(e: any) => {
                      if (e.target.value == formik.values?.password) {
                        setConfirPaswordErr(false);
                        formik.setErrors({});
                      } else {
                        setConfirPaswordErr(true);
                        (formik as any).setFieldError("password", {
                          type: "custom",
                          message: "uncurrect"
                        });
                      }
                    }}
                  />
                  {confirPasswordErr ? (
                    <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                      {t("unCurrectmpassword")}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          );
        }}
      </FormContainer>
    </div>
  );
}
