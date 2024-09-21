import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Upload } from "../../../service/upload.ts";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import {Image} from "primereact/image";
import {FormikProps, FieldInputProps} from "formik";
interface FileUploadProps {
 form: FormikProps<any>,
  field: FieldInputProps<any>
}

export const UploadeImage: React.FC<FileUploadProps> = ({
    form, field
}) => {
  const { t } = useTranslation();
  const [uploadLoading, setUploadLoading] = useState(false);

  const { mutate, isLoading } = Upload();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadLoading(true);
      const file = event.target.files;
      const formData = new FormData();
      if (file) {
        formData.append("file", file[0]);
        mutate(formData, {
          onSuccess: (res) => {
            form.setFieldValue(field?.name, res.data.id)
          },
          onError: () => {
            form.setFieldValue(field?.name, '')
          },
        });
      }
      setUploadLoading(false);
    } catch (error) {
      setUploadLoading(false);
      // toast.add({type: "error",});
    }
  };

  const handleRemoveFile = () => {
    form.setFieldValue(field?.name, '')
    // setSelectedFile(null);
    // setPreview(null);
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
        <div>
          {isLoading ? (
            <Skeleton className="mt-2" width="300px" height="60px" />
          ) : (

                field?.value && <div className="view_upload__img">
                  <div className="flex align-items-center column-gap-2">
                    <Image
                        width={'80px'}
                        height={'60px'}
                        src={`http://91.107.222.142:9000/stg/${field?.value}`}
                        preview
                        alt="Preview"
                        className="selected_image shadow-2 border-round"
                    />
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
    </div>
  );
};
