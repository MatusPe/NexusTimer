import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export const TablePagination = ({
  page = 0,
  pages,
  searchTerm = '',
  selectedRegion,
}: {
  page: number;
  pages: number;
  searchTerm?: string | null | undefined;
  selectedRegion?: string;
}) => {

  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams();
    if (searchTerm) {
      newSearchParams.set('search', searchTerm);
    }
    if (selectedRegion && selectedRegion !== 'all') {
      newSearchParams.set('region', selectedRegion);
    } else {
      newSearchParams.delete('region');
    }
    newSearchParams.set('page', newPage.toString());
    router.push(`/people?${newSearchParams.toString()}`);
  }

  return (
    <Pagination className={"pb-2"}>
      <PaginationContent>
        <PaginationItem>
          {page > 0 && <PaginationPrevious
            href={'#'} onClick={(e) => {
            e.preventDefault();
            handlePageChange(Number(page) - 1)
          }}
          />}
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>{Number(page)}</PaginationLink>
        </PaginationItem>
        {pages > 0 && page < pages && (
          <PaginationItem>
            <PaginationNext
              href="#" onClick={(e) => {
              e.preventDefault();
              handlePageChange(Number(page) + 1)
            }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
