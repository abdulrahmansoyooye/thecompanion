import { Lesson } from '@/types/types';

interface RecentLessonsProps {
    lesson: Lesson;
}

export const RecentLessons: React.FC<RecentLessonsProps> = ({ lesson }) => {
    return (
        <tr key={lesson.id} className="group hover:bg-gray-50 transition-colors">
            <td className="py-5 pr-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-xl">
                    {lesson.icon}
                </div>
                <div>
                    <div className="font-bold text-gray-900">{lesson.name}</div>
                    <div className="text-sm text-gray-500">Topic: {lesson.topic}</div>
                </div>
            </td>
            <td className="py-5">
                <span className="bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {lesson.subject}
                </span>
            </td>
            <td className="py-5 font-medium text-gray-700">{lesson.duration}</td>
        </tr>
    )
}