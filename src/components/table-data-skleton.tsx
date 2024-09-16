import { Skeleton } from "primereact/skeleton";

export const TableDataSkleton = () => {
  return (
    <div className="mt-2 p-3">
      <div className="flex align-items-center justify-content-between">
        <Skeleton width="40px" height="38px" />
        <Skeleton width="140px" height="38px" />
        <Skeleton width="140px" height="38px" />
        <Skeleton width="140px" height="38px" />
        <Skeleton width="140px" height="38px" />
        <Skeleton width="140px" height="38px" />
      </div>
      <div className="flex mt-5 flex-column row-gap-6">
        <div className="flex mt-3 align-items-center justify-content-between">
          <Skeleton width="40px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <div
            style={{
              display: "flex",
              width: 140,
              justifyContent: "center",
              columnGap: 10,
            }}
          >
            <Skeleton className="border-circle" width="40px" height="38px" />
            <Skeleton className="border-circle" width="40px" height="38px" />
          </div>
        </div>
        <div className="flex align-items-center justify-content-between">
          <Skeleton width="40px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <div
            style={{
              display: "flex",
              width: 140,
              justifyContent: "center",
              columnGap: 10,
            }}
          >
            <Skeleton className="border-circle" width="40px" height="38px" />
            <Skeleton className="border-circle" width="40px" height="38px" />
          </div>
        </div>
        <div className="flex align-items-center justify-content-between">
          <Skeleton width="40px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <div
            style={{
              display: "flex",
              width: 140,
              justifyContent: "center",
              columnGap: 10,
            }}
          >
            <Skeleton className="border-circle" width="40px" height="38px" />
            <Skeleton className="border-circle" width="40px" height="38px" />
          </div>
        </div>
        <div className="flex align-items-center justify-content-between">
          <Skeleton width="40px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <div
            style={{
              display: "flex",
              width: 140,
              justifyContent: "center",
              columnGap: 10,
            }}
          >
            <Skeleton className="border-circle" width="40px" height="38px" />
            <Skeleton className="border-circle" width="40px" height="38px" />
          </div>
        </div>
        <div className="flex align-items-center justify-content-between">
          <Skeleton width="40px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <Skeleton width="140px" height="38px" />
          <div
            style={{
              display: "flex",
              width: 140,
              justifyContent: "center",
              columnGap: 10,
            }}
          >
            <Skeleton className="border-circle" width="40px" height="38px" />
            <Skeleton className="border-circle" width="40px" height="38px" />
          </div>
        </div>
      </div>
    </div>
  );
};
