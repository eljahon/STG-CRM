import React from "react";
import ProductsDemo from "../ui/index";
import { Button } from 'primereact/button';


import Table from '../../../ui/tabel'


const data = [{
    id: "dsds",
    code: 'ds',
    name: 'dsds',
    image: "null",
    description: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK',
},


{
    id: "dsfsf",
    code: 'ds',
    name: 'dsds',
    image: "null",
    description: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK',
}]


export default function CrudPage() {

    const editFunction = (rowData) => {
        console.log(rowData)
    }
    const deleteFunction  =(rowData) => {
        console.log(rowData)
    }

    const columns = [
   
        {
        header: 'Code',
        field: 'code',
        id: 1,
        // sortable: true,
        exportable: false,
        style:{ minWidth: '12rem' },
        // body: (itemData) => {
        //     console.log(itemData);
            
        // }
        // style
    
        // sort
    
        // ItemRender: (itemData, itemcoulmns,index) => {}
    },
    {
        header: 'Name',
        field: 'name',
        id: 2,
        // sortable: true,
        exportable: false,
        // body: (itemData) => {
        //     console.log(itemData);
            
        // }
    
    
        // style
    
        // sort
    }
    ]

    return (
        <>
            <Table 
            data={data} 
            columns={columns} 
            editFunction={(rowItem) => {console.log(rowItem);
            }} 
            
            checked={(value) => {console.log(value);
            }}
            deleteFunction={(rowItem) => {console.log(rowItem)}}    
            newAdd={() => {}}/>
        </>
    )
}
