import { InputText } from "primereact/inputtext";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UsersGetDataTypes } from "../../../modules/users/types/user-types";

interface CustomMultiSelectProps {
  url: string;
}

export const CustomMultiSelect: React.FC<CustomMultiSelectProps> = (props) => {
  const { url } = props;
  const { t } = useTranslation();
  const [selectedCities, setSelectedCities] = useState<null>(null);
  const [fetchData, setFetchData] = useState<UsersGetDataTypes | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.stg-enterprise.com/api/v1/${url}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const data = await response.json();
      setFetchData(data);
    };
    fetchData();
  }, [url]);

  const fetchDataMap = fetchData?.data.map((item) => ({
    name: item?.full_name,
    id: item?.id,
  }));

  return (
    <div className="card flex justify-content-center">
      <MultiSelect
        panelHeaderTemplate={() => (
          <div className="my-2 w-full px-2">
            <span className="p-input-icon-right w-full">
              <InputText
                //   value={filters.search}
                //   onChange={handleInputChange}
                className="p-inputtext-sm h-full w-full"
                type="text"
                placeholder={t("search")}
              />
              <i className="pi pi-search" />
            </span>
          </div>
        )}
        value={selectedCities}
        onChange={(e: MultiSelectChangeEvent) =>
          e.value.length <= 4 && setSelectedCities(e.value)
        }
        options={fetchDataMap}
        optionLabel="name"
        filter
        placeholder="Select Users"
        maxSelectedLabels={3}
        selectionLimit={4}
        className="w-full md:w-20rem"
      />
    </div>
  );
};
