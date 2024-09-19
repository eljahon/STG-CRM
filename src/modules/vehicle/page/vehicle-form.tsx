import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import { useTranslation } from "react-i18next";
import { FormContainer } from "../../../components/Forms";
import { Field } from "formik";
import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import {get} from "lodash";
import {StatudsSelect, CustomInputText, RoleSelect, UploadeImage} from "../../../components/Forms/Fields";
import {zoneType} from "../../../constants"
import {CustomMultiSelect} from "../../../components/Forms/Fields/Multi-Select.tsx";
import {useFetchOne} from "../../../hooks/useFetchOne.ts";
const operatorIds:{akg: string, dump: string} ={
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

export const VehicleForm = () => {
    const navigator = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>();
    const [latLng, setLatLng] = useState<{latitude: number, longitude: number}>();
    const { id } = useParams();

    const { data, isLoading } = useFetchOne({url: 'vehicle',id, key: 'vehicle'}) as UseQueryResult<
        UsersByIdType,
        unknown
    >;


    const ImageUpload = (props) => {
        const { form, field } = props;
        const succsessUpload = (url: string) => {
            form.setFieldValue(field?.name, url);
        };

        return (
            <>
                {isLoading ? (
                    <Skeleton width="100%" height="3rem" />
                ) : (
                    <>
                        <UploadeImage
                            editData={data}
                            succsessImage={succsessUpload}
                            errorImage={toast.error}
                        />
                    </>
                )}
            </>
        );
    };

    const createEmployeeSuccess = () => {
        navigator("/vehicle");
        {
            id === "new" && toast.success("Zone created successfully");
        }
    };
    const  onMarkerChange =(lat, lng) => {
        console.log(lat, lng)
        setLatLng({latitude: lat, longitude: lng})
    }

    return (
        <>
            <TheBreadcrumb
                model={[
                    {
                        template: () => (
                            <span className="text-primary">{t("car")} {id === 'new' ? t('create') :t('update')}</span>
                        ),
                    },
                ]}
            />
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
                                name: "drivers",
                                // validations: [{type: "required"}],
                                validationType: "array",
                                value: get(data, 'drivers')?.map(el => el.id)
                            },
                            {
                                name: "status",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'status'),
                            },
                            {
                                name: "model",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'model'),
                            },
                            {
                                name: "dump_zone",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'dump_zone'),
                            },
                            {
                                name: "number",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'number'),
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
                                            <>
                                                <label htmlFor={"drivers"} className="block">
                                                    {t("drivers")} :
                                                </label>
                                                <Field
                                                    id={"drivers"}
                                                    {...formik}
                                                    component={CustomMultiSelect}
                                                    customFilter={() => formik.values}
                                                    name="drivers"
                                                    url={'user'}
                                                    param={{
                                                        role_id: 'f015278c-36aa-43bd-8c1a-e39dab42cf04',
                                                        not_assigned_to_vehicle: true
                                                    }}
                                                    optionLabel={'full_name'}
                                                    optionsProp={get(data, 'drivers')}
                                                    placeholder={t("operators")}
                                                    isLoading={isLoading}
                                                />
                                            </>
                                        </div>
                                        <div>
                                            <label htmlFor={"model"} className="block">
                                                {t("model")} :
                                            </label>
                                            <Field
                                                id={"model"}
                                                {...formik}
                                                component={CustomInputText}
                                                name="model"
                                                placeholder={t("model")}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={"number"} className="block">
                                                {t("number")} :
                                            </label>
                                            <Field
                                                id={"number"}
                                                {...formik}
                                                component={CustomInputText}
                                                name="number"
                                                placeholder={t("number")}
                                            />
                                        </div>

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
                                        {/*<div>*/}
                                        {/*    <>*/}
                                        {/*        <label htmlFor={"operators"} className="block">*/}
                                        {/*            {t("operators")} :*/}
                                        {/*        </label>*/}
                                        {/*        <Field*/}
                                        {/*            id={"operators"}*/}
                                        {/*            {...formik}*/}
                                        {/*            component={CustomMultiSelect}*/}
                                        {/*            customFilter={() => formik.values}*/}
                                        {/*            name="operators"*/}
                                        {/*            url={'user'}*/}
                                        {/*            param={{*/}
                                        {/*                role_id: operatorIds[formik.values.type],*/}
                                        {/*                not_assigned_to_zone: true*/}
                                        {/*            }}*/}
                                        {/*            optionLabel={'full_name'}*/}
                                        {/*            optionsProp={get(data, 'operators')?.map(el => ({*/}
                                        {/*                id: el.id,*/}
                                        {/*                full_name: el.full_name*/}
                                        {/*            }))}*/}
                                        {/*            placeholder={t("operators")}*/}
                                        {/*            isLoading={isLoading}*/}
                                        {/*        />*/}
                                        {/*    </>*/}
                                        {/*</div>*/}

                                        <div>
                                            <label htmlFor={"logo"} className="block">
                                                {t("logo")} :
                                            </label>
                                            <Field
                                                id={"logo"}
                                                {...formik}
                                                component={ImageUpload}
                                                name="logo"
                                                placeholder="logo"
                                            />
                                        </div>
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
