import GlobalMadal from "../../../../ui/global-modal";
import YandexMap from "../../../../ui/yandex-map";

const InfoTepmlate = ({ title, text }: any) => {
  return (
    <div className="w-full mb-2 ">
      <h4 className="m-0 font-normal text-base text-gray-600 mb-1">{title}:</h4>
      <p className="m-0 font-normal text-base testWraP"> {text}</p>
    </div>
  );
};
const OrdersDetails = ({ close, data }: any) => {
  console.log(data?.location?.lat);
  return (
    <GlobalMadal close={close} title={"orders"}>
      <div className="flex w-full gap-4 mb-4">
        <div className="w-full">
          <InfoTepmlate title={"Product Name"} text={"name"} />
          <InfoTepmlate title={"Product Name"} text={"name"} />
          <InfoTepmlate title={"Product Name"} text={"name"} />
          <InfoTepmlate title={"Product Name"} text={"name"} />
        </div>
        <div className="w-full">
          <InfoTepmlate title={"Product Name"} text={"name"} />
          <InfoTepmlate title={"Product Name"} text={"name"} />
          <InfoTepmlate title={"Product Name"} text={"name"} />
          <InfoTepmlate title={"Product Name"} text={"name"} />
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
