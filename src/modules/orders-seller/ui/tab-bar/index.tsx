import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import paramsToObject from "../../../../hooks/paramsToObject";
import { useTranslation } from "react-i18next";
const statusArr = [
  {
    name: "all",
    icons: "pi pi-bolt"
  },
  {
    name: "pending",
    icons: "pi pi-spinner-dotted"
  },
  {
    name: "accepted",
    icons: "pi pi-check-square"
  },
  {
    name: "shipping",
    icons: "pi pi-truck"
  },
  {
    name: "completed",
    icons: "pi pi-check"
  },
  {
    name: "canceled",
    icons: "pi pi-times"
  }
];

const TabBar = ({ className, count }: any) => {
  const [params, setSearchParam] = useSearchParams();
  const { t } = useTranslation();
  const [status, setstatus] = useState<any>(params.get("status") || "all");
  return (
    <div
      className={`w-full flex bg-white border-round-2xl py-2 gap-2 mt-4 px-2  ${
        className && className
      }`}
    >
      {statusArr?.map((e: any, index: number) => (
        <div
          key={index}
          onClick={() => {
            setstatus(e?.name);
            if (e?.name == "all") {
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
            className={`font-semibold text-base  text-nowrap m-0 ${
              e?.name == status ? "text-green-500" : "text-gray-500"
            }`}
          >
            {t(e?.name)}{" "}
            {count && count[e?.name] && (
              <span
                className={`text-xs ${
                  e?.name == status ? "text-green-500" : "text-gray-500"
                }`}
              >
                ({count[e?.name]})
              </span>
            )}{" "}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
