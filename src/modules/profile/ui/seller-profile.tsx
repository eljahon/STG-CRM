import { useEffect, useState } from "react";
import UploadFile from "../../../ui/uploadFile";
import { GetAllData } from "../../../service/global";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import Loader from "../../../ui/loader";
import FromAction from "../../../ui/form-top-actions";
import GlobalInput from "../../../ui/form/global-input";
import { FormContainer } from "../../../components/Forms";
import { useNavigate } from "react-router-dom";
import YandexMap from "../../../ui/yandex-map";

export default function ProfileSettingSelerPage() {
  const [loader, setLoader] = useState(false);
  const [region, setRegion] = useState(undefined);
  const [locationOpt, setLoactionOpt] = useState([]);
  const { data: userMe, isLoading } = useQuery("me", () =>
    GetAllData("users/me", { populate: "*" })
  );
  const { data: regions, isLoading: regionsLoading } = useQuery("regions", () =>
    GetAllData("regions")
  );
  const { data: districts, isLoading: districtsLoading } = useQuery(
    ["districts", region],
    () =>
      GetAllData("districts", {
        filters: { region: region || undefined }
      }),
    {
      enabled: region ? true : false
    }
  );
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setRegion(userMe?.seller?.region?.id);
  }, [userMe]);

  const AutoCompleteItem = (item: any) => {
    return (
      <div>
        <div className="font-bold">{item.name}</div>
        <div className="text-normal">{item.description}</div>
      </div>
    );
  };
  return (
    <div className="mb-4">
      <FormContainer
        url={"seller/update"}
        isFormData={false}
        setLoader={setLoader}
        loaderGlob={loader}
        fields={[
          {
            name: "name",
            validations: [{ type: "required" }],
            value: userMe?.seller?.name || ""
          },
          {
            name: "address",
            validations: [{ type: "required" }],
            value: userMe?.seller?.address || ""
          },
          {
            name: "phone",
            value: userMe?.seller?.phone || ""
          },
          {
            name: "region",
            value: userMe?.seller?.region?.id || ""
          },
          {
            name: "district",
            value: userMe?.seller?.district?.id || ""
          },
          {
            name: "about",
            value: userMe?.seller?.about || ""
          },
          {
            name: "location",
            validationType: "object",
            value: userMe?.seller?.location || ""
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
          console.log(formik);
          return (
            <>
              <FromAction
                loader={loader}
                title={t("profile-seller")}
                cancel={t("cancel")}
                urlOnCancel={"/dashboard"}
              />
              <div className="flex gap-4 w-full">
                <div className="w-4 bg-white border-round-3x gap-2 p-4">
                  <GlobalInput
                    type="text"
                    formik={formik}
                    value={formik.values.name}
                    label={t("name")}
                    name={"name"}
                    id={"name"}
                    placeholder={t("name")}
                    className={"mb-4 "}
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
                    className={"mb-4 "}
                    disabled={true}
                  />

                  <GlobalInput
                    type="textarea"
                    formik={formik}
                    value={formik.values.about}
                    label={t("about")}
                    name={"about"}
                    id={"about"}
                    rows={20}
                    placeholder={t("about")}
                    className={"mb-4 w-full h-full"}
                  />
                </div>
                <div className="w-8 bg-white border-round-3x  gap-2 p-4">
                  <GlobalInput
                    type="select"
                    formik={formik}
                    value={formik.values.region}
                    label={`${t("selectregion")} `}
                    name={`region`}
                    id={"unit"}
                    localChange={(e: any) => setRegion(e.value)}
                    className={"mb-4 "}
                    options={regions?.data}
                    optionLabel="name"
                    optionValue="id"
                    placeholder={`${t("region")}`}
                    loading={regionsLoading}
                  />
                  <GlobalInput
                    type="select"
                    formik={formik}
                    value={formik.values.district}
                    label={`${t("selectDistrict")} `}
                    name={`district`}
                    id={"district"}
                    className={"mb-4 "}
                    options={districts?.data}
                    optionLabel="name"
                    optionValue="id"
                    placeholder={`${t("district")}`}
                    loading={districtsLoading}
                  />
                  <GlobalInput
                    type="autoComplete"
                    formik={formik}
                    value={formik.values.address}
                    label={t("address")}
                    name={"address"}
                    id={"address"}
                    placeholder={t("address")}
                    className={"mb-4 "}
                    options={locationOpt}
                    AutoCompleteItem={AutoCompleteItem}
                    localChange={async (e: any) => {
                      if (e.query?.length) {
                        await GetAllData(`geo-point/${e.query}`)
                          .then((e) => {
                            setLoactionOpt(e?.data);
                          })
                          .catch(() => console.log("err from addres sreach"));
                      }
                    }}
                    onSelect={(e: any) => {
                      formik.setFieldValue("address", e.value?.name);

                      formik.setFieldValue("location", {
                        lat: e.value?.point[0],
                        long: e.value?.point[1]
                      });
                    }}
                    errors={formik.errors.address}
                  />

                  <YandexMap
                    value={
                      formik.values.location && [
                        formik.values.location?.long,
                        formik.values.location?.lat
                      ]
                    }
                    onLocationSelect={(e) => {
                      formik.setFieldValue("location", {
                        lat: e[1],
                        long: e[0]
                      });
                    }}
                  />
                </div>
              </div>
            </>
          );
        }}
      </FormContainer>
      {isLoading && <Loader />}
    </div>
  );
}
