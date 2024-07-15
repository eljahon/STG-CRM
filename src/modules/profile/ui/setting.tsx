import { useState } from "react";
import UploadFile from "../../../ui/uploadFile";
import { GetAllData } from "../../../service/global";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import Loader from "../../../ui/loader";
import FromAction from "../../../ui/form-top-actions";
import GlobalInput from "../../../ui/form/global-input";
import { FormContainer } from "../../../components/Forms";
import { useNavigate } from "react-router-dom";

export default function ProfileSettingPage() {
  const [loader, setLoader] = useState(false);
  const { data: userMe, isLoading } = useQuery("me", () =>
    GetAllData("users/me", { populate: "*" })
  );
  const { data: genders } = useQuery("genders", () => GetAllData("genders"));
  const { data: regions } = useQuery("regions", () => GetAllData("regions"));
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <FormContainer
        url={"users-permissions/user-update"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "fullname",
            validations: [{ type: "required" }],
            value: userMe?.fullname
          },
          {
            name: "gender",
            validations: [{ type: "required" }],
            value: userMe?.gender?.id
          },
          {
            name: "region",
            value: userMe?.region?.id
          },
          {
            name: "avatar",
            value: userMe?.avatar?.id
          }
        ]}
        onSuccess={(res: any) => {
          window.localStorage.setItem("fullname", res?.data?.fullname);
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
                title={t("profile")}
                cancel={t("cancel")}
                urlOnCancel={"/dashboard"}
              />
              <div className="flex gap-4 bg-white border-round-3xl p-4    flex-column-reverse  md:flex-row   ">
                <div className="w-full md:w-8 gap-2 flex flex-wrap">
                  <GlobalInput
                    type="text"
                    formik={formik}
                    value={formik.values.fullname}
                    label={t("fullname")}
                    name={"fullname"}
                    id={"fullname"}
                    placeholder={t("fullname")}
                    className={"mb-4 colm2"}
                    errors={formik.errors.fullname}
                  />

                  <GlobalInput
                    type="select"
                    formik={formik}
                    value={formik.values.gender}
                    label={`${t("selectgender")} `}
                    name={`gender`}
                    id={"gender"}
                    className={"mb-4 colm2"}
                    options={genders?.data}
                    optionLabel="name"
                    optionValue="id"
                    placeholder={`${t("gender")}`}
                    errors={formik.errors.gender}
                    // required={
                    //   !formik.values.region ? true : false
                    // }
                  />
                  <GlobalInput
                    type="select"
                    formik={formik}
                    value={formik.values.region}
                    label={`${t("selectregion")} `}
                    name={`region`}
                    id={"unit"}
                    className={"mb-4 colm2"}
                    options={regions?.data}
                    optionLabel="name"
                    optionValue="id"
                    placeholder={`${t("region")}`}
                    // required={
                    //   !formik.values.region ? true : false
                    // }
                  />
                </div>

                <UploadFile
                  logo={true}
                  className={"mb-4 w-full md:w-4"}
                  formik={formik}
                  value={userMe?.avatar?.aws_path}
                  error={formik.errors}
                  fieldName={"avatar"}
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
