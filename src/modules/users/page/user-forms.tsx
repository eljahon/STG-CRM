import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import {useTranslation} from "react-i18next";
import {InputText} from "primereact/inputtext";
import {FormContainer} from "../../../components/Forms";
import {FastField, Field, Form} from "formik";
import {Button} from "primereact/button";
import React, {useState} from "react";
import {ControlError} from "../../../components/ControlError/ControlError.tsx";
import {Dropdown} from "primereact/dropdown";
import {userRoleList} from "../../../constants";
import {useNavigate} from "react-router-dom";

export const UserForms = () => {
    const navigator = useNavigate()
    const {t} = useTranslation()
    const [loading, setLoading] = useState<boolean>()
    const InputCompoente = (props) => {
        const {form,field, placeholder}= props;
        console.log(form,field)
        const handleChange = (option:React.ChangeEvent<HTMLInputElement>) => {
            console.log(option)
            form?.setFieldValue(field?.name, option.target.value);
        };
        return<>
            <InputText className='p-inputtext-sm w-full' placeholder={placeholder} invalid={form.errors[field.name]} onChange={handleChange} name={field?.name} value={field?.value}/>
            <ControlError form={form} field={field}/>
        </>
    }
    const InputSelect =(props) => {
        const {form, field, placeholder} = props
        const handleOnChage =(event:React.ChangeEvent<HTMLInputElement>)=> {
            console.log(event.target.value)
            form.setFieldValue(field?.name, event.target.value)
        }
        return<>
            <Dropdown className='p-inputtext-sm w-full' value={field?.value} placeholder={placeholder}  onChange={handleOnChage} options={userRoleList} optionLabel={'name'} optionValue={'id'}/>
            <ControlError form={form} field={field}/>
        </>
    }
    return <>
        <TheBreadcrumb model={[{template: () => <span className='text-primary'>{t('employees-create')}</span>}]}/>
        <div className='card mt-2'>
          <FormContainer
              onError={() => {}}
              onSuccess={() => navigator('/employees')}
              setLoader={setLoading}
              url={'user'}
              fields={[
                  {
                  name: 'full_name',
                  validations: [{type: "required"}],
                  validationType: "string"
              },
                  {
                      name: 'password',
                      validations: [{type: "required"}],
                      validationType: "string"
                  },
                  {
                      name: 'phone',
                      validations: [{type: "phone"}],
                      validationType: "string"
                  },
                  {
                      name: 'status',
                      validations: [{type: "required"}],
                      validationType: "string"
                  },
                  {
                      name: 'role_id',
                      validations: [{type: "required"}],
                      validationType: "string"
                  },
                  {
                      name: 'logo',
                      validations: [{type: 'required'}],
                      validationType: 'string'
                  }
              ]}
          >
              {(formik) => {
                  console.log(formik)
                  return (
                      <>

                          <div className='grid grid-cols-12 gap-5 mb-4'>
                              <div>
                                  <label htmlFor={'full_name'} className='block'>{t('full_name')}</label>
                                  <Field id={'full_name'} {...formik} component={InputCompoente}
                                         name='full_name' placeholder='first_name'/>
                              </div>
                              <div>
                                  <label htmlFor={'password'} className='block'>{t('password')}</label>
                                  <Field id={'password'} {...formik} component={InputCompoente}
                                         name='password' placeholder='password'/>
                              </div>
                              <div>
                                  <label htmlFor={'phone'} className='block'>{t('phone')}</label>
                                  <Field id={'phone'} {...formik} component={InputCompoente}

                                         name='phone' placeholder='phone'/>
                              </div>
                              <div>
                                  <label htmlFor={'status'} className='block'>{t('status')}</label>
                                  <Field id={'status'} {...formik} component={InputCompoente}

                                         name='status' placeholder='status'/>
                              </div>
                              <div>
                                  <label htmlFor={'role_id'} className='block'>{t('role_id')}</label>
                                  <Field id={'role_id'} {...formik} component={InputSelect}

                                         name='role_id' placeholder='role_id'/>
                              </div>
                              <div>
                                  <label htmlFor={'logo'} className='block'>{t('logo')}</label>
                                  <Field id={'logo'} {...formik} component={InputCompoente}

                                         name='logo' placeholder='logo'/>
                              </div>
                          </div>
                          <Button loading={loading} type='submit' label='submit'/>
                      </>
                  )
              }}

          </FormContainer>
        </div>
    </>
}