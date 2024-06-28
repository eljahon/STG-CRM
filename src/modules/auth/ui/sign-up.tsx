import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import GlobalInput from "../../../ui/form/global-input";
import { useQuery } from "react-query";
import { GetAllData } from "../../../service/global";
import LeftBar from "./left-bar";
import { Dialog } from "primereact/dialog";
import { FormContainer } from "../../../components/Forms";

export default function SignUpFrom() {
  const [loader, setLoader] = useState(false);
  const [region, setRegion] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: regions, isLoading: regionsLoading } = useQuery("regions", () =>
    GetAllData("regions")
  );
  const { data: districts, isLoading: districtsLoading } = useQuery(
    ["districts", region],
    () =>
      GetAllData(`districts`, {
        filters: { region: region || undefined }
      }),
    {
      enabled: Boolean(region)
    }
  );
  useEffect(() => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("compony");
    window.localStorage.removeItem("role");
  }, []);

  const NavigateDialog = (
    <React.Fragment>
      <Button
        label={"ok"}
        icon="pi pi-check"
        severity="success"
        onClick={() => {
          setOpen(false);
          navigate("/auth/login");
        }}
      />
    </React.Fragment>
  );

  return (
    <div
      className="flex aling-item-start  sm:my-2 sm:mx-4 bg-white border-round-3xl"
      style={{ boxSizing: "border-box", height: "90vh" }}
    >
      <LeftBar />
      <div className="sm:h-full w-full sm:w-6 flex flex-column  justify-content-center  aling-item-center px-4">
        <FormContainer
          url={"register/seller"}
          isFormData={false}
          setLoader={setLoader}
          loaderGlob={loader}
          fields={[
            {
              name: "ownerName",
              validations: [{ type: "required" }]
            },
            {
              name: "sellerName",
              validations: [{ type: "required" }]
            },
            {
              name: "password",
              validations: [{ type: "required" }]
            },
            {
              name: "region",
              validations: [{ type: "required" }]
            },
            {
              name: "district",
              validations: [{ type: "required" }]
            },
            {
              name: "phone",
              validations: [{ type: "phone" }, { type: "required" }]
            }
          ]}
          onSuccess={(res: any) => {
            console.log(res);
            setOpen(true);
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
            console.log(formik.errors);
            return (
              <div className="w-full m-auto " style={{ maxWidth: "510px" }}>
                <span className="text-2xl text-green-500 font-bold sm:hidden">
                  GROWZ
                </span>
                <h3 className="text-3xl font-bold ">Sign In to Woorkroom</h3>
                <GlobalInput
                  type="text"
                  formik={formik}
                  value={formik.values.ownerName}
                  label={t("ownerName")}
                  name={"ownerName"}
                  id={"ownerName"}
                  placeholder={t("ownerName")}
                  className={"mb-3 text-start"}
                  errors={formik.errors.ownerName}
                />
                <GlobalInput
                  type="text"
                  formik={formik}
                  value={formik.values.sellerName}
                  label={t("sellerName")}
                  name={"sellerName"}
                  id={"sellerName"}
                  placeholder={t("sellerName")}
                  className={"mb-3 text-start"}
                  errors={formik.errors.sellerName}
                />
                <GlobalInput
                  type="text"
                  formik={formik}
                  value={formik.values.phone}
                  label={t("phone")}
                  name={"phone"}
                  id={"phone"}
                  placeholder={t("phone")}
                  className={"mb-3 text-start"}
                  errors={formik.errors.phone}
                />
                <GlobalInput
                  type="select"
                  formik={formik}
                  loading={regionsLoading}
                  value={formik.values.region}
                  label={`${t("selectRegion")} `}
                  name={`region`}
                  id={"region"}
                  className={"mb-3 "}
                  options={regions?.data}
                  optionLabel="name"
                  optionValue="id"
                  localChange={(e: any) => {
                    setRegion(e?.value);
                    formik.setFieldValue(`region`, e.value);
                  }}
                  placeholder={`${t("selectRegion")}`}
                  errors={formik.errors.region}
                />
                <GlobalInput
                  type="select"
                  formik={formik}
                  value={formik.values.district}
                  label={`${t("selectDistrict")} `}
                  name={`district`}
                  loading={districtsLoading}
                  id={"District"}
                  className={"mb-3 "}
                  options={districts?.data}
                  optionLabel="name"
                  optionValue="id"
                  localChange={(e: any) => {
                    formik.setFieldValue(`District`, e.value);
                  }}
                  placeholder={`${t("selectDistrict")}`}
                  errors={formik.errors.district}
                />
                <GlobalInput
                  type="text"
                  formik={formik}
                  value={formik.values.password}
                  label={t("password")}
                  name={"password"}
                  id={"password"}
                  placeholder={t("password")}
                  className={"mb-3 text-start"}
                  errors={formik.errors.password}
                />
                {/* <GlobalInput
                  type="text"
                  formik={formik}
                  label={t("confirmPassword")}
                  name={"confirmPassword"}
                  id={"confirmPassword"}
                  placeholder={t("confirmPassword")}
                  className={"mb-3 text-start"}
                /> */}
                <div className="w-full  mb-5  ">
                  Already have an account <Link to="/auth/login">login</Link>
                </div>
                <Button
                  loading={loader}
                  severity="success"
                  label={t("sign-up")}
                  className="w-full max-w-10rem border-round-2xl "
                ></Button>
              </div>
            );
          }}
        </FormContainer>
      </div>

      <Dialog
        visible={open}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={t("confirm")}
        modal
        footer={NavigateDialog}
        onHide={() => setOpen(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>{t("message-register")}</span>
        </div>
      </Dialog>
    </div>
  );
}
