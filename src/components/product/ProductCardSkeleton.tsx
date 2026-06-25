import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border/60 bg-card shadow-sm ring-1 ring-white/[0.04]">
      <Skeleton className="aspect-square rounded-none" />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/60 pt-3.5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
    </div>
  );
}
