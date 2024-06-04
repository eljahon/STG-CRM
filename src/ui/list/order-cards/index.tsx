import StatusBtn from "../../status";

const OrdersCard = ({
  column = [],
  img,
  onClick,
  paymentType,
  status,
  id
}: any) => {
  return (
    <div
      className="flex    gap-4 w-full bg-white border-round-2xl cursor-pointer px-4 py-3"
      onClick={onClick}
    >
      <div>
        <h4 className="m-0 font-normal text-base text-gray-600  mb-2">Id</h4>
        <p className="m-0 font-normal text-base">#{id}</p>
      </div>

      {img && (
        <img src={img} alt="img" className="w-4rem mr-3 border-round-2xl" />
      )}
      {column &&
        column?.map((e: any, i: any) => (
          <div className="w-full" key={i}>
            <h4 className="m-0 font-normal text-base text-gray-600 mb-2">
              {e?.label}
            </h4>
            <p className="m-0 font-normal text-base testWraP"> {e?.text}</p>
          </div>
        ))}
      {paymentType && (
        <div className="w-full">
          <h4 className="m-0 font-normal text-base text-gray-600 mb-2">
            Payment type
          </h4>
          {paymentType ? (
            <i className="pi pi-credit-card" style={{ fontSize: "1.7rem" }} />
          ) : (
            <i className="pi pi-dollar" style={{ fontSize: "1.7rem" }} />
          )}
        </div>
      )}

      <div>
        <h4 className="m-0 font-normal text-base text-gray-600 mb-1">Status</h4>

        <StatusBtn status={status} className={"inline-block"} />
      </div>
    </div>
  );
};

export default OrdersCard;
