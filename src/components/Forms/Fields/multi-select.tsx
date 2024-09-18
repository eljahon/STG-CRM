import { InputText } from "primereact/inputtext";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UsersGetDataTypes } from "../../../modules/users/types/user-types";
import { debounce, set } from "lodash";
// import { useSearchParams } from "react-router-dom";
// import { IPARAM } from "../../../modules/users/page/users";

interface CustomMultiSelectProps {
  url: string;
}

export const CustomMultiSelect: React.FC<CustomMultiSelectProps> = (props) => {
  const { url } = props;
  const { t } = useTranslation();
  const [selectedEmployees, setSelectedEmployees] = useState<null>(null);
  const [fetchData, setFetchData] = useState<UsersGetDataTypes | null>(null);
  const [search, setSearch] = useState("");
  //   const [params, setParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.stg-enterprise.com/api/v1/${url}?search=${search}&limit=5`,
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
  }, [url, search]);

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-inputtext-sm h-full w-full"
                type="text"
                placeholder={t("search")}
              />
              <i className="pi pi-search" />
            </span>
          </div>
        )}
        value={selectedEmployees}
        onChange={(e: MultiSelectChangeEvent) =>
          e.value.length <= 4 && setSelectedEmployees(e.value)
        }
        options={fetchDataMap}
        optionLabel="name"
        filter
        placeholder="Select Users"
        maxSelectedLabels={3}
        className="w-full md:w-20rem"
      />
    </div>
  );
};
