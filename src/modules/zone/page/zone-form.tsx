import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import { useTranslation } from "react-i18next";
import { FormContainer } from "../../../components/Forms";
import { Field } from "formik";
import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {get} from "lodash";
import {StatudsSelect, CustomInputText, RoleSelect} from "../../../components/Forms/Fields";
import {zoneType} from "../../../constants";
import {GoogleMaps} from "../../../components/GoogleMaps/Google-Maps.tsx";
import {CustomMultiSelect} from "../../../components/Forms/Fields/Multi-Select.tsx";
import {useFetchOne} from "../../../hooks/useFetchOne.ts";
const operatorIds:{ekg: string, dump: string} ={
    ekg: 'f015278c-36aa-43bd-8c1a-e39dab42cf06',
    dump:'f015278c-36aa-43bd-8c1a-e39dab42cf07'

}
interface UsersByIdType {
    created_by: null;
    name: string;
    id: string;
    type: string;
    status: string;
}

export const ZoneForms = () => {
    const navigator = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>();
    const [latLng, setLatLng] = useState<{latitude: number, longitude: number}>();
    const { id } = useParams();

    const { data, isLoading } = useFetchOne({url: 'zone', id:id, key: 'zone'}) as UseQueryResult<
        UsersByIdType,
        unknown
    >;
    const createEmployeeSuccess = () => {
        navigator("/zone");
        {
            id === "new" && toast.success("Zone created successfully");
        }
    };
    const  onMarkerChange =(lat:number, lng:number) => {
        setLatLng({latitude: lat, longitude: lng})
    }

    return (
        <>
            <TheBreadcrumb
                model={[
                    {
                        template: () => (
                            <span className="text-primary">{t("zone")} {id === 'new' ? t('create') : t('update')}</span>
                        ),
                    },
                ]}
            />
            <div className='my-2'>{!isLoading&&<GoogleMaps markers={[{lat: get(data, 'location.latitude'), lng: get(data, 'location.longitude')}]} height={50} width={100} onMarkerChange={onMarkerChange}/>}</div>
            <div className="card mt-2 w-1/2">
                <div>
                    <FormContainer
                        onError={() => {
                            toast.error("Something went wrong");
                        }}
                        onSuccess={createEmployeeSuccess}
                        setLoader={setLoading}
                        url={"zone"}
                        customData={(values) => ({...values, location: latLng ?? get(data, 'location')})}
                        fields={[
                            {
                                name: "name",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'name')
                            },
                            {
                                name: "status",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'status'),
                            },
                            {
                                name: "type",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'type'),
                            },
                            {
                                name: "operators",
                                // validations: [{type: ""}],
                                validationType: "array",
                                value: get(data, 'operators')?.map(el => el.id)
                            },
                        ]}
                    >
                        {(formik) => {
                            console.log(formik)
                            return (
                                <>
                                    <div className="user_form__box">
                                        <div>
                                            <label htmlFor={"name"} className="block">
                                                {t("name")} :
                                            </label>
                                            <Field
                                                id={"name"}
                                                {...formik}
                                                component={CustomInputText}
                                                name="name"
                                                placeholder={t("name")}
                                            />
                                        </div>
                                        {/*<div>*/}
                                        {/*    <label htmlFor={"password"} className="block">*/}
                                        {/*        {t("password")} :*/}
                                        {/*    </label>*/}
                                        {/*    <Field*/}
                                        {/*        id={"password"}*/}
                                        {/*        {...formik}*/}
                                        {/*        component={CustomInputText}*/}
                                        {/*        name="password"*/}
                                        {/*        placeholder={t("password")}*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                        {/*<div>*/}
                                        {/*    <label htmlFor={"phone"} className="block">*/}
                                        {/*        {t("phone")} :*/}
                                        {/*    </label>*/}
                                        {/*    <Field*/}
                                        {/*        id={"phone"}*/}
                                        {/*        {...formik}*/}
                                        {/*        component={CustomInputText}*/}
                                        {/*        name="phone"*/}
                                        {/*        placeholder={t("phone")}*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                        <div>
                                            <label htmlFor={"status"} className="block">
                                                {t("status")} :
                                            </label>
                                            <Field
                                                id={"status"}
                                                {...formik}
                                                component={StatudsSelect}
                                                name="status"
                                                placeholder={t("status")}
                                                isLoading={isLoading}
                                            />
                                        </div>
                                        <div>
                                            <>
                                                <label htmlFor={"zone_type"} className="block">
                                                    {t("zone_type")} :
                                                </label>
                                                <Field
                                                    id={"zone_type"}
                                                    {...formik}
                                                    component={RoleSelect}
                                                    name="type"
                                                    options={zoneType}
                                                    placeholder={t("zone_type")}
                                                    isLoading={isLoading}
                                                />
                                            </>
                                        </div>
                                        {
                                            formik.values.type &&
                                            <div>
                                                <>
                                                    <label htmlFor={"operators"} className="block">
                                                        {t("operators")} :
                                                    </label>
                                                    <Field
                                                        id={"operators"}
                                                        {...formik}
                                                        component={CustomMultiSelect}
                                                        customFilter={() => formik.values}
                                                        name="operators"
                                                        url={'user'}
                                                        param={{role_id: operatorIds[formik.values.type], not_assigned_to_zone: true}}
                                                        optionLabel={'full_name'}
                                                        optionsProp={get(data, 'operators')?.map(el => ({id: el.id, full_name: el.full_name}))}
                                                        placeholder={t("operators")}
                                                        isLoading={isLoading}
                                                    />
                                                </>
                                            </div>
                                        }
                                        {/*<div>*/}
                                        {/*    <label htmlFor={"logo"} className="block">*/}
                                        {/*        {t("logo")} :*/}
                                        {/*    </label>*/}
                                        {/*    <Field*/}
                                        {/*        id={"logo"}*/}
                                        {/*        {...formik}*/}
                                        {/*        component={ImageUpload}*/}
                                        {/*        name="logo"*/}
                                        {/*        placeholder="logo"*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                    </div>
                                    <Button loading={loading} type="submit" label="submit"/>
                                </>
                            );
                        }}
                    </FormContainer>
                </div>
            </div>

        </>
    );
};
