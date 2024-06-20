import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const FromAction = ({ title, unfixed, loader, cancel, urlOnCancel }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div
      style={{
        borderBottomRightRadius: "16px",
        borderBottomLeftRadius: "16px"
      }}
      className={` bg-white flex  justify-content-between align-items-center px-5 py-3 border-round-2xl px-2  pt-5 mb-4 ${
        unfixed ? "w-full" : " fixed myflext2"
      }`}
    >
      <h3 className="m-0 text-2xl">{title}</h3>
      <div className="flex gap-2">
        <Button
          loading={loader}
          className="border-round-3xl px-4"
          label={id == "new" || !id ? t("save") : t("update")}
          type="submit"
          severity="success"
        />
        {cancel && (
          <Button
            className="border-round-3xl px-4"
            label={cancel}
            severity="secondary"
            type="button"
            onClick={() =>{
               navigate(urlOnCancel)
              }
              }
          />
        )}
      </div>
    </div>
  );
};

export default FromAction;
