import { useState } from "react";
import { GetAllData } from "../../../service/global";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import Loader from "../../../ui/loader";
import FromAction from "../../../ui/form-top-actions";
import GlobalInput from "../../../ui/form/global-input";
import { FormContainer } from "../../../components/Forms";
import { useNavigate } from "react-router-dom";

export default function FinancePage() {
  const [loader, setLoader] = useState(false);
  const { data: userMe, isLoading } = useQuery("me", () =>
    GetAllData("users/me", { populate: "*" })
  );

  const { t } = useTranslation();
  const navigate = useNavigate();
  console.log(userMe);
  return (
    <div className="mb-4">
      <FormContainer
        url={"seller/updateFinance"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "bank_account",
            validations: [{ type: "required" }],
            value: userMe?.seller?.bank_account
          },
          {
            name: "mfo",
            validations: [{ type: "required" }],
            value: userMe?.seller?.mfo
          },
          {
            name: "inn",
            validations: [{ type: "required" }],
            value: userMe?.seller?.inn
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
                title={t("finance")}
                cancel={t("cancel")}
                urlOnCancel={"/dashboard"}
              />
              <div className="flex gap-4 bg-white border-round-3xl p-4  ">
                <GlobalInput
                  type="text"
                  formik={formik}
                  value={formik.values.bank_account}
                  label={t("bank_account")}
                  name={"bank_account"}
                  id={"bank_account"}
                  placeholder={t("bank_account")}
                  className={"mb-4 colm2"}
                  errors={formik.errors.bank_account}
                />
                <GlobalInput
                  type="text"
                  formik={formik}
                  value={formik.values.mfo}
                  label={t("mfo")}
                  name={"mfo"}
                  id={"mfo"}
                  placeholder={t("mfo")}
                  className={"mb-4 colm2"}
                  errors={formik.errors.mfo}
                />
                <GlobalInput
                  type="text"
                  formik={formik}
                  value={formik.values.inn}
                  label={t("inn")}
                  name={"inn"}
                  id={"inn"}
                  placeholder={t("inn")}
                  className={"mb-4 colm2"}
                  errors={formik.errors.inn}
                />
              </div>
            </>
          );
        }}
      </FormContainer>
      {isLoading && <Loader />}
    </div>
  );
}
