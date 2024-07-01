import { FormContainer } from "../../../components/Forms";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../ui/loader";
import FromAction from "../../../ui/form-top-actions";
import GlobalInput from "../../../ui/form/global-input";
import SwichInputLoc from "../../../ui/form/swich-input";
export default function SellerProductAction() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  return (
    <>
      <FormContainer
        url={"products"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "title",
            validations: [{ type: "required" }],
            value: ""
          }
        ]}
        onSuccess={() => {
          navigate("/product-seller");
        }}
        onError={(e: any) => {
          console.log(e, "onError");
        }}
        onFinal={() => {
          setLoader(false);
        }}
        // onSubmit={() => {
        // }}
        validateOnMount={false}
      >
        {(formik) => {
          return (
            <>
              <FromAction
                loader={loader}
                title={id == "new" ? t("addProduct") : t("updateProduct")}
                cancel={"Cancel"}
                urlOnCancel={"/product-seller"}
              />
              <div className="flex gap-2 bg-white flex-wrap border-round-3xl p-4">
                <GlobalInput
                  type="select"
                  filter={(e: any) => console.log(e)}
                  formik={formik}
                  value={formik.values.company}
                  label={`${t("companyName")} `}
                  name={`company`}
                  id={"company"}
                  className={"mb-4 colm2 "}
                  options={[]}
                  optionLabel="name"
                  optionValue="id"
                  localChange={(e: any) => {
                    console.log(e);
                  }}
                  placeholder={`${t("companyName")}`}
                  loading={false}
                />
                <GlobalInput
                  type="select"
                  filter={(e: any) => console.log(e)}
                  formik={formik}
                  value={formik.values.product}
                  label={`${t("productName")} `}
                  name={`product`}
                  id={"product"}
                  className={"mb-4 colm2 "}
                  options={[]}
                  optionLabel="name"
                  optionValue="id"
                  localChange={(e: any) => {
                    console.log(e);
                  }}
                  placeholder={`${t("productName")}`}
                  loading={false}
                />

                <GlobalInput
                  type="text"
                  typeValue={"number"}
                  formik={formik}
                  value={formik.values.price}
                  label={t("price")}
                  name={"price"}
                  id={"price"}
                  placeholder={t("price")}
                  className={"mb-4 colm2"}
                  errors={formik.errors.price}
                />
                <SwichInputLoc
                  formik={formik}
                  className={"mb-4 mt-4 colm2"}
                  value={formik.values.visible}
                  label={t("visible")}
                />
              </div>
            </>
          );
        }}
      </FormContainer>
      {false && <Loader />}
    </>
  );
}
