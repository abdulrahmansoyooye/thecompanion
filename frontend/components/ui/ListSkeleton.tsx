import { Skeleton } from "@/components/ui/skeleton";

export const ListSkeleton = () => {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-14 h-14 rounded-2xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-16 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="w-10 h-10 rounded-xl" />
                        <Skeleton className="w-10 h-10 rounded-xl" />
                    </div>
                </div>
            ))}
        </div>
    );
};
