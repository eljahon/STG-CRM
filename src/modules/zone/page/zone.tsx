import { DynamicDataTable} from "../../../components/data-table";
import { Tag } from "primereact/tag";
import React, { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import GoogleMapIcon from '../../../assets/Map-Tashkent.png'
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ColumnProps } from "primereact/column";
import { debounce, get } from "lodash";
import {zoneType} from "../../../constants";
import { Dropdown } from "primereact/dropdown";
import { queryClient } from "../../../service/api.ts";
import { toast } from "react-toastify";
import {Dialog} from "primereact/dialog";
import {Image} from "primereact/image";
import {useDeleteOne} from "../../../hooks/useDeleteOne.ts";
import {useFetchAll} from "../../../hooks/useFetchAll.ts";
import { DataTableValue } from "primereact/datatable";
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
export const Zone = () => {
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
    const { data, isLoading } = useFetchAll({url: 'zone',key: 'zone',params:filter});
    const { mutate, isLoading: isLoadingDelete } = useDeleteOne({url:'zone'});
    const UsersColumns: ColumnProps[] = [
        {
            field: "image",
            header: t("image"),
            headerStyle: { width: "3rem" },
            body:() => {
                return <Image width="100px" height="50px" src={GoogleMapIcon} preview></Image>;
            }
        }, {
            field: "name",
            header: t("fullName"),
            headerStyle: { width: "3rem" },
        },
        {
            field: "type",
            header: t("type"),
            headerStyle: { width: "3rem" },
            body: (item) => {
                return <span className="text-primary">{item?.type}</span>;
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
    const editUsers = (userData: DataTableValue) => {
        navigator(`/zone/form/${userData.id}`);
    };

    const deleteUsers = () => {
        mutate(get(itemZone, 'id') as string, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["zone"] });
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
            <Button label="No" icon="pi pi-times" text onClick={()=> setDeleteProductDialog(false)} />
            <Button label="Yes" icon="pi pi-check" text onClick={() => deleteUsers()} />
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
                            <span className="text-primary">{t("zone")}</span>
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
                                options={zoneType}
                                optionLabel="name"
                                optionValue="id"
                                onChange={handleRoleChange}
                                placeholder={t("zone_type")}
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
                            onClick={() => navigator("/zone/form/new")}
                            size="small"
                            icon="pi pi-plus"
                            severity="success"
                            label={t("add")}
                        />
                    </div>
                </div>
                <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header={t('delete')} modal footer={deleteProductDialogFooter} onHide={() => setDeleteProductDialog(false)}>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {itemZone && (
                            <span>
                                    {t('you-want-to-delete')} {<b>{get(itemZone, 'name', '')}</b>}?
                                </span>
                        )}
                    </div>
                </Dialog>
                <DynamicDataTable
                    onEdit={editUsers}
                    onDelete={itemZoneDelete}
                    datas={data?.zones}
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
