import { InputText } from "primereact/inputtext";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../../service/api.ts";
import { ControlError } from "../../ControlError/ControlError.tsx";
import { FormikProps } from "formik";
import { Skeleton } from "primereact/skeleton";

interface CustomMultiSelectProps {
  url: string;
  param: { id: string };
  optionLabel: string;
  optionValue: string;
  placeholder: string;
  optionsProp: any;
  isLoading: boolean;
  form: FormikProps<any>;
  field: FormikProps<any>;
  customFilter: () => FormikProps<any>;
}

export const CustomMultiSelect: React.FC<CustomMultiSelectProps> = (props) => {
  const {
    url,
    param,
    form,
    field,
    optionsProp,
    optionLabel = "name",
    placeholder,
    optionValue = "id",
    isLoading,
  } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [fetchDataOptions, setFetchData] = useState(optionsProp);
  let optionsList: any = [];
  useEffect(() => {
    optionsList = [];
  }, [param]);
  
  const onToggle = async () => {
    setLoading(true);
    if (optionsList.length === 0) {
      const { data } = await api.get(`/${url}`, {
        params: { ...param },
      });
      if (data.data.length) {
        const _data = [...optionsList, ...data!.data];
        optionsList = data.data;
        setFetchData(_data);
      }
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div className="w-full">
      {isLoading ? (
        <Skeleton width="100%" height="3rem" />
      ) : (
        <>
          <MultiSelect
            loading={loading}
            panelHeaderTemplate={() => (
              <div className="w-full">
                <span
                  className="p-input-icon-right w-full p-2"
                  style={{ width: "100%" }}
                >
                  <InputText
                    className="p-inputtext-sm h-full w-full"
                    type="text"
                    placeholder={t("search")}
                  />
                  <i className="pi pi-search" />
                </span>
              </div>
            )}
            value={field?.value}
            onChange={(e: MultiSelectChangeEvent) =>
              form.setFieldValue(field?.name, e.value)
            }
            options={fetchDataOptions || optionsProp}
            optionLabel={optionLabel}
            optionValue={optionValue}
            onShow={onToggle}
            filter
            placeholder={placeholder}
            maxSelectedLabels={3}
            selectionLimit={4}
            className="w-full"
          />
          <ControlError form={form} field={field} />
        </>
      )}
      {<Skeleton width="100%" height="" />}
    </div>
  );
};
