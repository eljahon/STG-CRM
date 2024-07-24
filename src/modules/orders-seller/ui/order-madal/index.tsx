import { Galleria } from "primereact/galleria";
import GlobalMadal from "../../../../ui/global-modal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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

const OrderDetails = ({ close, data }: any) => {
  const { t } = useTranslation();
  const [imageOpen, setImagesOpen] = useState<any>(null);

  const itemTemplate = (item: any) => {
    return (
      <img
        src={import.meta.env.VITE_APP_AWS_PATH + item.aws_path}
        alt={"ds"}
        height={350}
        style={{ width: "100%", display: "block", objectFit: "cover" }}
      />
    );
  };

  return (
    <GlobalMadal close={close} title={t("product")}>
      <div className="flex gap-8">
        {data?.product?.image ? (
          <div className="w-full flex max-w-20rem  h-full  relative imageFlex  flex-column">
            <div
              className={`absolute top-0 left-0 w-full h-full bg-black-alpha-50 flex align-items-center justify-content-center  gap-4`}
            >
              <span
                className="cursor-pointer"
                onClick={() => setImagesOpen(true)}
              >
                <i
                  className="pi pi-eye"
                  style={{ fontSize: "2.4em", color: "white" }}
                />
              </span>
            </div>
            <img
              className={`w-full `}
              style={{
                objectFit: "contain"
              }}
              src={
                import.meta.env.VITE_APP_AWS_PATH +
                data?.product?.image?.aws_path
              }
              width={200}
              height={200}
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex w-full gap-4 mb-4">
          <div className="w-full flex flex-column justify-content-between">
            <InfoTepmlate
              title={t("productName")}
              text={data?.product?.title}
              icons="pi pi-th-large"
            />
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
            <InfoTepmlate
              title={t("type")}
              text={data?.product?.type}
              icons={"pi pi-sitemap"}
            />
          </div>
          <div className="w-full flex flex-column justify-content-between">
            <InfoTepmlate
              title={t("companyName")}
              text={data?.product?.company?.name}
              icons={"pi pi-building"}
            />
            <InfoTepmlate
              title={"Phone number"}
              text={data?.product?.company?.phone}
              icons={"pi pi-phone"}
            />

            <InfoTepmlate
              title={t("aboutCompany")}
              text={data?.product?.company?.description}
              icons={"pi pi-comment"}
            />
          </div>
        </div>
      </div>

      {data?.product?.gallery && (
        <div className="card">
          <Galleria
            value={data?.product?.gallery}
            style={{ maxWidth: "640px", margin: "0 auto" }}
            changeItemOnIndicatorHover
            showThumbnails={false}
            showIndicators
            showItemNavigators
            showItemNavigatorsOnHover
            item={itemTemplate}
          />
        </div>
      )}
      {imageOpen && (
        <div
          onClick={() => setImagesOpen(false)}
          className="fixed top-0 left-0 w-screen h-screen fixedmu"
        >
          <span
            className="cursor-pointer fixed "
            style={{ top: "50px", right: "70px" }}
          >
            <i
              className="pi pi-times"
              style={{ fontSize: "2em", color: "white" }}
            />
          </span>
          <img
            className={`w-full`}
            onClick={(e: any) => e.stopPropagation()}
            style={{
              maxHeight: "80%",
              objectFit: "contain"
            }}
            src={
              import.meta.env.VITE_APP_AWS_PATH + data?.product?.image?.aws_path
            }
          />
        </div>
      )}
    </GlobalMadal>
  );
};

export default OrderDetails;
