import { DynamicDataTable} from "../../../components/data-table.tsx";
import { Tag } from "primereact/tag";
import React, { useCallback, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ColumnProps } from "primereact/column";
import { debounce, get } from "lodash";
import { queryClient } from "../../../service/api.ts";
import { toast } from "react-toastify";
import { DataTableValue } from "primereact/datatable";
import { useFetchAll } from "../../../hooks/useFetchAll.ts";
import { useDeleteOne } from "../../../hooks/useDeleteOne.ts";

export interface UsersColumnTypes {
  field: string;
  header: string;
  selectionMode?: string | undefined;
  headerStyle: object;
  body?: (items: DataTableValue) => React.JSX.Element;
}
export interface IPARAM {
  key: string;
  value: string;
  method: string;
  isPage?: boolean;
}
export interface IFILTER {
  limit: number;
  page: number;
  search?: string;
  role_id?: string;
}
export const SalaryPlanInfoEmployees = () => {
  const navigator = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState<IFILTER>({
    limit: 10,
    page: params.get("page") ? Number(params.get("page")) : 1,
    search: params.get("search") || undefined,
    role_id: params.get("role_id") || undefined,
  });
  const [filters, setFilters] = useState<{
    search: string | undefined;
    role_id: string | undefined;
  }>({
    search: params?.get("search") ? "" + params?.get("search") : undefined,
    role_id: params?.get("role_id") ? "" + params.get("role_id") : undefined,
  });
  const { data, isLoading } = useFetchAll({url: `salary-plan/${id}/employees-salary`, key: 'user', params: filter});

  const imageBodyTemplate = (product: { logo: string }) => {
    return (
      <div>
        {product?.logo ? (
          <img
            src={`${product.logo}`}
            alt={product.logo}
            className="w-4rem h-3rem shadow-2 border-round"
          />
        ) : (
          <div className="w-4rem h-3rem shadow-2 border-round"></div>
        )}
      </div>
    );
  };

  const UsersColumns: ColumnProps[] = [
    // {
    //   field: "logo",
    //   header: t("logo"),
    //   headerStyle: { width: "3rem" },
    //   body: imageBodyTemplate,
    // },
    {
      field: "full_name",
      header: t("fullName"),
      headerStyle: { width: "3rem" },
      body: (item) => {
        return <span className="text-primary">{item?.employee?.full_name}</span>;
      },
    },
    // {
    //   field: "phone",
    //   header: t("phone"),
    //   headerStyle: { width: "3rem" },
    //   body: (item) => {
    //     return <span className="text-primary">{item?.phone}</span>;
    //   },
    // },
    {
      field: "salary",
      header: t("salary"),
      headerStyle: { width: "2rem" },
      body: (item) => {
        return <span className="text-primary">{Intl.NumberFormat().format(item?.salary)} {t('sum')}</span>;
      },
    },
    {
      field: "total_ride",
      header: t("total_ride"),
      headerStyle: { width: "3rem" },
      body: (item) => {
        return <span className="text-primary">{Intl.NumberFormat().format(item?.total_ride)} {t('sum')}</span>;
      },
    },
  ];
console.log(data, 'data');

  const routerPush = (param: IPARAM) => {
    const { key, value, method, isPage = false } = param;

    const newParams = new URLSearchParams(params);
    if (isPage) newParams.set("page", "1");
    if (method === "add") newParams.set(key, "" + value);
    if (method === "del") newParams.delete(key);
    setParams(newParams);
  };

  const onPage = (pages: { first: number; page: number }) => {
    const { page } = pages;
    setFilter((old) => ({ ...old, page: page + 1 }));
    routerPush({
      key: "page",
      value: "" + (page + 1),
      method: "add",
      isPage: true,
    });
  };

 
  return (
    <div>
      <div className="card mt-2">
        <DynamicDataTable
          datas={get(data,'employees_salary',[])}
          column={UsersColumns}
          onPage={onPage}
          loading={isLoading}
          first={(filter.page - 1) * filter.limit}
          totalRecords={Number(data?.total ?? 0)}
          rows={Math.ceil(filter.limit)}
          loadingDelete={isLoading}
        />
      </div>
    </div>
  );
};
