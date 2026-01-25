import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => {
    return (
        <div className="flex items-center gap-6">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-32" />
            </div>
        </div>
    );
};
