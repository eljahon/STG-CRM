import { useEffect, useState } from "react";
import { ImageUpload } from "../../utils/uplaoadFile";

export default function UploadFileSer({
  setValue,
  fieldName,
  value,
  logo,
  className
}: any) {
  const [image, setImage] = useState<any>(value);
  const [file, setfile] = useState<any>(false);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);

  useEffect(() => {
    setImage(value);
  }, [value]);

  const hendleimg = async (e: any) => {
    setLoadingFile(true);
    if (e.target.files[0]) {
      const res = await ImageUpload(e.target.files[0], {
        type: e.target.files[0].type == "application/pdf" ? "pdf" : "image",
        folder: "other"
      }).finally(() => setLoadingFile(false));

      if (e.target.files[0].type == "application/pdf") {
        setfile(e.target.files[0].name);
      } else {
        setfile(false);
      }
      setValue(fieldName, res?.data?.media?.id);
      setImage(res?.data?.media?.aws_path);
    }
  };

  const hendleRemoveimg = async () => {
    setValue(fieldName, null);
    setImage(null);
  };

  return (
    <div className={`w-full ${className && className}`}>
      {loadingFile ? (
        <div>loading</div>
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
                  if (file) {
                    window.open(
                      import.meta.env.VITE_APP_AWS_PATH + image,
                      "_blank"
                    );
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
            {file ? (
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
                  objectFit: "cover"
                }}
                src={import.meta.env.VITE_APP_AWS_PATH + image}
                width={200}
                height={logo ? 80 : 120}
              />
            )}
          </div>
          <span
            style={{
              fontSize: "1em",
              color: "var(--text-color-secondary)"
            }}
            className="my-3"
          >
            {file ? file : "Drag and Drop certificete Here"}
          </span>
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
          <span
            style={{
              fontSize: "1em",
              color: "var(--text-color-secondary)"
            }}
            className="my-3"
          >
            Drag and Drop certificete Here
          </span>
        </div>
      )}
      <div className="flex gap-2">
        <label className="w-full ">
          <div className="w-full p-3 bg-green-500 text-white  border-round-3xl cursor-pointer flex align-items-center justify-content-center gap-2">
            <i className="pi pi-upload" style={{ fontSize: "1rem" }} />
            upload
          </div>
          <input
            type="file"
            className="hidden"
            accept=".png, .jpg, .jpeg .pdf"
            onChange={(e) => hendleimg(e)}
          />
        </label>
      </div>
    </div>
  );
}
