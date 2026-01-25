import { Skeleton } from "@/components/ui/skeleton";

export const LessonSkeleton = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col min-h-[calc(100vh-80px)]">
            {/* Top Header Card Skeleton */}
            <div className="bg-white border border-gray-100 rounded-3xl px-6 py-4 flex items-center justify-between gap-4 mb-8 shadow-sm">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-14 h-14 rounded-2xl" />
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-5 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-40" />
                    </div>
                </div>
                <Skeleton className="h-6 w-16" />
            </div>

            {/* Main Grid Content Skeleton */}
            <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6 mb-8">
                {/* Center Companion Focus Area Skeleton */}
                <div className="lg:col-span-9 bg-white rounded-3xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 min-h-[400px]">
                    <div className="flex flex-col items-center gap-8">
                        <Skeleton className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl" />
                        <div className="space-y-3 flex flex-col items-center">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls Skeleton */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                    <div className="hidden lg:flex flex-1 bg-gray-50 border-2 border-dashed border-gray-100 rounded-3xl items-center justify-center">
                        <Skeleton className="h-8 w-16" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-24 rounded-2xl" />
                        <Skeleton className="h-24 rounded-2xl" />
                    </div>

                    <Skeleton className="h-16 w-full rounded-2xl" />
                </div>
            </div>

            {/* Footer Transcription Area Skeleton */}
            <div className="flex flex-col items-center justify-center text-center px-12 min-h-[100px] mb-6">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-5 w-1/2" />
            </div>
        </div>
    );
};
