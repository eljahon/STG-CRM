import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";
import { FormContainer } from "../../../components/Forms";
import { Field } from "formik";
import { Button } from "primereact/button";
import React, { useState } from "react";
import { ControlError } from "../../../components/ControlError/ControlError.tsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StatudsSelect } from "../components/status-select.tsx";
import { useParams } from "react-router-dom";
import UploadeImage from "../components/uploade-image.tsx";
import { useGetUsersById } from "../service/query/useGetUsersById.ts";
import { UseQueryResult } from "react-query";
import { Dropdown } from "primereact/dropdown";
import { userRoleList } from "../../../constants/index.ts";
import { RoleSelect } from "../components/role-select.tsx";
import { Skeleton } from "primereact/skeleton";

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

  const InputCompoente = (props) => {
    const { form, field, placeholder } = props;
    const handleChange = (option: React.ChangeEvent<HTMLInputElement>) => {
      form?.setFieldValue(field?.name, option.target.value);
    };
    return (
      <>
        {isLoading ? (
          <Skeleton width="100%" height="3rem" />
        ) : (
          <>
            <InputText
              type={field?.name === "password" ? "password" : "text"}
              className="p-inputtext-sm w-full"
              placeholder={placeholder}
              invalid={form.errors[field.name]}
              onChange={handleChange}
              name={field?.name}
              value={field?.value || data?.[field?.name] || ""}
            />
            <ControlError form={form} field={field} />
          </>
        )}
      </>
    );
  };

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
              <span className="text-primary">{t("employees-create")}</span>
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
            },
            {
              name: "password",
              validations: [{ type: "required" }],
              validationType: "string",
            },
            {
              name: "phone",
              validations: [{ type: "phone" }],
              validationType: "string",
            },
            {
              name: "status",
              validations: [{ type: "required" }],
              validationType: "string",
              value: data?.status,
            },
            {
              name: "role_id",
              validations: [{ type: "required" }],
              validationType: "string",
              value: data?.role?.id,
            },
            {
              name: "logo",
              validations: [{ type: "required" }],
              validationType: "string",
            },
          ]}
        >
          {(formik) => {
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
                      component={InputCompoente}
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
                      component={InputCompoente}
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
                      component={InputCompoente}
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
                      component={ImageUpload}
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
