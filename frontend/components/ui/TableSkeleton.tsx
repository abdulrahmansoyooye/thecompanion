import { Skeleton } from "@/components/ui/skeleton";

export const TableSkeleton = () => {
    return (
        <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between py-5 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                    <Skeleton className="h-7 w-20 rounded-full" />
                    <Skeleton className="h-5 w-16" />
                </div>
            ))}
        </div>
    );
};
