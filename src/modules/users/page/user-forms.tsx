import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import { useTranslation } from "react-i18next";
import { FormContainer } from "../../../components/Forms";
import { Field } from "formik";
import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StatudsSelect } from "../../../components/Forms/Fields/Status-Select.tsx";
import { useParams } from "react-router-dom";
import { useGetUsersById } from "../service/query/useGetUsersById.ts";
import { UseQueryResult } from "react-query";
import { userRoleList } from "../../../constants/index.ts";
import { RoleSelect, UploadeImage, CustomInputText } from "../../../components/Forms/Fields";
import {get} from "lodash";

interface UsersByIdType {
  created_by: null;
  full_name: string;
  id: string;
  logo: string;
  password: string;
  phone: string;
  role: { id: string; name: string };
  status: string;
}

export const UserForms = () => {
  const navigator = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>();
  const { id } = useParams();

  const { data, isLoading } = useGetUsersById(id) as UseQueryResult<
    UsersByIdType,
    unknown
  >;

  const createEmployeeSuccess = () => {
    navigator("/employees");
    {
      id === "new" && toast.success("Employee created successfully");
    }
  };

  return (
    <>
      <TheBreadcrumb
        model={[
          {
            template: () => (
              <span className="text-primary">{t("employees")} {id === 'new' ?t('create') : t('update')}</span>
            ),
          },
        ]}
      />
      <div className="card mt-2">
        <FormContainer
          onError={() => {
            toast.error("Something went wrong");
          }}
          onSuccess={createEmployeeSuccess}
          setLoader={setLoading}
          url={"user"}
          fields={[
            {
              name: "full_name",
              validations: [{ type: "required" }],
              validationType: "string",
              value: get(data, 'full_name')
            },
            {
              name: "password",
              validations: [{ type: "required" }],
              validationType: "string",
              value: get(data, 'password')
            },
            {
              name: "phone",
              validations: [{ type: "phone" }],
              validationType: "string",
              value: get(data, 'phone')
            },
            {
              name: "status",
              validations: [{ type: "required" }],
              validationType: "string",
              value: get(data, 'status'),
            },
            {
              name: "role_id",
              validations: [{ type: "required" }],
              validationType: "string",
              value: get(data, 'role.id'),
            },
            {
              name: "logo",
              validations: [{ type: "required" }],
              validationType: "string",
              value: get(data, 'logo')
            },
          ]}
        >
          {(formik) => {
            console.log(formik)
            return (
              <>
                <div className="user_form__box">
                  <div>
                    <label htmlFor={"full_name"} className="block">
                      {t("fullName")} :
                    </label>
                    <Field
                      id={"full_name"}
                      {...formik}
                      component={CustomInputText}
                      name="full_name"
                      placeholder={t("fullName")}
                    />
                  </div>
                  <div>
                    <label htmlFor={"password"} className="block">
                      {t("password")} :
                    </label>
                    <Field
                      id={"password"}
                      {...formik}
                      component={CustomInputText}
                      name="password"
                      placeholder={t("password")}
                    />
                  </div>
                  <div>
                    <label htmlFor={"phone"} className="block">
                      {t("phone")} :
                    </label>
                    <Field
                      id={"phone"}
                      {...formik}
                      component={CustomInputText}
                      name="phone"
                      placeholder={t("phone")}
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
                    <>
                      <label htmlFor={"role_id"} className="block">
                        {t("role")} :
                      </label>
                      <Field
                        id={"role_id"}
                        {...formik}
                        component={RoleSelect}
                        name="role_id"
                        options={userRoleList}
                        placeholder={t("role")}
                        isLoading={isLoading}
                      />
                    </>
                  </div>
                  <div>
                    <label htmlFor={"logo"} className="block">
                      {t("logo")} :
                    </label>
                    <Field
                      id={"logo"}
                      {...formik}
                      component={UploadeImage}
                      name="logo"
                      placeholder="logo"
                    />
                  </div>
                </div>
                <Button loading={loading} type="submit" label="submit" />
              </>
            );
          }}
        </FormContainer>
      </div>
    </>
  );
};
