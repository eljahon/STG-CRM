import { DynamicDataTable} from "../../../components/data-table.tsx";
import { Tag } from "primereact/tag";
import React, { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ColumnProps } from "primereact/column";
import { debounce, get } from "lodash";
import {statusList} from "../../../constants/index.ts";
import { Dropdown } from "primereact/dropdown";
import { queryClient } from "../../../service/api.ts";
import { toast } from "react-toastify";
import {Dialog} from "primereact/dialog";
import {useDeleteOne} from "../../../hooks/useDeleteOne.ts";
import {useFetchAll} from "../../../hooks/useFetchAll.ts";
import { DataTableValue } from "primereact/datatable";
import dayjs from "dayjs";
export interface IPARAM {
    key: string;
    value?: string;
    method: string;
    isPage?: boolean;
}

export interface IFILTERZONE {
    limit: number;
    page: number;
    search?: string;
    type?: string;
}
export const SalaryPlan = () => {
    const navigator = useNavigate();
    const { t } = useTranslation();
    const [params, setParams] = useSearchParams();
    const [itemZone, setItemZone] = useState<DataTableValue>()
    const [filter, setFilter] = useState<IFILTERZONE>({
        limit: 10,
        page: params.get("page") ? Number(params.get("page")) : 1,
        search: params.get("search") || undefined,
        type: params.get("type") || undefined,
    });
    const [deleteProductDialog, setDeleteProductDialog] = useState(false)
    const [filters, setFilters] = useState<{
        search?: string ;
        type?: string;
    }>({
        search: params?.get("search") ? "" + params?.get("search") : undefined,
        type: params?.get("type") ?? undefined,
    });
    const { data, isLoading } = useFetchAll({url: 'salary-plan',key: 'salary-plan',params:filter});
    const { mutate, isLoading: isLoadingDelete } = useDeleteOne({url:'salary-plan'});
    const UsersColumns: ColumnProps[] = [
     {
            field: "name",
            header: t("fullName"),
            headerStyle: { width: "3rem" },
        },
        {
            field: "month",
            header: t("month"),
            headerStyle: { width: "3rem" },
            body: (item) => {
                return <span className="text-primary">{dayjs(item?.month).format('YYYY-MM')}</span>;
            },
        },
        {
            field: "total_salary",
            header: t("total_salary"),
            headerStyle: { width: "3rem" },
            body: (item) => {
                return <span className="text-primary">{item?.total_salary}</span>;
            },
        },
        {
            field: "status",
            header: t("status"),
            headerStyle: { width: "3rem" },
            body: (item) => {
                return item.status === "active" ? (
                    <Tag
                        className="mr-2"
                        icon="pi pi-check"
                        severity="success"
                        value={t(`${item.status}`)}
                    />
                ) : (
                    <Tag
                        className="mr-2"
                        icon="pi pi-times"
                        severity="warning"
                        value={t(item.status)}
                    ></Tag>
                );
            },
        },
    ];
    const routerPush = (param: IPARAM) => {
        const { key, value, method, isPage = false } = param;
        const newParams = new URLSearchParams(params);
        if (isPage) newParams.set("page", "1");
        if (method === "add") newParams.set(key, "" + value);
        if (method === "del") newParams.delete(key);
        setParams(newParams);
    };

    const deleteUsers = () => {
        mutate(get(itemZone, 'id') as string, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["salary-plan"] });
                toast.success(t("salary_plan")+" "+t("successfully")+ " "+t("deleted"));
                setDeleteProductDialog(false)
            },
            onError: (res) => {
                console.log(res);
                toast.error("Something went wrong");
                setDeleteProductDialog(false)
            },
        });
    };
    const deleteProductDialogFooter = (
        <>
            <Button label={t("No")} icon="pi pi-times" text onClick={()=> setDeleteProductDialog(false)} />
            <Button label={t("Yes")} icon="pi pi-check" text onClick={() => deleteUsers()} />
        </>
    );
    const itemZoneDelete = (item: DataTableValue) => {
        setItemZone(item)
        setDeleteProductDialog(true)
    }
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
    const handleSearch = useCallback(
        debounce((query) => {
            routerPush({
                key: "search",
                value: query ? query : undefined,
                method: query ? "add" : "del",
                isPage: true,
            });
            setFilter((old) => ({ ...old, search: query ? query : undefined }));
        }, 1500),
        []
    );
    const handleRoleChange = (query: never) => {
        const { value } = query;
        routerPush({
            key: "type",
            value: value ? value : undefined,
            method: value ? "add" : "del",
            isPage: true,
        });
        setFilters((old) => ({ ...old, type: value ? value : undefined }));
        setFilter((old) => ({ ...old, type: value ?? undefined }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((old) => ({ ...old, search: e.target.value }));
        handleSearch(e.target.value);
    };
    return (
        <div>
            <TheBreadcrumb
                model={[
                    {
                        label: t("employees"),
                        template: () => (
                            <span className="text-primary">{t("salary_plan")}</span>
                        ),
                    },
                ]}
            />
            <div className="card mt-2">
                <div className="flex justify-content-between mb-2">
                    <div>
                        <div className="col-12 mb-2 lg:col-8 lg:mb-0 flex gap-1">
                            <Dropdown
                                showClear
                                value={filters.type}
                                options={statusList}
                                optionLabel="name"
                                optionValue="id"
                                onChange={handleRoleChange}
                                placeholder={t("status")}
                                className="w-full  md:w-26rem p-inputtext-sm"
                            />
                            <span className="p-input-icon-right ">
                <InputText
                    value={filters.search}
                    onChange={handleInputChange}
                    className="p-inputtext-sm h-full"
                    type="text"
                    placeholder={t("search")}
                />
                <i className="pi pi-search" />
              </span>
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={() => navigator("/salary-plan/form/new")}
                            size="small"
                            icon="pi pi-plus"
                            severity="success"
                            label={t("salary_plan_add")}
                        />
                    </div>
                </div>
                <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header={<div className="text-red-500">{t("delete")}</div>} modal footer={deleteProductDialogFooter} onHide={() => setDeleteProductDialog(false)}>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {itemZone && (
                            <span>
                                    <span className="text-primary">{t('you-want-to-delete')}</span> {<b>{get(itemZone, 'name', '')}</b>}?
                                </span>
                        )}
                    </div>
                </Dialog>
                <DynamicDataTable
                    onEdit={(item: DataTableValue) => navigator(`/salary-plan/form/${item.id}`)}
                    onView={(item: DataTableValue) => navigator(`/salary-plan/info/${item.id}`)}
                    onDelete={itemZoneDelete}
                    datas={get(data, 'salary_plans', [])}
                    column={UsersColumns}
                    onPage={onPage}
                    loading={isLoading}
                    first={(filter.page - 1) * filter.limit}
                    totalRecords={Number(data?.total ?? 0)}
                    rows={Math.ceil(filter.limit)}
                    loadingDelete={isLoadingDelete}
                />
            </div>
        </div>
    );
};
