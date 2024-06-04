import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AddData, UpdateData, UpdateDataOne } from "../../service/global";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

interface IForm {
  children?: any;
  handleSubmit: any;
  reset?: any;
  setfile?: any;
  url: string;
  title?: string;
  navUrl?: any;
  cancel?: any;
  unfixed?: any;
  loaderGlob?: any;
}
export default function GlobalFrom({
  children,
  handleSubmit,
  reset,
  setfile,
  url,
  title,
  navUrl,
  cancel,
  unfixed,
  loaderGlob
}: IForm) {
  const { id } = useParams();
  const [loader, setLoader] = useState<boolean>(loaderGlob || false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleAdd = async (data: any) => {

    setLoader(true);
    if (id == "new" || !id) {
      await AddData(url, data)
        .then((res: any) => {
          if (res?.status == "200" || res?.status == "201") {
            if(url == "create-company"){
              window.localStorage.setItem("compony", res?.data?.id);
            }
            toast.success("seccessfully create");
            navigate(navUrl);
          }
        })
        .finally(() => setLoader(false));
    } else if (id == "old") {
      await UpdateDataOne(url, data)
        .then((res: any) => {
          if (res?.status == "200" || res?.status == "201") {
            toast.success("seccessfully update");
            navigate(navUrl);
          }
          if (setfile?.length) {
            setfile(null);
          }
        })
        .finally(() => setLoader(false));
    } else {
      await UpdateData(url, data, id)
        .then((res: any) => {
          if (res?.status == "200" || res?.status == "201") {
            toast.success("seccessfully update");
            navigate(navUrl);
            reset();
          }
          if (setfile?.length) {
            setfile(null);
          }
        })
        .finally(() => setLoader(false));
    }
  };
  return (
    <form onSubmit={handleSubmit(handleAdd)}>
      <div
        style={{
          borderBottomRightRadius: "16px",
          borderBottomLeftRadius: "16px"
        }}
        className={` bg-white flex  justify-content-between align-items-center px-5 py-3 border-round-2xl px-2  pt-5 mb-4 ${
          unfixed ? "w-full" : " fixed myflext2"
        }`}
      >
        <h3 className="m-0 text-2xl">{title}</h3>
        <div className="flex gap-2  ">
          <Button
           loading={loader}
            className="border-round-3xl px-4"
            label={id == "new" || !id ? t("save") : t("update")}
            type="submit"
            severity="success"
          />
          {cancel && (
            <Button
              className="border-round-3xl px-4"
              label={cancel}
              severity="secondary"
              type="button"
              onClick={() => navigate(navUrl)}
            />
          )}
        </div>
      </div>

      {children}
    </form>
  );
}
