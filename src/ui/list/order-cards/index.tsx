import { Tag } from "primereact/tag";

const OrdersCard = ({ column = [], img, status }: any) => {
  return (
    <div className="flex align-items-center  gap-2 w-full bg-white border-round-2xl cursor-pointer px-4 py-3">
      <img src={img} alt="img" className="w-4rem mr-3 border-round-2xl" />
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
        <Tag security="">{status}</Tag>
      </div>
    </div>
  );
};

export default OrdersCard;
