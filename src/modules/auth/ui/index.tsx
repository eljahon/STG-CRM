import React from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function LoginFrom() {
    return (
        <div className="flex justify-content-center align-items-center " style={{ "height": '90vh' }}>
            <div className='bg-white p-8 pt-6 border-round-xs'>
                <div className='w-full flex justify-content-center'>
                    <img src='/Logo.png' width={150} />
                </div>
                <label className='block'>
                    <p>Username </p>
                    <InputText variant="success" id="username" type="text" />
                </label>
                <label className='block mb-4'>
                    <p>Password</p>
                    <InputText variant="success" id="password" type="password" />
                </label>
                <Button label="Login" className='w-full'></Button>
            </div>

        </div>
    )
}
