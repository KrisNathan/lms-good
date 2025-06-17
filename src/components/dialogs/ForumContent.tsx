import { ThumbsUp, MessageSquare, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import EllipsisButton from "../buttons/EllipsisButton";

interface Comment {
  id: number;
  authorName: string;
  authorId: string;
  date: string;
  content: string;
  avatar?: string;
  likes: number;
  replies: number;
}

interface ForumContentProps {
  title: string;
  content: string;
  authorName?: string;
  authorDate?: string;
  authorAvatar?: string;
}

const sampleComments: Comment[] = [
  {
    id: 1,
    authorName: "Danielson",
    authorId: "280241512",
    date: "10 May 2025, 23:10 GMT+7",
    content: "vro i am literally cooked ts pmo 💔",
    likes: 0,
    replies: 0
  }
];

export default function ForumContent({ 
  title, 
  content,
  authorName = "Amogussi Cappucino",
  authorDate = "3 May 2025, 05:21 GMT+7",
  authorAvatar = "/user-icon.png"
}: ForumContentProps) {
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState("Latest Comment");
  const [showResults, setShowResults] = useState(15);

  const handleCommentSubmit = () => {
    setNewComment("");
  };

  const postDropdownItems = [
    {
      label: "Edit",
      icon: <Edit size={16} />,
      onClick: () => console.log("Edit post clicked")
    },
    {
      label: "Delete",
      icon: <Trash2 size={16} />,
      onClick: () => console.log("Delete post clicked")
    }
  ];

  const commentDropdownItems = [
    {
      label: "Edit",
      icon: <Edit size={16} />,
      onClick: () => console.log("Edit comment clicked")
    },
    {
      label: "Delete",
      icon: <Trash2 size={16} />,
      onClick: () => console.log("Delete comment clicked")
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mt-1">
            {authorName.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{authorName}</h3>
              <EllipsisButton 
                variant="secondary" 
                items={postDropdownItems}
                size="sm"
              />
            </div>
            <p className="text-sm text-gray-600">{authorDate}</p>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
        
        <div className="text-gray-700 whitespace-pre-line">
          {content}
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-500 hover:text-blue-600">
              <ThumbsUp size={16} className="mr-1" />
              <span>0</span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Discussions</h3>
        
        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment (min. 5 letters)"
            className="w-full border border-gray-200 p-3 rounded-lg resize-none shadow-sm"
            rows={4}
          />
          
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
              disabled={newComment.trim().length < 5}
            >
              Comment
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm text-blue-600 border-none bg-transparent focus:outline-none"
            >
              <option value="Latest Comment">Latest Comment</option>
              <option value="Oldest Comment">Oldest Comment</option>
              <option value="Most Liked">Most Liked</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>1 Comment</span>
            <span>Show:</span>
            <select 
              value={showResults}
              onChange={(e) => setShowResults(Number(e.target.value))}
              className="border border-gray-300 px-2 py-1 rounded"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
            <span>Page: 1</span>
          </div>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 mt-1 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {comment.authorName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">{comment.authorName}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-4 text-gray-500 text-sm">
                        <button className="flex items-center hover:text-blue-600">
                          <ThumbsUp size={14} className="mr-1" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="flex items-center hover:text-blue-600">
                          <MessageSquare size={14} className="mr-1" />
                          <span>REPLY</span>
                        </button>
                      </div>
                      <EllipsisButton 
                        variant="secondary" 
                        items={commentDropdownItems}
                        size="sm"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{comment.date}</p>
                  <div className="text-gray-700 whitespace-pre-line mb-3">
                    {comment.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}