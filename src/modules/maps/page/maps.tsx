import {DynamicDataTable, RowDataType} from "../../../components/data-table";
import { useGetUsers } from "../service/query/useGetUsers";
import {Tag} from 'primereact/tag'
import React, {useCallback, useState} from "react";
import {useSearchParams} from "react-router-dom";
import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {ColumnProps} from "primereact/column";
import {debounce} from "lodash";
import {userRoleList} from "../../../constants";
import {Dropdown} from "primereact/dropdown";

export interface UsersColumnTypes {
  field: string;
  header: string;
  selectionMode?: string | undefined;
  headerStyle: object,
  body?: (items:RowDataType) => React.JSX.Element
}
export interface IPARAM {
  key:string, value: string,method:string
}
export const Maps = () => {
  const {t} = useTranslation()
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState<{ limit: number; page: number, search:string }>({
    limit: 10,
    page: params.get('page') ? Number(params.get('page')) : 1,
    search: params.get('search')|| ''
  });
  const [filters,setFilters] = useState<{search: string|undefined, role_id: string|undefined}>({search:params?.get('search') ? '' + params?.get('search') : undefined, role_id: params?.get('role_id') ? ""+params.get('role_id') : undefined
} )
  const { data, isLoading } = useGetUsers(filter);

  const UsersColumns: ColumnProps[] = [
    { field: "full_name", header: t('fullName') ,headerStyle:{ width: "3rem" }},
    { field: "phone", header: t('phone') ,headerStyle:{ width: "3rem" },body: (item) => {
        return <span className='text-primary'>{item?.phone}</span>
      }},
    { field: "role.name", header: t('role') ,headerStyle:{ width: "2rem" }, body: (item) => {

      return <span className='text-primary'>{item?.role?.name}</span>
      }},
    { field: "status", header: t('status') ,headerStyle:{ width: "3rem" }, body: (item) => {
        return (item.status === 'active') ? <Tag className="mr-2" icon="pi pi-check" severity="success" value={t(`${item.status}`)}/> :<Tag className="mr-2" icon="pi pi-times" severity="warning" value={t(item.status)}></Tag>
      }},
  ];
   const routerPush =(param:IPARAM) => {
     const {key, value, method} = param
     const newParams = new URLSearchParams(params)
     if(method === 'add') newParams.set(key, ''+value)
     if(method === 'del') newParams.delete(key)
     setParams(newParams)
   }
  const editUsers = (userData:RowDataType) => {
    console.log(userData.id);
  };

  const deleteUsers = (userData:RowDataType) => {
    console.log(userData);
  };
  const onPage = (pages:{first:number, page: number}) => {
    const {page} = pages;
    setFilter(old => ({...old, page:page+1}))
    routerPush({key: 'page', value: ''+(page+1), method: 'add'})
  }

  const handleSearch = useCallback(
      debounce((query) => {
        routerPush({key: 'search', value: query? query : undefined, method: query ?  'add' : 'del'})
        setFilter(old => ({...old, search: query ? query : undefined}))
      }, 1500),
      []
  );
  const handleRoleChange =(query:any) => {
    const {value} = query
    routerPush({key: 'search', value: value ? value : undefined, method: value ? 'add' : 'del'})
    setFilters(old => ({...old, role_id: value ? value : undefined}))
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFilters(old => ({...old, search: e.target.value}));
    handleSearch(e.target.value);
  };

  return (
    <div>
<TheBreadcrumb model={[{label: t('users'), template: () => <span className="text-primary">{t('users')}</span>}]}/>
      <div className='card mt-2'>
        <div className="flex justify-content-between mb-2">
          <div>
            <div className="col-12 mb-2 lg:col-8 lg:mb-0 flex gap-1">
              <Dropdown value={filters.role_id}  options={userRoleList} optionLabel="name"
                        optionValue="id"
                        onChange={handleRoleChange}
                        placeholder={t('role')} className="w-full  md:w-26rem p-inputtext-sm" />
              <span className="p-input-icon-right ">
                  <InputText value={filters.search} onChange={handleInputChange}  className="p-inputtext-sm h-full" type="text" placeholder="Search"/>
                  <i className="pi pi-search"/>
              </span>
            </div>
          </div>
          <div>
            <Button size="small" icon="pi pi-plus" severity='success' label={t('add')}/>
          </div>
        </div>
        <DynamicDataTable
            onEdit={editUsers}
            onDelete={deleteUsers}
            datas={data?.data}
            column={UsersColumns}
            onPage={onPage}
            loading={isLoading}
            first={(filter.page-1)*filter.limit}
            totalRecords={Number(data?.total?? 0)}
            rows={Math.ceil(filter.limit)}
      />
      </div>
    </div>
  );
};
