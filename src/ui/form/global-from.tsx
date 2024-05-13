import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AddData, UpdateData, UpdateDataOne } from "../../service/global";
import { Button } from "primereact/button";

interface IForm {
  children?: any;
  handleSubmit: any;
  reset?: any;
  setfile?: any;
  url: string;
  title?: string;
  navUrl?: any;
  btntext?: any;
  cancel?: any;
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
  btntext
}: IForm) {
  const { id } = useParams();
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleAdd = async (data: any) => {
    setLoader(true);
    if (id == "new" || !id) {
      await AddData(url, data)
        .then(() => {
          toast.success("seccessfully create");
          navigate(navUrl);
          // reset()
        })
        .catch((error: any) => {
          toast.error(error?.response?.data?.error?.message);
        })
        .finally(() => setLoader(false));
    } else if (id == "old") {
      await UpdateDataOne(url, data)
        .then(() => {
          toast.success("seccessfully update");
          navigate(navUrl);
          if (setfile?.length) {
            setfile(null);
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error?.message);
        })
        .finally(() => setLoader(false));
    } else {
      await UpdateData(url, data, id)
        .then(() => {
          toast.success("seccessfully update");

          navigate(navUrl);
          reset();
          if (setfile?.length) {
            setfile(null);
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error?.message);
        })
        .finally(() => setLoader(false));
    }
  };
  return (
    <form onSubmit={handleSubmit(handleAdd)}>
      <div className="flex w-full justify-content-between align-items-center  px-2  mt-5 mb-4">
        <h3 className="m-0 text-2xl">{title}</h3>
        <div className="flex gap-2  ">
          <Button
            className="border-round-3xl px-4"
            label={btntext || "Add"}
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
      {loader && "."}
    </form>
  );
}
