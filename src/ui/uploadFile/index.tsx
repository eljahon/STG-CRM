import { useEffect, useState } from "react";
import { ImageUpload } from "../../utils/uplaoadFile";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ProgressBar } from "primereact/progressbar";

export default function UploadFile({
  formik,
  fieldName,
  value,
  logo,
  error,
  className
}: any) {
  const [image, setImage] = useState<any>(value);
  const [aspectRatio, setaspectRatio] = useState<any>(1);
  const [imageOpen, setImageOpen] = useState<any>(false);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const [file, setfile] = useState<any>(false);
  const [progress, setProgress] = useState<any>(0);
  const { t } = useTranslation();
  useEffect(() => {
    setImage(value);
  }, [value]);

  const hendleimg = async (e: any) => {
    if (e.target.files[0] && e.target.files[0]?.size < 5000000) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = async () => {
          setaspectRatio((img.width / img.height).toFixed(2));
          setLoadingFile(true);
          formik.setErrors({});
          const res = await ImageUpload(
            file,
            {
              type: "image",
              folder: "other"
            },
            setProgress
          )
            .catch((err: any) => {
              toast.error(err?.response?.data?.error?.message);
            })
            .finally(() => setLoadingFile(false));
          setImage(res?.data?.media?.aws_path);
          formik.setFieldValue(fieldName, res?.data?.media?.id);
        };
        img.src = event.target.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      formik.setFieldError(fieldName, {
        type: "custom",
        message: "The image size must be less than 5 MB."
      });
      toast.error("The image size must be less than 5 MB.");
    }
  };
  const hendleRemoveimg = async () => {
    formik.setFieldValue(fieldName, 0);
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
            className={`w-full relative imageFlex ${
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
                onClick={() => setImageOpen(true)}
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
          </div>
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
      ) : (
        <div className="flex align-items-center flex-column">
          <i
            className="pi pi-image mt-2 p-5"
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
              {file ? file : t("dropImage")}
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
            accept="image/jpeg,image/jpg,image/png"
            className="hidden"
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
              maxHeight: "80%",
              objectFit: "contain",
              zIndex: "10001",
              aspectRatio: `${aspectRatio}/1`
            }}
            src={import.meta.env.VITE_APP_AWS_PATH + image}
          />
        </div>
      )}
    </div>
  );
}
