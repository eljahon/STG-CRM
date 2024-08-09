import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import paramsToObject from "../../../../hooks/paramsToObject";
import { useTranslation } from "react-i18next";
const distArr = [
  {
    name: "profile",
    icons: "pi pi-user"
  },
  {
    name: "password",
    icons: "pi pi-key"
  }
];

const sellerArr = [
  {
    name: "profile",
    icons: "pi pi-user"
  },
  {
    name: "password",
    icons: "pi pi-key"
  },
  {
    name: "profile-seller",
    icons: "pi pi-user"
  },
  {
    name: "finance",
    icons: "pi pi-chart-scatter"
  }
];
const TabBar = ({ className }: any) => {
  const [params, setSearchParam] = useSearchParams();
  const { t } = useTranslation();
  const [status, setstatus] = useState<any>(params.get("status") || "profile");
  const arr =
    window.localStorage.getItem("role") == "seller" ? sellerArr : distArr;
  return (
    <div
      className={`w-full flex bg-white gap-2  border-round-2xl mb-4 py-2 px-2  ${
        className && className
      }`}
    >
      {arr?.map((e: any, index: number) => (
        <div
          key={index}
          onClick={() => {
            setstatus(e?.name);
            if (e?.name == "profile") {
              setSearchParam({
                ...paramsToObject(params.entries()),
                status: ""
              });
            } else {
              setSearchParam({
                ...paramsToObject(params.entries()),
                status: e?.name
              });
            }
          }}
          className={`flex gap-3 align-items-center px-3 py-3 cursor-pointer border-round-2xl hover:bg-green-50 myhover-text ${
            e?.name == status ? "bg-green-50" : ""
          }`}
        >
          <i
            className={e?.icons}
            style={{ color: e?.name == status ? "green" : "gray" }}
          />
          <p
            className={`font-semibold text-base   m-0 ${
              e?.name == status ? "text-green-500" : "text-gray-500"
            }`}
          >
            {t(e?.name)}{" "}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
