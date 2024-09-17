import { Button } from "primereact/button";
import React from "react";

interface PaginationProps {
  filter: { limit: number; page: number };
  page: number;
  filterSet: React.Dispatch<
    React.SetStateAction<{ limit: number; page: number }>
  >;
  total: number;
}

export const CustomPagination: React.FC<PaginationProps> = ({
  filter,
  page,
  filterSet,
  total,
}) => {
  const totalPages = Math.ceil(total / filter?.limit);

  const handlePageClick = (pageNumber: number) => {
    filterSet({ ...filter, page: pageNumber });
  };

  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pageNumbers.push(1);

    if (page > 3) {
      pageNumbers.push("...");
    }

    let start = Math.max(2, page - 1);
    let end = Math.min(totalPages - 1, page + 1);

    if (page <= 3) {
      end = Math.min(totalPages - 1, maxVisiblePages - 1);
    } else if (page >= totalPages - 2) {
      start = Math.max(2, totalPages - maxVisiblePages + 2);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (page < totalPages - 2) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages);

    return pageNumbers;
  };
  const prevButton = () => {
    filterSet({ ...filter, page: page - 1 });
  };
  const nextButton = () => {
    filterSet({ ...filter, page: page + 1 });
  };

  return (
    <div className="flex align-items-center bg-transparent column-gap-3 justify-content-end mr-5 mt-4">
      <Button
        className="pagination_controll__btn"
        icon="pi pi-angle-left"
        rounded
        disabled={page === 1}
        onClick={prevButton}
      ></Button>
      {getPageNumbers().map((pageNum, index) =>
        pageNum === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2">
            ...
          </span>
        ) : (
          <strong
            key={pageNum}
            className={
              page === pageNum
                ? "pagination_btn pagination_active__btn"
                : "pagination_btn"
            }
            onClick={() =>
              typeof pageNum === "number" && handlePageClick(pageNum)
            }
          >
            {pageNum}
          </strong>
        )
      )}
      <Button
        className="pagination_controll__btn"
        icon="pi pi-angle-right"
        rounded
        disabled={total <= page * filter?.limit}
        onClick={nextButton}
      ></Button>
    </div>
  );
};
