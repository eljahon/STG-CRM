const ORDER_STATUS: any = {
  pending: "#5AB2FF", //yellow
  accepted: "#FF9800",
  shipping: "#8576FF",
  completed: "#4CCD99",
  cancelled: "#FF204E"
};

const hexToRgb = (hex: any) => {
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
};
const OrdersCard = ({ column = [], img, status }: any) => {
  return (
    <div className="flex align-items-center  gap-2 w-full bg-white border-round-2xl cursor-pointer px-4 py-3">
      {img && (
        <img src={img} alt="img" className="w-4rem mr-3 border-round-2xl" />
      )}
      {column &&
        column?.map((e: any, i: any) => (
          <div className="w-full" key={i}>
            <h4 className="m-0 font-normal text-base text-gray-600">
              {e?.label}
            </h4>
            <p className="m-0 font-normal text-lg"> {e?.text}</p>
          </div>
        ))}

      <div>
        <p
          className="px-4 py-2 border-round-2xl text-base font-bold m-0"
          style={{
            backgroundColor: `rgba(${hexToRgb(
              ORDER_STATUS?.[`${status}`]
            )}, ${0.2})`,
            color: ORDER_STATUS?.[`${status}`]
          }}
        >
          {status}
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;
