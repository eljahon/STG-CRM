import { useNavigate } from "react-router-dom";
import GolabTable from "../../ui/tabel";

const data = [{
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
]


export default function ProductPage() {
    const navigate = useNavigate()
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
    },
    {
        header: 'Name',
        field: 'name',
        id: 3,
        // sortable: true,
        exportable: false,
        // body: (itemData) => {
        //     console.log(itemData);
            
        // }
    }
    ]

    return (
        <>
            <GolabTable
                data={data} 
                columns={columns} 
                tableTile="title"
                url={'/product'}
                checked={(value) => {console.log(value);
                }}
                deleteFunction={(rowItem) => {console.log(rowItem)}}    
                newAdd={() => navigate('/product/new')}
            />
        </>
    )
}
