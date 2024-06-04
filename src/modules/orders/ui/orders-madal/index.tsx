import GlobalMadal from "../../../../ui/global-modal";
import StatusBtn from "../../../../ui/status";
import YandexMap from "../../../../ui/yandex-map";

const InfoTepmlate = ({ title, text, icons, children }: any) => {
  return (
    <div className="w-full mb-3 ">
      <div className="flex align-items-center gap-2 mb-1">
        {icons && <i className={icons}></i>}
        <h4 className="m-0 font-normal text-base">{title}:</h4>
      </div>
      {text && (
        <p className="m-0 font-normal text-base text-gray-600 testWraP ml-1">
          {text}
        </p>
      )}
      {children}
    </div>
  );
};
const OrdersDetails = ({ close, data }: any) => {
  return (
    <GlobalMadal close={close} title={"orders"}>
      <div className="flex w-full gap-4 mb-4">
        <div className="w-full flex flex-column justify-content-between">
          <InfoTepmlate title={"Name"} text={"name"} icons="pi pi-clipboard" />
          <InfoTepmlate
            title={"Address"}
            text={data?.address}
            icons={"pi pi-map-marker"}
          />
          <InfoTepmlate
            title={"Company"}
            text={"Company name"}
            icons={"pi pi-building"}
          />
          <InfoTepmlate
            title={"Branch"}
            text={"Branch name"}
            icons={"pi pi-sitemap"}
          />
          <InfoTepmlate
            title={"Phone number"}
            text={data?.additional_phone}
            icons={"pi pi-phone"}
          />
        </div>
        <div className="w-full flex flex-column justify-content-between">
          <InfoTepmlate title={"Price"} icons={"pi pi-wallet"}>
            <p className="m-0 font-normal text-base text-green-600 testWraP ml-1">
              {data?.price} som
            </p>
          </InfoTepmlate>
          <InfoTepmlate title={"Count"} icons={"pi pi-wave-pulse"}>
            <p className="m-0 font-normal text-base text-green-600 testWraP ml-1">
              {data?.count}
            </p>
          </InfoTepmlate>
          <InfoTepmlate title={"Payment type"} icons={"pi pi-receipt"}>
            {true ? (
              <i className="pi pi-credit-card" style={{ fontSize: "1.7rem" }} />
            ) : (
              <i className="pi pi-dollar" style={{ fontSize: "1.7rem" }} />
            )}
          </InfoTepmlate>
          <InfoTepmlate title={"Status"} icons={"pi pi-wave-pulse"}>
            <StatusBtn status={data?.status} className={"inline-block"} />
          </InfoTepmlate>
          <InfoTepmlate
            title={"Comment"}
            text={data?.comment}
            icons={"pi pi-comment"}
          />
        </div>
      </div>
      <div className="w-full">
        {data?.location && (
          <YandexMap
            onLocationSelect={() => null}
            disable={true}
            height={"300px"}
            value={[data?.location?.lat, data?.location?.long]}
          />
        )}
      </div>
    </GlobalMadal>
  );
};

export default OrdersDetails;
