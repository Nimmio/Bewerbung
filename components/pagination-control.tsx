"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationControlProps {
  totalItems: number;
  pageSize?: number;
  currentPage?: number;
  siblingsCount?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
}

export function PaginationControl({
  totalItems,
  pageSize = 10,
  siblingsCount = 1,
  onPageChange,
  onPageSizeChange,
  className,
  currentPage = 1,
}: PaginationControlProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange?.(page);
    }
  };

  const handlePageSizeChange = (value: string) => {
    const newPageSize = Number.parseInt(value);
    onPageSizeChange?.(newPageSize);
  };

  // Generate page numbers to display
  const generatePagination = () => {
    // Always show first page
    const pagination: (number | string)[] = [1];

    // Calculate range of pages to show
    const leftSiblingIndex = Math.max(currentPage - siblingsCount, 2);
    const rightSiblingIndex = Math.min(
      currentPage + siblingsCount,
      totalPages - 1
    );

    // Add dots if there's a gap
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    // Generate the middle range
    if (shouldShowLeftDots) {
      pagination.push("...");
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pagination.push(i);
    }

    if (shouldShowRightDots) {
      pagination.push("...");
    }

    // Always show last page if we have more than 1 page
    if (totalPages > 1) {
      pagination.push(totalPages);
    }

    return pagination;
  };

  const pages = generatePagination();

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center space-x-2">
        <p className="text-sm text-muted-foreground">
          Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
        </p>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Items per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 50, 100].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          aria-label="Go to first page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center">
          {pages.map((page, i) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${i}`}
                  className="px-2 text-muted-foreground"
                >
                  ...
                </span>
              );
            }

            return (
              <Button
                key={`page-${page}`}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className="h-8 w-8 mx-0.5"
                onClick={() => handlePageChange(page as number)}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Go to last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
