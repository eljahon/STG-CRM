import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { GetMe } from "../../../../service/global";
import { useTranslation } from "react-i18next";
import { LangArr } from "../../../../data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [openmadal, setOpenmadal] = useState(false);
  const { t,i18n } = useTranslation();
  const { data: me } = useQuery(["meCompony"], () => GetMe());
  const rolename = window.localStorage.getItem("role") || "";

  const langFormat =()=> {
    const currentLang:string = localStorage.getItem('lng')||'uz';
   const item =  LangArr.find(el =>el.lang === currentLang);
    return item?.lang||'uz';
  }
  useEffect(() => {
    window.addEventListener("click", () => {
      setOpen(false), setOpenLang(false);
    });
  }, []);

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label={t("no")}
        icon="pi pi-times"
        outlined
        onClick={() => setOpenmadal(false)}
      />
      <Button
        label={t("yes")}
        icon="pi pi-check"
        severity="danger"
        onClick={() => {
          window.localStorage.removeItem("authToken");
          window.location.reload();
        }}
      />
    </React.Fragment>
  );
  const changeLanguage = (lng:any) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng)
  };
  return (
    <div className="flex align-items-center justify-content-between px-2 fixed  myflext  pt-4 pb-4">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search"> </InputIcon>
        <InputText
          className="border-round-2xl  border-none"
          v-model="value1"
          placeholder={t("search")}
        />
      </IconField>

      <div className="flex align-items-center justify-content-end  gap-2">
        <div className="p-3 pb-2   bg-white border-round-2xl cursor-pointer">
          <i
            className="pi pi-bell"
            style={{ fontSize: "1.2rem", color: "black" }}
          ></i>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpenLang(!openLang);
          }}
          style={{ padding: "13px" }}
          className="bg-white border-round-2xl flex justify-content-between gap-2 align-items-center cursor-pointer relative"
        >
          <div className="flex align-items-center gap-2">
            <i
              className="pi pi-globe"
              style={{ fontSize: "1.2rem", color: "black" }}
            ></i>
            <p className="m-0 ">{t(langFormat())}</p>
          </div>
          <i
            className="pi  pi-angle-down"
            style={{ fontSize: "1.2rem", color: "black" }}
          ></i>
          <div
            className={`${
              openLang ? "block" : "hidden"
            } absolute  left-0 bg-white border-round-2xl  py-2 w-full`}
            style={{ top: "55px", zIndex: 100 }}
          >
            {LangArr.map((e: any) => (
              <p
                key={e?.id}
                onClick={() =>changeLanguage(e?.lang)}
                className="py-2 px-4 m-0 hover:bg-blue-50"
              >
                {t(e?.lang)}
              </p>
            ))}
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          style={{ minWidth: "150px", padding: "13px" }}
          className="    bg-white border-round-2xl flex justify-content-between gap-2 align-items-center cursor-pointer relative"
        >
          <div className="flex align-items-center gap-2">
            <i
              className="pi pi-user "
              style={{ fontSize: "1.2rem", color: "black" }}
            ></i>
            <p className="m-0 ">{me?.data?.fullname}</p>
          </div>
          <i
            className="pi  pi-angle-down"
            style={{ fontSize: "1.2rem", color: "black" }}
          ></i>
          <div
            className={`${
              open ? "block" : "hidden"
            } absolute  left-0 bg-white border-round-2xl  py-2 w-full`}
            style={{ top: "55px", zIndex: 100 }}
          >
            <Link
              to={"/profile"}
              className="no-underline "
              style={{ color: "black" }}
            >
              <p className="py-2 px-4 m-0 hover:bg-blue-50">{t("profile")}</p>
            </Link>
            {rolename == "distributor" && (
              <Link
                to={
                  me?.data?.company && me?.data?.company != "undefined"
                    ? "/compony/old"
                    : "/compony/new"
                }
                className="no-underline"
                style={{ color: "black" }}
              >
                <p className="py-2 px-4 m-0 hover:bg-blue-50">{t("compony")}</p>
              </Link>
            )}
            <p
              className="py-2 px-4 m-0 hover:bg-blue-50"
              onClick={() => setOpenmadal(true)}
            >
              {t("logOut")}
            </p>
          </div>
        </div>
       
      </div>

      <Dialog
        visible={openmadal}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={t("confirm")}
        modal
        footer={deleteProductDialogFooter}
        onHide={() => setOpenmadal(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "1rem" }}
          />
          {true && <span>{t("sureTolog")}</span>}
        </div>
      </Dialog>
    </div>
  );
}
