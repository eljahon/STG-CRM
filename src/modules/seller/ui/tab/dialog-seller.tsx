import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useTranslation } from "react-i18next";

const DialogSeller = ({ open, setOpen,loading, onClick, text }: any) => {
  const { t } = useTranslation();
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label={t("no")}
        icon="pi pi-times"
        outlined
        severity="danger"
        onClick={() => setOpen(false)}
      />
      <Button loading={loading} label={t("yes")} icon="pi pi-check" onClick={onClick} />
    </React.Fragment>
  );
  return (
    <div>
      <Dialog
        visible={open}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={t("confirm")}
        modal
        footer={deleteProductDialogFooter}
        onHide={() => setOpen(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {text && <span>{text}</span>}
        </div>
      </Dialog>
    </div>
  );
};

export default DialogSeller;
