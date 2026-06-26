import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

type ProductTableSkeletonProps = {
  rows: number;
};

const ProductTableSkeleton = ({ rows }: ProductTableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <TableRow key={i}>
          <TableCell className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-14" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-8" />
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default ProductTableSkeleton;
