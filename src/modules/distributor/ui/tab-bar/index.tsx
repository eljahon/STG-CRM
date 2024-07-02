import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import paramsToObject from "../../../../hooks/paramsToObject";
import { useTranslation } from "react-i18next";
const typeArr = [
  {
    name: "alldistributors",
    value: "all",
    icons: "pi pi-bolt"
  },
  {
    name: "mydistributors",
    value: "my",
    icons: "pi pi-spinner-dotted"
  }
];

const TabBar = ({ className }: any) => {
  const [params, setSearchParam] = useSearchParams();
  const { t } = useTranslation();
  const [type, settype] = useState<any>(params.get("type") || "all");
  return (
    <div
      className={`w-full bg-white border-round-2xl py-4 px-2  ${
        className && className
      }`}
      style={{ maxWidth: "265px", minHeight: `80vh` }}
    >
      {typeArr?.map((e: any, index: number) => (
        <div
          key={index}
          onClick={() => {
            settype(e?.value);
            if (e?.value == "all") {
              setSearchParam({
                ...paramsToObject(params.entries()),
                type: ""
              });
            } else {
              setSearchParam({
                ...paramsToObject(params.entries()),
                type: e?.value
              });
            }
          }}
          className={`flex gap-3 align-items-center px-3 py-3 cursor-pointer border-round-2xl hover:bg-green-50 myhover-text ${
            e?.value == type ? "bg-green-50" : ""
          }`}
        >
          <i
            className={e?.icons}
            style={{ color: e?.value == type ? "green" : "gray" }}
          />
          <p
            className={`font-semibold text-base  m-0 ${
              e?.value == type ? "text-green-500" : "text-gray-500"
            }`}
          >
            {t(e?.name)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
