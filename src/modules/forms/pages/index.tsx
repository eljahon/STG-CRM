
import React, { useState } from "react";
import {FormsRoute} from "../route.ts";
import {FormContainer} from "../../../components/Forms";
import { FastField,FieldArray,Field } from "formik";
import { InputText } from "primereact/inputtext";
import {Button} from "primereact/button";
import {useTranslation} from "react-i18next";

export default function ProductPage() {
    const {t} = useTranslation()
  return (
    <>
      <FormContainer
          url={'user'}
          method={'post'}
          isFormData={false}
          fields={[
            {
              "name": "identifier",
              "validations": [{ "type": "required" }],
            },
            {
              name: "password",
              validations: [{ type: "required" }],
            },
              {
                  name: 'friends',
                  validations: [{ type: "required" }],
                  validationType: "array",
                  validations: [],
                  value: ['']
              }
          ]}
          onSuccess={() =>{}}
          onError={()=> {}}
          onFinal={() => {}}
          customData={{}}
          onSubmit={() => {}}
          validateOnMount={false}
      >
        {(formik) => {
            console.log(formik)
          return <>
             <div className='mb-5'>
                 <InputText
                     id="identifier"
                     name="identifier"
                     value={formik.values.name}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     placeholder={t('identifier')}
                     invalid={formik.touched.identifier&&formik.errors.identifier}
                 />
             </div>
              <div className='mb-5'>
                  <InputText
                      id="password"
                      name="password"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder={t('password')}
                      invalid={formik.touched.password&&formik.errors.password}
                  />
              </div>
              <div>
                  <FieldArray
                      name="friends"
                      render={arrayHelpers => (
                          <div>
                              {formik.values.friends && formik.values.friends.length > 0 ? (
                                  formik.values.friends.map((friend, index) => (
                                      <div key={index}>
                                          <InputText
                                              id={`friends.${index}`}
                                              name={`friends.${index}`}
                                              value={friend}
                                              onChange={formik.handleChange}
                                              onBlur={formik.handleBlur}
                                              placeholder={t('identifier')}
                                              // invalid={formik.touched.identifier&&formik.errors.identifier}
                                          />
                                          {/*<Field name={`friends.${index}`} />*/}
                                          <button
                                              type="button"
                                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                          >
                                              -
                                          </button>
                                          <button
                                              type="button"
                                              onClick={() => arrayHelpers.push('')} // insert an empty string at a position
                                          >
                                              +
                                          </button>
                                      </div>
                                  ))
                              ) : (
                                  <button type="button" onClick={() => arrayHelpers.push('')}>
                                      {/* show this when user has removed all friends from the list */}
                                      Add a friend
                                  </button>
                              )}
                          </div>
                      )}
                  />
              </div>
              {/*<FastField*/}
              {/*    name="password"*/}
              {/*    component={InputText}*/}
              {/*/>*/}
              <Button type='submit'>
                  submit
              </Button>
          </>
        }

        }
      </FormContainer>
    </>
  );
}
