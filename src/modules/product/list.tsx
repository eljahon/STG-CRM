import { useNavigate } from "react-router-dom";
import GolabTable from "../../ui/tabel";
import { useQuery, useQueryClient } from "react-query";
import { GetAllData } from "../../service/global";
import { useState } from "react";




export default function ProductPage() {
    const navigate = useNavigate()
    const [page,setPage] = useState<Number>(0)
    const company = window.localStorage.getItem('company')
    const { data: product } = useQuery(["products",page], () => GetAllData("products/distribute", {limit:10,page:page / 10 +1}));
    const columns = [
        {
            header: 'Image',
            field: 'image.aws_path',
            id: 3,
            // sortable: true,
            exportable: false,
            body: (itemData) => {
                return <img  src={import.meta.env.VITE_APP_AWS_PATH + itemData?.image?.aws_path} width={50} height={50} />
                
            }
            // ItemRender: (itemData, itemcoulmns,index) => {}
        },
        {
        header: 'Title',
        field: 'title',
        id: 1,
        exportable: false,
        style:{ minWidth: '12rem' },
      
    
    },
    {
        header: 'Description',
        field: 'description',
        id: 2,
        exportable: false,
    },
    {
        header: 'Price',
        field: 'price',
        id: 4,
        exportable: false,
    },
    {
        header: 'Type',
        field: 'state.type',
        id: 4,
        exportable: false,
    },
    
    ]

    return (
        <>
            <GolabTable
                data={product?.data?.items} 
                columns={columns} 
                totalProduct={product?.data?.meta?.total}
                currentPage={page}
                tableTile="Products"
                url={'/product'}
                deleteUrl={'products'}
                checked={(value) => {console.log(value);
                }}
                pageChange={(event)=> {
                    setPage(event.first)
                }}
                deleteFunction={(rowItem) => {console.log(rowItem)}}    
                newAdd={() => {
                    if(company  && company !="undefined"){
                        navigate('/product/new')
                    } else{
                        navigate('/compony/new')
                    }
                  
                }}
            />
        </>
    )
}
