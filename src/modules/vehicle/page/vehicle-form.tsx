import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import { useTranslation } from "react-i18next";
import { FormContainer } from "../../../components/Forms";
import { Field } from "formik";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {get} from "lodash";
import {StatudsSelect, CustomInputText, UploadeImage} from "../../../components/Forms/Fields";
// import {modelTypes} from "../../../constants"
import {CustomMultiSelect} from "../../../components/Forms/Fields/Multi-Select.tsx";
import {useFetchOne} from "../../../hooks/useFetchOne.ts";
import {useFetchAll} from "../../../hooks/useFetchAll.ts";
import {UseQueryResult} from "react-query";
interface IDIRVERS {
    id?: string,
    created_by: null;
    logo: string;
    type: string;
    status?: string;
    full_name?: string;
    phone?: string;
}
interface UsersByIdType {
    created_by: null;
    logo: string;
    id: string;
    type: string;
    dirvers?: IDIRVERS[]
    status?: string;
}

export const VehicleForm = () => {
    const navigator = useNavigate();
    const { t } = useTranslation();
    const { id } = useParams();

    const { data, isLoading } = useFetchOne({url: 'vehicle',id: `${id}`, key: 'vehicle'}) as UseQueryResult<
        UsersByIdType,
        unknown
    >;
    const ekgZone = useFetchAll({url:'zone', key: 'zone_ekg', params: {type: 'ekg'}})
    const dumpZone = useFetchAll({url:'zone', key: 'dump_ekg', params: {type: 'dump'}})

    const createEmployeeSuccess = () => {
        navigator("/vehicle");
        {
            id === "new" && toast.success("Zone created successfully");
        }
    };


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
                        customData={(value:any) => ({...value, model: 'tonly'})}
                        url={"vehicle"}
                        fields={[
                            {
                                name: "drivers",
                                validations: [{type: "required"}],
                                validationType: "array",
                                value: get(data, 'drivers', []).map((el:IDIRVERS) => el.id)
                            },
                            {
                                name: "status",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'status'),
                            },
                            {
                                name: "dump_zone",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'dump_zone'),
                            },
                            {
                                name: "ekg_zone",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'ekg_zone'),
                            },
                            {
                                name: "number",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'number'),
                            },
                            {
                                name: "logo",
                                validationType: "string",
                                value: get(data, 'logo')
                            },
                        ]}
                    >
                        {(formik) => {
                            // console.log(formik)
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
                                            <label htmlFor={"number"} className="block">
                                                {t("number")} :
                                            </label>
                                            <Field
                                                id={"number"}
                                                {...formik}
                                                component={CustomInputText}
                                                name="number"
                                                placeholder={t("number")}
                                                isLoading={isLoading}
                                            />
                                        </div>
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
                                            <label htmlFor={"ekg_zone"} className="block">
                                                {t("ekg_zone")} :
                                            </label>
                                            <Field
                                                id={"ekg_zone"}
                                                {...formik}
                                                component={StatudsSelect}
                                                name="ekg_zone"
                                                optionsProp={get(ekgZone, 'data.zones')}
                                                placeholder={t("ekg_zone")}
                                                isLoading={isLoading}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={"dump_zone"} className="block">
                                                {t("dump_zone")} :
                                            </label>
                                            <Field
                                                id={"dump_zone"}
                                                {...formik}
                                                component={StatudsSelect}
                                                name="dump_zone"
                                                optionsProp={get(dumpZone, 'data.zones')}
                                                placeholder={t("dump_zone")}
                                                isLoading={isLoading}
                                            />
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
                                                component={UploadeImage}
                                                name="logo"
                                                isLoading={isLoading}
                                                placeholder="logo"
                                            />
                                        </div>
                                    </div>
                                    <Button loading={formik.isSubmitting} type="submit" label="submit"/>
                                </>
                            );
                        }}
                    </FormContainer>
                </div>
            </div>

        </>
    );
};
