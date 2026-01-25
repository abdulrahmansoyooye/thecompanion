import { Skeleton } from "@/components/ui/skeleton";

export const CompanionSkeleton = () => {
    return (
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-md" />
            </div>

            <div className="mb-6">
                <Skeleton className="h-7 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="mt-auto">
                <div className="flex items-center gap-2 mb-6">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-12 w-full rounded-xl" />
            </div>
        </div>
    );
};
