import { FormikProps } from "formik";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useRef, useState } from "react";
import api from "../../../service/api";

interface CustomMultiSelectProps {
  url: string;
  param?: { id: string };
  optionLabel?: string;
  optionValue?: string;
  placeholder?: string;
  optionsProp?: any;
  isLoading?: boolean;
  form?: FormikProps<any>;
  field?: FormikProps<any>;
}

export const LazySelect: React.FC<CustomMultiSelectProps> = (props) => {
  const { url } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const loadLazyTimeout = useRef();
  const [optionData, setOptionData] = useState([]);
  const param = { page: 1, limit: 10 };
  console.log(optionData);
  let optionsList: any = [];
  useEffect(() => {
    optionsList = [];
  }, [param]);

  const toggleShow = async () => {
    try {
      const { data } = await api.get(`/${url}`, { params: { ...param } });
      console.log(data);
      if (data.data.length) {
        const _data:any = [...optionsList, ...data!.data];
        optionsList = data.data;
        setOptionData(_data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLazyLoad = () => {
    setLoading(true);

    if (loadLazyTimeout.current) {
      clearTimeout(loadLazyTimeout.current);
    }

    //imitate delay of a backend call
  }

  return (
    <Dropdown
      value={selectedItem}
      onChange={(e) => setSelectedItem(e.value)}
      options={optionData}
      placeholder="Select Item"
      onShow={toggleShow}
      className="w-full md:w-14rem"
      virtualScrollerOptions={{
        lazy: true,
        onLazyLoad: onLazyLoad,
        itemSize: 38,
        showLoader: true,
        loading: loading,
        delay: 250,
      }}
    />
  );
};
