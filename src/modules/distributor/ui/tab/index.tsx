import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import paramsToObject from "../../../../hooks/paramsToObject";
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
    name: "cancelled",
    icons: "pi pi-times"
  }
];

const Tab = ({ className }: any) => {
  const [params, setSearchParam] = useSearchParams();
  const [status, setstatus] = useState<any>(params.get("status") || "all");
  return (
    <div
      className={`w-full  flex bg-white border-round-2xl py-2 px-2 gap-3  ${
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
          className={`flex gap-3 align-items-center pl-3 pr-5 py-3 cursor-pointer border-round-2xl hover:bg-green-50 myhover-text ${
            e?.name == status ? "bg-green-50" : ""
          }`}
        >
          <i
            className={e?.icons}
            style={{ color: e?.name == status ? "green" : "gray" }}
          />
          <p
            className={`font-semibold text-base  m-0 ${
              e?.name == status ? "text-green-500" : "text-gray-500"
            }`}
          >
            {e?.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Tab;
