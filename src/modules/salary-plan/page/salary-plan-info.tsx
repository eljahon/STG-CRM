import { DynamicDataTable} from "../../../components/data-table.tsx";
import React, { useCallback, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { debounce, get } from "lodash";
import { queryClient } from "../../../service/api.ts";
import { toast } from "react-toastify";
import {Dialog} from "primereact/dialog";
import {useDeleteOne} from "../../../hooks/useDeleteOne.ts";
import {useFetchAll} from "../../../hooks/useFetchAll.ts";
import { DataTableValue } from "primereact/datatable";
import dayjs from "dayjs";
import { SalaryPlanInfoEmployees } from "./salar-plan-info-employees.tsx";
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
export const SalaryPlanInfo = () => {
    const navigator = useNavigate();
    const { t } = useTranslation();
    const {id} = useParams();
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
    const { data, isLoading } = useFetchAll({url: `salary-plan/${id}`,key: 'salary-plan-info',params:filter});
    const { mutate, isLoading: isLoadingDelete } = useDeleteOne({url:`salary-plan`,subUrl:`detail/${itemZone?.id}`});
    const UsersColumns: ColumnProps[] = [
         {
            field: "date",
            header: t("create_date"),
            headerStyle: { width: "3rem" },
            body: (item) => <span className='text-primary'>{dayjs(item?.created_at).format('YYYY-MM-DD')}</span>
        },

        {
            field: "price_per_ride",
            header: t("price_per_ride"),
            headerStyle: { minWidth: "7rem" },
            body:(item) => <span><b className="text-primary">{item?.price_per_ride ?? '-'}</b> {t('sum')} </span>
        },
        {
            field: "ekg_zone",
            header: t("ekg_zone"),
            headerStyle: { width: "15rem" },
            body:(item) => <span className='text-primary'>{get(item, 'ekg_zone.name') ?? '-'}</span>
        },
        {
            field: "dump_zone",
            header: t("dump_zone"),
            headerStyle: { width: "15rem" },
            body:(item) => <span className='text-primary'>{get(item, 'dump_zone.name') ?? '-'}</span>
        }

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
        mutate(id as string, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["salary-plan-info"] });
                toast.success("zone deleted successfully");
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
            <Button label={t('No')} icon="pi pi-times" text onClick={()=> setDeleteProductDialog(false)} />
            <Button label={t('Yes')} icon="pi pi-check" text onClick={() => deleteUsers()} />
        </>
    );
    
    
    const itemZoneDelete = (item: DataTableValue) => {
        console.log(item, 'item');
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
                            <Link to={`/salary-plan`}>{t("salary_plan_add")}</Link>
                        ),
                    },
                    {
                        label: t("detail"),
                        template: () => (
                            <span className="text-primary">{t("detail")}</span>
                        ),
                    },
                ]}
            />
            <div className="card mt-2">
                <div className="flex justify-content-end mb-2">
                    {/* <div>
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
                    </div> */}
                    <div>
                        <Button
                            onClick={() => navigator(`/salary-plan/info-form/new?salary_plan_id=${id}`)}
                            size="small"
                            icon="pi pi-plus"
                            severity="success"
                            label={t("salary_plan_add")}
                        />
                    </div>
                </div>
                <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header={<span className="text-red-500">{t('delete')}</span>} modal footer={deleteProductDialogFooter} onHide={() => setDeleteProductDialog(false)}>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3 text-red-500" style={{ fontSize: '2rem' }} />
                        {itemZone && (
                            <span>
                                    <span className="text-primary">{t('you-want-to-delete')}</span> {<b>{get(itemZone, 'name', '')}</b>}?
                                </span>
                        )}
                    </div>
                </Dialog>
                <DynamicDataTable
                    onEdit={(item: DataTableValue) => navigator(`/salary-plan/info-form/${id}?salary_plan_id=${item.id}`)}
                    onDelete={itemZoneDelete}
                    datas={get(data, 'salary_plan_details', [])}
                    column={UsersColumns}
                    loading={isLoading}
                    first={(filter.page - 1) * filter.limit}
                    totalRecords={Number(data?.total ?? 0)}
                    rows={Math.ceil(filter.limit)}
                    loadingDelete={isLoadingDelete}
                />
            </div>
           <div>
            <SalaryPlanInfoEmployees/>
           </div>
        </div>
    );
};
