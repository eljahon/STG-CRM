// export const SalaryPlanInfoForm = () => {
//   return <div>SalaryPlanInfoForm</div>
// }
import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import { useTranslation } from "react-i18next";
import { FormContainer } from "../../../components/Forms";
import { Field } from "formik";
import { Button } from "primereact/button";
import { useNavigate, useSearchParams,useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {get} from "lodash";
import {StatudsSelect, CustomInputNumber} from "../../../components/Forms/Fields";
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

export const SalaryPlanInfoForm = () => {
    const navigator = useNavigate();
    const { t } = useTranslation();
    const { id } = useParams();
     const [searchParams, setSearchParams] =useSearchParams()
    const { data, isLoading } = useFetchOne({url: 'salary-plan',id: `${id}`, subUrl: `detail/${searchParams.get('salary_plan_id')}`, key: 'vehicle'}) as UseQueryResult<
        UsersByIdType,
        unknown
    >;
    const ekgZone = useFetchAll({url:'zone', key: 'zone_ekg', params: {type: 'ekg'}})
    const dumpZone = useFetchAll({url:'zone', key: 'dump_ekg', params: {type: 'dump'}})



    return (
        <>
            <TheBreadcrumb
                model={[
                    {
                        template: () => (
                            <span className="text-primary">{t("salary_plan")} {id === 'new' ? t('create') :t('update')}</span>
                        ),
                    },
                    {
                        template: () => (
                            <span className="text-primary">{t("detail")} {id === 'new' ? t('create') :t('update')}</span>
                        ),
                    },
                ]}
            />
            <div className="card mt-2 w-1/2">
                <div>
                    <FormContainer
                      
                        onSuccess={()=> navigator(-1)}
                        url={`salary-plan`}
                        subUrl={id === 'new' ? `${searchParams.get('salary_plan_id')}/detail` : `detail/${searchParams.get('salary_plan_id')}`}
                        fields={[
                            {
                                name: "dump_zone_id",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'dump_zone.id'),
                            },
                            {
                                name: "ekg_zone_id",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'ekg_zone.id'),
                            },
                            {
                                name: "price_per_ride",
                                validations: [{type: "required"}],
                                validationType: "number",
                                value: get(data, 'price_per_ride'),
                            },
                            {
                                name: "logo",
                                validationType: "string",
                                value: get(data, 'logo')
                            },
                        ]}
                    >
                        {(formik) => {
                            return (
                                <>
                                    <div className="user_form__box">
                               
                                        <div>
                                            <label htmlFor={"price_per_ride"} className="block">
                                                {t("price_per_ride")} :
                                            </label>
                                            <Field
                                                id={"price_per_ride"}
                                                {...formik}
                                                component={CustomInputNumber}
                                                name="price_per_ride"
                                                placeholder={t("price_per_ride")}
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
                                                name="ekg_zone_id"
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
                                                name="dump_zone_id"
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
