import { useEffect, useState } from "react";
import { ImageUpload } from "../../utils/uplaoadFile";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ProgressBar } from "primereact/progressbar";

export default function UploadFileMulty({
  formik,
  fieldName,
  value = [],
  valueId = [],
  setLocalValue,
  className
}: any) {
  const [image, setImage] = useState<any>(value);
  const [imageOpen, setImageOpen] = useState<any>(null);
  const [loadingFile, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<any>(0);
  const { t } = useTranslation();
  useEffect(() => {
    setImage(value);
  }, [value]);

  const hendleimg = async (e: any) => {
    if (e.target.files[0] && e.target.files[0]?.size < 5000000) {
      setLoading(true);
      const res = await ImageUpload(
        e.target.files[0],
        {
          type: "image",
          folder: "other"
        },
        setProgress
      ).finally(() => setLoading(false));
      console.log(res?.data);
      if (value?.length) {
        formik.setFieldValue(fieldName, [res?.data?.media?.id, ...valueId]);
        setImage((state: any) => [res?.data?.media, ...state]);
        setLocalValue((state: any) => [res?.data?.media, ...state]);
      } else {
        formik.setFieldValue(fieldName, [res?.data?.media?.id]);
        setImage([res?.data?.media]);
        setLocalValue([res?.data?.media]);
      }
    } else {
      toast.error("The galary size must be less than 5 MB.");
    }
  };

  const hendleRemoveimg = async (e: any) => {
    setImage((state: any) => state.filter((aE: any) => aE?.id != e));
    formik.setFieldValue(
      fieldName,
      valueId?.filter((aE: any) => aE != e)
    );
  };

  return (
    <div className={`w-full ${className && className}`}>
      <label className="w-6 ">
        <div className="w-6 p-3 bg-green-500 text-white border-round-3xl cursor-pointer flex align-items-center justify-content-center gap-2">
          <i className="pi pi-upload " style={{ fontSize: "1rem" }} />
          {t("upload")}
        </div>
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          className="hidden"
          onChange={(e) => hendleimg(e)}
        />
      </label>
      {image.length ? (
        <div className="flex  flex=wrap gap-2 mt-3">
          {loadingFile && (
            <div className="flex align-items-center flex-column">
              <i
                className="pi pi-spin pi-spinner-dotted p-5"
                style={{ fontSize: "3rem" }}
              ></i>
              <span
                style={{
                  fontSize: "1em",
                  color: "var(--text-color-secondary)"
                }}
                className="my-3 w-full text-center"
              >
                {progress} %
                <ProgressBar
                  mode="indeterminate"
                  style={{ height: "4px" }}
                  value={progress}
                ></ProgressBar>
              </span>
            </div>
          )}
          {image &&
            image?.map((e: any, i: any) => (
              <div
                key={i}
                className="w-full relative imageFlex"
                style={{ maxWidth: "200px" }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-black-alpha-50 flex align-items-center justify-content-center gap-4">
                  <span
                    className="cursor-pointer"
                    onClick={() => setImageOpen(e?.aws_path)}
                  >
                    <i
                      className="pi pi-eye"
                      style={{ fontSize: "1.4rem", color: "white" }}
                    />
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => hendleRemoveimg(e?.id)}
                  >
                    <i
                      className="pi pi-trash"
                      style={{ fontSize: "1.4rem", color: "white" }}
                    />
                  </span>
                </div>
                <img
                  className="w-full"
                  style={{ maxWidth: "200px" }}
                  src={import.meta.env.VITE_APP_AWS_PATH + e?.aws_path}
                  width={200}
                  height={120}
                />
              </div>
            ))}
        </div>
      ) : loadingFile ? (
        <div className="flex align-items-center flex-column">
          <i
            className="pi pi-spin pi-spinner-dotted p-5"
            style={{ fontSize: "3rem" }}
          ></i>
          <span
            style={{
              fontSize: "1em",
              color: "var(--text-color-secondary)"
            }}
            className="my-3"
          >
            loading...
          </span>
        </div>
      ) : (
        <div className="flex align-items-center flex-column mt-4">
          <i
            className="pi pi-image mt-2 p-5"
            style={{
              fontSize: "3em",
              borderRadius: "50%",
              backgroundColor: "var(--surface-b)",
              color: "var(--surface-d)"
            }}
          ></i>
          <span
            style={{
              fontSize: "1em",
              color: "var(--text-color-secondary)"
            }}
            className="my-3"
          >
            {t("dropImage")}
          </span>
        </div>
      )}

      {imageOpen && (
        <div
          onClick={() => setImageOpen(false)}
          className="fixed top-0 left-0 w-screen h-screen fixedmu"
        >
          <span
            className="cursor-pointer fixed "
            style={{ top: "50px", right: "70px" }}
          >
            <i
              className="pi pi-times"
              style={{ fontSize: "2em", color: "white" }}
            />
          </span>
          <img
            className={`w-full`}
            onClick={(e: any) => e.stopPropagation()}
            style={{
              maxWidth: "40%",
              maxHeight: "80%",
              objectFit: "contain",
              zIndex: "10001"
            }}
            src={import.meta.env.VITE_APP_AWS_PATH + imageOpen}
          />
        </div>
      )}
    </div>
  );
}
