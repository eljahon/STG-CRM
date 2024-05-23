import { useQuery } from "react-query";
import OrdersCard from "../../../ui/list/order-cards";
import TabBar from "../ui/tab-bar";
import { GetAllData, GetByIdData } from "../../../service/global";
import { useSearchParams } from "react-router-dom";
import OrdersDetails from "../ui/orders-madal";
import { useState } from "react";
// import TopFilter from "../ui/top-filter";

const OrderPage = () => {
  const [params] = useSearchParams();
  const [OrderId, setOrderId] = useState<any>(null);
  const { data: orders } = useQuery(["orders", params.get("status")], () =>
    GetAllData("company/orders", {
      populate: "*",
      filters: {
        status: params.get("status") ? params.get("status") : undefined
      }
    })
  );
  const { data: ordersByid } = useQuery(
    ["ordersId", OrderId],
    () => GetByIdData("orders", OrderId, { populate: "*" }),
    {
      enabled: !!OrderId // Ensure the query is enabled only if OrderId is truthy
    }
  );

  return (
    <div className="mt-5 tabhight">
      <div className="w-full flex gap-5">
        <TabBar />

        <div className="w-full">
          {/* <TopFilter title={"Order"} /> */}
          <div className="w-full flex flex-column gap-3">
            {orders?.data &&
              orders?.data?.map((e: any) => (
                <OrdersCard
                  onClick={() => setOrderId(e?.id)}
                  key={e?.id}
                  column={[
                    { label: "Product name", text: e?.product.title },
                    { label: "Price", text: e?.price + "so'm" },
                    { label: "Count", text: `${e?.count}/${"ds"}` },
                    {
                      label: "Address",
                      text: e?.address
                    },
                    {
                      label: "User",
                      text: e?.client?.fullname
                    }
                  ]}
                  id={e?.id}
                  paymentType={e?.payment_type}
                  status={e?.status}
                />
              ))}
          </div>
        </div>
      </div>

      {OrderId && (
        <OrdersDetails data={ordersByid?.data} close={() => setOrderId(null)} />
      )}
    </div>
  );
};

export default OrderPage;
