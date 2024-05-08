import React, { useState, useRef } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';

import { isFunction } from '../../type-check'

import { Dialog } from 'primereact/dialog';

import { MultiSelect } from 'primereact/multiselect';
import { useNavigate } from 'react-router-dom';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { DeleteData, DeleteDataId } from '../../service/global';
import { useQueryClient } from 'react-query';

interface Product {
    id: string | null;
    code: string;
    name: string;
    description: string;
    image: string | null;
    price: number;
    category: string | null;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

interface Column {
    title: string,
    dataIndex?: string,
    key?: string,
    ItemRender?: (el: Product, e: Column, index: number) => React.ReactNode,
    sort?: boolean,
}

interface ITable {
    data: Product[],
    columns: Column[] | [],
    deleteFunction: () => void,
    showFunction: () => void,
    checked: () => void,
    tableTile?: string,
    url?:string,
    deleteUrl?:string,
    newAdd: () => void,
    totalProduct:any,
    pageChange:() => void,
    currentPage:number,
}
export default function GolabTable(props: ITable) {
    const { data, columns, deleteFunction, showFunction, newAdd,url, deleteUrl,tableTile,totalProduct,currentPage,pageChange, checked } = props;
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const isCheckEvent = () => {

        return isFunction(deleteFunction) || isFunction(showFunction) || false
    }


    const [deleteId,setDeleteId] = useState(false)
    const [columnsList, setColumns] = useState([
        isFunction(checked) &&
        {
            id: 5678,
            selectionMode: 'multiple',
            exportable: false,

        },
        ...columns,
        isCheckEvent() && {
            id: columns.length + 1,
            // sortable: true,
            exportable: false,
            body: (itemData:any) => {
                return (
                    <React.Fragment >
                        <div className='flex'>
                        {  <Button icon="pi pi-pencil" rounded outlined className="mr-2 ml-auto h-2rem w-2rem" onClick={() =>navigate(url+'/'+itemData?.id)} />}
                        {isFunction(deleteFunction) && <Button icon="pi pi-trash" className='h-2rem w-2rem' rounded outlined severity="danger" onClick={() => {
                            setDeleteProductDialog(true)
                            setDeleteId(itemData?.id)
                            }} />}
                        </div>
                    </React.Fragment>

                );

            }
        }
    ])
    const [deleteProductDialog, setDeleteProductDialog] = useState<boolean>(false);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toasts = useRef<Toast>(null);
 

    const dt = useRef<DataTable<Product[]>>(null);


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between border-none">
            {tableTile && <h4 className="m-0 text-3xl">{tableTile}</h4>}
            <div className="flex flex-wrap gap-2  ">
                {isFunction(newAdd) && <Button className='border-round-3xl px-4' label="New" icon="pi pi-plus" severity="success" onClick={newAdd} />}
                {/* {isFunction(checked) && <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={() => setDeleteProductDialog(true)} disabled={!selectedProducts || !selectedProducts.length} />} */}
            </div>
        </div>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined   onClick={()=>setDeleteProductDialog(false)}  />
            <Button label="Yes" icon="pi pi-check" severity="danger"  onClick={async (e)=>{
                await DeleteDataId(deleteUrl,deleteId)
                .then(()=>{
                    toast.success("deleted")
                    setDeleteProductDialog(false)
                    queryClient.invalidateQueries([deleteUrl])
                })
                .catch(()=>toast.error('something want wrong'))
            }}  />
        </React.Fragment>
    );


 
    return (
        <div>
            <Toast ref={toasts} />
            <div className="card mt-4" >
                <DataTable 
                    ref={dt} 
                    value={data}
                    selection={selectedProducts} 
                    onSelectionChange={isFunction(checked) ? (e) => {
                        if (Array.isArray(e.value)) {
                            checked(e.value)
                            setSelectedProducts(e.value)
                        }
                    } : () => { }}
                    dataKey="id"  
                    globalFilter={globalFilter} 
                    header={header}
                    selectionMode="multiple"
                >
                    {columnsList?.map((e: any) => (
                        <Column key={e.id} {...e}></Column>
                    ))}
                    {/* <Column header="Agent" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                     filter filterElement={representativeFilterTemplate} /> */}

                </DataTable>
                <div className="card">
                    <Paginator first={currentPage} rows={10}  totalRecords={totalProduct} onPageChange={pageChange}/>
                </div>
            </div>

            <Dialog
                visible={deleteProductDialog} 
                style={{ width: '32rem' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                header="Confirm" 
                modal 
                footer={deleteProductDialogFooter}
                onHide={()=>setDeleteProductDialog(false)}
                
              >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {true && (
                        <span>
                            Are you sure you want to delete  this product
                        </span>
                    )}
                </div>
            </Dialog>

         
        </div>
    );
}