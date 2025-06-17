import { ThumbsUp, MessageSquare, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import EllipsisButton from "../buttons/EllipsisButton";
import ForumPopup from "./ForumPopup";
import ConfirmationDialog from "./ConfirmationDialog";

interface Comment {
  id: number;
  authorName: string;
  authorId: string;
  authorClass?: string;
  authorStatus: string;
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
  authorId?: string;
  authorClass?: string;
  authorStatus: string;
  authorDate?: string;
  authorAvatar?: string;
  onClose?: () => void;
}

const sampleComments: Comment[] = [
  {
    id: 1,
    authorName: "Danielson",
    authorId: "280241512",
    authorClass: "Computer Science",
    authorStatus: "Student",
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
  authorId = "D1234",
  authorClass = "Computer Science",
  authorStatus = "Lecturer",
  authorDate = "3 May 2025, 05:21 GMT+7",
  authorAvatar = "/user-icon.png",
  onClose
}: ForumContentProps) {
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState("Latest Comment");
  const [showResults, setShowResults] = useState(15);
  
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    type: 'post' | 'comment';
    itemId?: number;
  }>({ isOpen: false, type: 'post' });

  const handleCommentSubmit = () => {
    if (newComment.trim().length >= 5) {
      const newCommentObj: Comment = {
        id: Math.max(...comments.map(c => c.id), 0) + 1,
        authorName: "You",
        authorId: "123456",
        authorClass: "Computer Science",
        authorStatus: "Student",
        date: new Date().toLocaleString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Jakarta',
          timeZoneName: 'short'
        }),
        content: newComment.trim(),
        likes: 0,
        replies: 0
      };
      
      setComments(prev => [...prev, newCommentObj]);
      setNewComment("");
    }
  };

  const handleEditPost = () => {
    setIsEditingPost(true);
  };

  const handleSavePostEdit = () => {
    setIsEditingPost(false);
    console.log("Post edited:", { title: editedTitle, content: editedContent });
  };

  const handleCancelPostEdit = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditingPost(false);
  };

  const handleDeletePost = () => {
    setDeleteConfirmation({
      isOpen: true,
      type: 'post'
    });
  };

  const confirmDeletePost = () => {
    console.log("Post deleted");
    if (onClose) {
      onClose();
    }
  };

  const handleEditComment = (commentId: number) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditedCommentContent(comment.content);
    }
  };

  const handleSaveCommentEdit = (commentId: number) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, content: editedCommentContent }
        : comment
    ));
    setEditingCommentId(null);
    setEditedCommentContent("");
  };

  const handleCancelCommentEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent("");
  };

  const handleDeleteComment = (commentId: number) => {
    setDeleteConfirmation({
      isOpen: true,
      type: 'comment',
      itemId: commentId
    });
  };

  const confirmDeleteComment = () => {
    if (deleteConfirmation.itemId) {
      setComments(prev => prev.filter(comment => comment.id !== deleteConfirmation.itemId));
      console.log("Comment deleted:", deleteConfirmation.itemId);
    }
  };

  const postDropdownItems = [
    {
      label: "Edit",
      icon: <Edit size={16} />,
      onClick: handleEditPost
    },
    {
      label: "Delete",
      icon: <Trash2 size={16} />,
      onClick: handleDeletePost
    }
  ];

  const getCommentDropdownItems = (commentId: number) => [
    {
      label: "Edit",
      icon: <Edit size={16} />,
      onClick: () => handleEditComment(commentId)
    },
    {
      label: "Delete",
      icon: <Trash2 size={16} />,
      onClick: () => handleDeleteComment(commentId)
    }
  ];

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <ForumPopup 
              name={authorName} 
              id={authorId} 
              class={authorClass}
              status={authorStatus}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mt-1">
                {authorName.charAt(0)}
              </div>
            </ForumPopup>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{authorName}</h3>
                <EllipsisButton 
                  variant="transparent" 
                  items={postDropdownItems}
                  size="sm"
                />
              </div>
              <p className="text-sm text-gray-600">{authorDate}</p>
            </div>
          </div>
          
          {isEditingPost ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full text-xl font-bold border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Post title"
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={6}
                placeholder="Post content"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSavePostEdit}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={!editedTitle.trim() || !editedContent.trim()}
                >
                  Save
                </button>
                <button
                  onClick={handleCancelPostEdit}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{editedTitle}</h2>
              <div className="text-gray-700 whitespace-pre-line">
                {editedContent}
              </div>
            </>
          )}
          
          {!isEditingPost && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-blue-600">
                  <ThumbsUp size={16} className="mr-1" />
                  <span>0</span>
                </button>
              </div>
            </div>
          )}
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
              <span>{comments.length} Comment{comments.length !== 1 ? 's' : ''}</span>
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
                  <ForumPopup 
                    name={comment.authorName} 
                    id={comment.authorId} 
                    class={comment.authorClass}
                    status={comment.authorStatus}
                  >
                    <div className="w-8 h-8 bg-green-500 mt-1 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {comment.authorName.charAt(0)}
                    </div>
                  </ForumPopup>
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
                            <span>Reply</span>
                          </button>
                        </div>
                        <EllipsisButton 
                          variant="transparent" 
                          items={getCommentDropdownItems(comment.id)}
                          size="sm"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{comment.date}</p>
                    
                    {editingCommentId === comment.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editedCommentContent}
                          onChange={(e) => setEditedCommentContent(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          placeholder="Edit your comment"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveCommentEdit(comment.id)}
                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                            disabled={editedCommentContent.trim().length < 5}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelCommentEdit}
                            className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-700 whitespace-pre-line mb-3">
                        {comment.content}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, type: 'post' })}
        onConfirm={deleteConfirmation.type === 'post' ? confirmDeletePost : confirmDeleteComment}
        title={deleteConfirmation.type === 'post' ? "Delete Post" : "Delete Comment"}
        message={
          deleteConfirmation.type === 'post' 
            ? "Are you sure you want to delete this post? This action cannot be undone and will remove all associated comments."
            : "Are you sure you want to delete this comment? This action cannot be undone."
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
}