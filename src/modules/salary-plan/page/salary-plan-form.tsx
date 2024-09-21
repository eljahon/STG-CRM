import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import { useTranslation } from "react-i18next";
import { FormContainer } from "../../../components/Forms/index.tsx";
import { Field } from "formik";
import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {get} from "lodash";
import {StatudsSelect, CustomInputText, DatePicker} from "../../../components/Forms/Fields/index.ts";

import {useFetchOne} from "../../../hooks/useFetchOne.ts";
import {UseQueryResult} from "react-query";
import dayjs from "dayjs";
interface IOPERATOR {ekg: string, dump: string}

const operatorIds:IOPERATOR={
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

export const SalaryPlanForms = () => {
    const navigator = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>();
    const { id } = useParams();
    const selectedDate = new Date();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                                
    const [month, setMonth] = useState<string>(dayjs(firstDayOfMonth).startOf('month').format('YYYY-MM-DD'));
    const { data, isLoading } = useFetchOne({url: 'salary-plan', id:id as string, key: 'zone'}) as UseQueryResult<
        UsersByIdType,
        unknown
    >;
    console.log(data, 'data')
    const createEmployeeSuccess = () => {
        
        
            id === "new" && toast.success("Salary plan created successfully");
            navigator("/salary-plan");
        
    };

    return (
        <>
            <TheBreadcrumb
                model={[
                    {
                        template: () => (
                            <span className="text-primary">{t("salary_plan")} {id === 'new' ? t('create') : t('update')}</span>
                        ),
                    },
                ]}
            />
            <div className="card mt-2 w-1/2">
                <div>
                    <FormContainer
                        onSuccess={createEmployeeSuccess}
                        setLoader={setLoading}
                        url={"salary-plan"}
                        fields={[
                            {
                                name: "name",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'name')
                            },
                            {
                                name: "month",
                                validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'month') ?? month
                            },
                            {
                                name: "status",
                                // validations: [{type: "required"}],
                                validationType: "string",
                                value: get(data, 'status'),
                            },
                            // {
                            //     name: "operators",
                            //     // validations: [{type: ""}],
                            //     validationType: "array",
                            //     value: get(data, 'operators', [])?.map(({id}) => id)
                            // },
                        ]}
                    >
                        {(formik) => {
                            console.log(formik)
                            return (
                                <>
                                    <div className="user_form__box">
                                    <div>
                                            <label htmlFor={"month"} className="block">
                                                {t("month")} :
                                            </label>
                                            <Field
                                                id={"month"}
                                                {...formik}
                                                placeholder={t("month")}
                                                component={DatePicker}
                                                dateFormat="yy-mm"
                                                view="month"
                                                name="month"
                                                isLoading={isLoading}
                                            />
                                        </div>
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
                                        {id !== 'new'&&<div>
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
                                        </div>}
                                        
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
