interface Props {
  courseCode: string;
  professorName: string;
  professorTitle: string;
  postTitle: string;
  postDate: string;
  replyCount: number;
  onClick?: () => void;
}

export default function ForumPostCard({ 
  courseCode, 
  professorName, 
  professorTitle, 
  postTitle, 
  postDate, 
  replyCount,
  onClick,
}: Props) {
  const CardContent = (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm w-full flex flex-col cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="px-5 pt-4 text-sm text-gray-700">
        <span className="font-medium">{courseCode}</span>
        <span className="mx-1.5">-</span>
        <span>Prof. {professorName}, {professorTitle}</span>
      </div>
      
      <h2 className="px-5 my-2 text-xl font-semibold text-gray-900">
        {postTitle}
      </h2>
      
      <div className="px-5 pb-4 text-sm text-gray-600">
        {postDate}
      </div>
      
      <div className="bg-blue-50 px-5 py-3 mt-auto">
        <div className="text-sm font-medium text-blue-600">
          {replyCount} {replyCount === 1 ? 'Reply' : 'Replies'}
        </div>
      </div>
    </div>
  );
  return CardContent;
}