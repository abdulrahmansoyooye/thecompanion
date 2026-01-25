import { Skeleton } from "@/components/ui/skeleton";

export const StatsSkeleton = () => {
    return (
        <div className="flex gap-4">
            {[1, 2].map((i) => (
                <div key={i} className="bg-white border border-gray-200 p-6 rounded-4xl shadow-sm flex items-center gap-4 min-w-[200px]">
                    <Skeleton className="w-12 h-12 rounded-2xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-8" />
                        <Skeleton className="h-3 w-28" />
                    </div>
                </div>
            ))}
        </div>
    );
};
