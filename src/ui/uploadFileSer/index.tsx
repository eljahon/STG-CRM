import { useEffect, useState } from "react";
import { ImageUpload } from "../../utils/uplaoadFile";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ProgressBar } from "primereact/progressbar";

export default function UploadFileSer({
  setValue,
  fieldName,
  value,
  logo,
  setError,
  error,
  clearErrors,
  className
}: any) {
  const [image, setImage] = useState<any>(value);
  const [file, setfile] = useState<any>(false);
  const [iscer, setIsCer] = useState<any>(false);
  const [imageOpen, setImageOpen] = useState<any>(false);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const [progress, setProgress] = useState<any>(0);
  const { t } = useTranslation();
  useEffect(() => {
    setImage(value);
  }, [value]);

  const hendleimg = async (e: any) => {
    if (e.target.files[0] && e.target.files[0]?.size < 5000000) {
      setLoadingFile(true);
      clearErrors(fieldName);
      const res = await ImageUpload(
        e.target.files[0],
        {
          type: e.target.files[0].type == "application/pdf" ? "pdf" : "image",
          folder: "other"
        },
        setProgress
      )
        .catch((error: any) => {
          toast.error(error?.response?.data?.error?.message);
        })
        .finally(() => setLoadingFile(false));

      setfile(e.target.files[0].name);
      if (e.target.files[0].type == "application/pdf") {
        setIsCer(true);
      } else {
        setIsCer(false);
      }
      setValue(fieldName, res?.data?.media?.id);
      setImage(res?.data?.media?.aws_path);
    } else {
      setError(fieldName, {
        type: "custom",
        message: "The certifice size must be less than 5 MB."
      });
      toast.error("The certifice size must be less than 5 MB.");
    }
  };

  const hendleRemoveimg = async () => {
    setValue(fieldName, null);
    setfile(false);
    setImage(null);
  };
  return (
    <div className={`w-full ${className && className}`}>
      {loadingFile ? (
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
      ) : image ? (
        <div className="w-full flex align-items-center justify-content-center   flex-column">
          <div
            className={`w-full relative imageFlex flex justify-content-center ${
              logo ? "border-round-2xl" : ""
            }`}
            style={{ maxWidth: logo ? "80px" : "200px" }}
          >
            <div
              className={`absolute top-0 left-0 w-full h-full bg-black-alpha-50 flex align-items-center justify-content-center  ${
                logo ? "gap-3" : "gap-4"
              }`}
            >
              <span
                className="cursor-pointer"
                onClick={() => {
                  if (iscer) {
                    window.open(
                      import.meta.env.VITE_APP_AWS_PATH + image,
                      "_blank"
                    );
                  } else {
                    setImageOpen(true);
                  }
                }}
              >
                <i
                  className="pi pi-eye"
                  style={{ fontSize: logo ? "1em" : "1.4em", color: "white" }}
                />
              </span>
              <span
                className="cursor-pointer"
                onClick={() => hendleRemoveimg()}
              >
                <i
                  className="pi pi-trash"
                  style={{ fontSize: logo ? "1em" : "1.4em", color: "white" }}
                />
              </span>
            </div>
            {iscer ? (
              <i
                className="pi pi-file-pdf mt-2 p-5 mx-auto border-circle border-1 border-black"
                style={{
                  fontSize: "3em",
                  borderRadius: "50%",
                  backgroundColor: "var(--surface-b)",
                  color: "black"
                }}
              ></i>
            ) : (
              <img
                className={`w-full ${logo ? "border-round-2xl" : ""}`}
                style={{
                  maxWidth: logo ? "80px" : "200px",
                  objectFit: "contain"
                }}
                src={import.meta.env.VITE_APP_AWS_PATH + image}
                width={200}
                height={logo ? 80 : 120}
              />
            )}
          </div>
          {error?.[fieldName]?.message ? (
            <span
              style={{
                fontSize: "1em",
                color: "red"
              }}
              className="my-3"
            >
              {error?.[fieldName]?.message}
            </span>
          ) : (
            <span
              style={{
                fontSize: "1em",
                color: "var(--text-color-secondary)"
              }}
              className="my-3"
            >
              {file ? file : t("dropcer")}
            </span>
          )}
        </div>
      ) : (
        <div className="flex align-items-center flex-column">
          <i
            className="pi pi-file-pdf mt-2 p-5"
            style={{
              fontSize: "3em",
              borderRadius: "50%",
              backgroundColor: "var(--surface-b)",
              color: "var(--surface-d)"
            }}
          ></i>
          {error?.[fieldName]?.message ? (
            <span
              style={{
                fontSize: "1em",
                color: "red"
              }}
              className="my-3"
            >
              {error?.[fieldName]?.message}
            </span>
          ) : (
            <span
              style={{
                fontSize: "1em",
                color: "var(--text-color-secondary)"
              }}
              className="my-3"
            >
              {file ? file : t("dropcer")}
            </span>
          )}
        </div>
      )}
      <div className="flex gap-2">
        <label className="w-full ">
          <div className="w-full p-3 bg-green-500 text-white  border-round-3xl cursor-pointer flex align-items-center justify-content-center gap-2">
            <i className="pi pi-upload" style={{ fontSize: "1rem" }} />
            {t("upload")}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/jpg,image/png,application/pdf"
            onChange={(e) => hendleimg(e)}
          />
        </label>
      </div>

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
            src={import.meta.env.VITE_APP_AWS_PATH + image}
          />
        </div>
      )}
    </div>
  );
}
