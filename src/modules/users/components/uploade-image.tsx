import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Upload } from "../../../service/upload";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
interface FileUploadProps {
  succsessImage: (url: string) => void;
  errorImage: (url: string) => void;
  editData?: any;
}

const UploadeImage: React.FC<FileUploadProps> = ({
  succsessImage,
  errorImage,
  editData,
}) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const { mutate, isLoading } = Upload();

  const handleFileChange = (event: { target: { files: File[] } }) => {
    try {
      setUploadLoading(true);
      const file = event.target.files[0];
      setSelectedFile(file);

      const formData = new FormData();
      if (file) {
        formData.append("file", file);

        mutate(formData, {
          onSuccess: (res) => {
            succsessImage(res.data.id);
          },
          onError: (res) => {
            errorImage(res.message);
          },
        });
      }

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
      setUploadLoading(false);
    } catch (error) {
      setUploadLoading(false);
      toast.add({
        type: "error",
      });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-column align-items-start">
      <Button
        loading={uploadLoading}
        icon={`pi pi-upload`}
        type="button"
        className="upload_btn"
        onClick={() => document.getElementById("file-input")?.click()}
      >
        {t("uploadLogo")}
      </Button>
      <input
        id="file-input"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <div>
          {isLoading ? (
            <Skeleton className="mt-2" width="300px" height="60px" />
          ) : (
            <div className="view_upload__img">
              <div className="flex align-items-center column-gap-2">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="selected_image shadow-2 border-round"
                  />
                )}
                <div>{selectedFile.name.slice(0, 10)}...</div>
              </div>

              <Button
                className="view_img__delete"
                rounded
                icon="pi pi-times-circle"
                severity="danger"
                onClick={handleRemoveFile}
              ></Button>
            </div>
          )}
        </div>
      )}

      {editData?.logo && !selectedFile && (
        <div className="mt-2">
          <img
            src={`http://91.107.222.142:9000/stg/${editData?.logo}`}
            alt="Preview"
            className="w-6rem h-5rem shadow-2 border-round"
          />
        </div>
      )}
    </div>
  );
};

export default UploadeImage;
