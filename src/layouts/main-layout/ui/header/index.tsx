import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

export default function Header() {
    return (
        <div className='flex align-items-center justify-content-between ' >
            <IconField className='w-full' iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText v-model="value1" placeholder="Search" />
            </IconField>

            <div className='flex align-items-center justify-content-between  gap-2'>

                <div className='p-2 pb-1 bg-white border-round-sm'>
                    <i className="pi pi-bell" style={{ fontSize: '1.2rem', color: 'gray' }}></i>
                </div>
                <div className='p-2 pb-1 bg-white border-round-sm'>
                    <i className="pi pi-user" style={{ fontSize: '1.2rem', color: 'gray' }}></i>
                </div >
            </div >
        </div >
    )
}
