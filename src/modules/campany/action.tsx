import { useState } from "react";
import { GetAllData } from "../../service/global";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import Loader from "../../ui/loader";
import { FormContainer } from "../../components/Forms";
import { useNavigate } from "react-router-dom";
import GlobalInput from "../../ui/form/global-input";
import FromAction from "../../ui/form-top-actions";
import UploadFile from "../../ui/uploadFile";

export default function CampanySetPage() {
  const [loader, setLoader] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: companies, isLoading } = useQuery("meFor", () =>
    GetAllData("my-company", { populate: "*" })
  );

  return (
    <>
      <FormContainer
        url={
          companies && companies != "undefined"
            ? "update-company"
            : "create-company"
        }
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "name",
            validations: [{ type: "required" }],
            value: companies?.name
          },
          {
            name: "phone",
            validations: [{ type: "phone" }, { type: "required" }],
            value: companies?.phone
          },
          {
            name: "description",
            value: companies?.description
          },
          {
            name: "logo",
            value: companies?.logo?.id
          }
        ]}
        onSuccess={(res: any) => {
          window.localStorage.setItem("compony", res?.data?.id);
          navigate("/dashboard");
        }}
        onError={(e: any) => {
          console.log(e, "onError");
        }}
        onFinal={() => {
          setLoader(false);
        }}
        validateOnMount={false}
        customData={(value: any) => {
          let returnResult: any = JSON.parse(JSON.stringify(value));
          console.log(returnResult["logo"]);
          returnResult["logo"] === 0 || returnResult["logo"] == ""
            ? (returnResult["logo"] = null)
            : "";

          return returnResult;
        }}
      >
        {(formik) => {
          return (
            <>
              <FromAction
                loader={loader}
                title={t("company")}
                cancel={t("cancel")}
                urlOnCancel={"/dashboard"}
              />
              <div className="flex gap-4 bg-white border-round-3xl p-4  flex-column-reverse  md:flex-row ">
                <div className="w-full md:w-8 gap-2 flex flex-wrap">
                  <GlobalInput
                    type="text"
                    formik={formik}
                    value={formik.values.name}
                    label={t("companyName")}
                    name={"name"}
                    id={"companyName"}
                    placeholder={t("companyName")}
                    className={"mb-4 colm2"}
                    errors={formik.errors.name}
                  />
                  <GlobalInput
                    type="text"
                    formik={formik}
                    value={formik.values.phone}
                    label={t("phone")}
                    name={"phone"}
                    id={"phone"}
                    placeholder={t("phone")}
                    className={"mb-4 colm2"}
                    errors={formik.errors.phone}
                  />
                  <GlobalInput
                    type="textarea"
                    formik={formik}
                    value={formik.values.description}
                    label={t("description")}
                    name={"description"}
                    id={"description"}
                    className={"mb-4 w-full"}
                    placeholder={t("description")}
                    errors={formik.errors.description}
                    rows={7}
                    cols={20}
                  />
                </div>

                <UploadFile
                  logo={true}
                  className={" w-full mb-4 md:w-4"}
                  formik={formik}
                  value={companies?.logo?.aws_path}
                  error={formik.errors}
                  fieldName={"logo"}
                />
              </div>
            </>
          );
        }}
      </FormContainer>
      {isLoading && <Loader />}
    </>
  );
}
