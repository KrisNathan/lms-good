import { useRef, useEffect, useState } from "react";
import ForumPostCard from "../cards/ForumPostCard";
import ForumDialog from "../dialogs/ForumDialog";

interface Session {
  id: number;
  title: string;
  Posts: number;
  unreadPosts: number;
  isActive?: boolean;
}

interface ForumPost {
  id: number;
  sessionId: number;
  courseCode: string;
  professorName: string;
  professorTitle: string;
  postTitle: string;
  postContent: string;
  postDate: string;
  replyCount: number;
  authorStatus: string;
  isUnread?: boolean;
}

const defaultSessions: Session[] = [
  { id: 1, title: "Session 1", Posts: 1, unreadPosts: 1, isActive: false },
  { id: 2, title: "Session 2", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 3, title: "Session 3", Posts: 1, unreadPosts: 0, isActive: false },
  { id: 4, title: "Session 4", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 5, title: "Session 5", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 6, title: "Session 6", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 7, title: "Session 7", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 8, title: "Session 8", Posts: 1, unreadPosts: 1, isActive: false },
  { id: 9, title: "Session 9", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 10, title: "Session 10", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 11, title: "Session 11", Posts: 1, unreadPosts: 0, isActive: false },
  { id: 12, title: "Session 12", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 13, title: "Session 13", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 14, title: "Session 14", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 15, title: "Session 15", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 16, title: "Session 16", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 17, title: "Session 17", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 18, title: "Session 18", Posts: 1, unreadPosts: 0, isActive: false },
  { id: 19, title: "Session 19", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 20, title: "Session 20", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 21, title: "Session 21", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 22, title: "Session 22", Posts: 1, unreadPosts: 0, isActive: false },
  { id: 23, title: "Session 23", Posts: 0, unreadPosts: 0, isActive: false },
  { id: 24, title: "Session 24", Posts: 0, unreadPosts: 0, isActive: false },
];

const sampleForumPosts: ForumPost[] = [
  {
    id: 1,
    sessionId: 1,
    courseCode: "D1234",
    professorName: "Amogusussi Cappuccino",
    professorTitle: "Ph.D.",
    postTitle: "Introduction to Computer Science",
    postContent: "how are you guys doing on comsputer science are you guys okay",
    postDate: "3 May 2025",
    replyCount: 1,
    authorStatus: "Lecturer",
    isUnread: true
  },
  {
    id: 2,
    sessionId: 3,
    courseCode: "D1235",
    professorName: "John Doe",
    professorTitle: "M.Sc.",
    postTitle: "Assignment 1 Discussion",
    postContent: "Let's discuss the first assignment requirements and any questions you might have.",
    postDate: "5 May 2025",
    replyCount: 1,
    authorStatus: "Teaching Assistant",
    isUnread: false
  },
  {
    id: 3,
    sessionId: 8,
    courseCode: "D1236",
    professorName: "Jane Smith",
    professorTitle: "M.E.",
    postTitle: "Midterm Preparation",
    postContent: "Here are some tips for preparing for the upcoming midterm examination.",
    postDate: "8 May 2025",
    replyCount: 1,
    authorStatus: "Professor",
    isUnread: true
  },
  {
    id: 4,
    sessionId: 11,
    courseCode: "D1237",
    professorName: "Alice Johnson",
    professorTitle: "Ph.D.",
    postTitle: "Advanced Data Structures",
    postContent: "Today we'll be covering advanced data structures including B-trees, Red-Black trees, and their practical applications in database systems.",
    postDate: "10 May 2025",
    replyCount: 1,
    authorStatus: "Professor",
    isUnread: false
  },
  {
    id: 5,
    sessionId: 18,
    courseCode: "D1238",
    professorName: "Michael Chen",
    professorTitle: "Ph.D.",
    postTitle: "Machine Learning Fundamentals",
    postContent: "This session introduces the core concepts of machine learning, including supervised and unsupervised learning algorithms.",
    postDate: "12 May 2025",
    replyCount: 1,
    authorStatus: "Professor",
    isUnread: false
  },
  {
    id: 6,
    sessionId: 22,
    courseCode: "D1239",
    professorName: "Sarah Williams",
    professorTitle: "Ph.D.",
    postTitle: "Software Engineering Best Practices",
    postContent: "Let's discuss modern software engineering practices including version control, testing strategies, and code review processes.",
    postDate: "15 May 2025",
    replyCount: 1,
    authorStatus: "Professor",
    isUnread: false
  }
];

function SessionHorizontalTab({ sessions, onSessionClick, selectedSessionId }: {
  sessions: Session[];
  onSessionClick: (sessionId: number | null) => void;
  selectedSessionId: number | null;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const hasOverflow = container.scrollWidth > container.clientWidth;
      setIsScrollable(hasOverflow);
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (scrollContainer) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
        updateScrollButtons();
      }
    };

    const handleScroll = () => {
      updateScrollButtons();
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
      scrollContainer.addEventListener("scroll", handleScroll);
      updateScrollButtons();
      
      const resizeObserver = new ResizeObserver(updateScrollButtons);
      resizeObserver.observe(scrollContainer);
      
      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel);
        scrollContainer.removeEventListener("scroll", handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, []);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full relative">
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:bg-gray-50 group"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <div className="absolute top-full left-0 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-30">
            Scroll left (or use mouse wheel)
          </div>
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:bg-gray-50 group"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div className="absolute top-full right-0 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-30">
            Scroll right (or use mouse wheel)
          </div>
        </button>
      )}

      {isScrollable && canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 rounded-l-2xl"></div>
      )}
      
      {isScrollable && canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 rounded-r-2xl"></div>
      )}

      <div
        ref={scrollContainerRef}
        className="flex flex-row rounded-2xl border border-slate-200 overflow-x-auto scrollbar-thin relative"
        style={{
          scrollbarWidth: "none",
          scrollbarColor: "#cbd5e1 #f1f5f9",
        }}
      >
        <button
          onClick={() => onSessionClick(null)}
          className={`p-3 whitespace-nowrap flex-shrink-0 relative min-w-[140px] transition-colors cursor-pointer ${
            selectedSessionId === null 
              ? 'bg-blue-500 text-white' 
              : 'bg-white hover:bg-gray-100 text-gray-900'
          }`}
        >
          <div className="flex flex-col items-start space-y-1">
            <div className={`text-xs font-semibold ${
              selectedSessionId === null ? 'text-blue-100' : 'text-gray-600'
            }`}>
              All Posts
            </div>
            
            <div className="h-4">
              <div className="text-xs">&nbsp;</div>
            </div>
            
            <div className={`font-semibold text-sm ${
              selectedSessionId === null ? 'text-white' : 'text-gray-900'
            }`}>
              All Forums
            </div>
          </div>
        </button>

        {sessions.map((session) => {
          const isActive = selectedSessionId === session.id;
          return (
            <button
              key={session.id}
              onClick={() => onSessionClick(session.id)}
              className={`p-3 whitespace-nowrap flex-shrink-0 relative min-w-[140px] transition-colors cursor-pointer ${
                isActive 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-900'
              }`}
            >
              {session.unreadPosts > 0 && (
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                  isActive ? 'bg-orange-300' : 'bg-orange-400'
                }`}></div>
              )}
              
              <div className="flex flex-col items-start space-y-1">
                <div className={`text-xs font-semibold ${
                  isActive ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  {session.Posts > 0 ? `${session.Posts} Posts` : 'No Posts'}
                </div>
                
                <div className="h-4">
                  {session.unreadPosts > 0 ? (
                    <div className={`text-xs font-semibold ${
                      isActive ? 'text-orange-200' : 'text-orange-500'
                    }`}>
                      {session.unreadPosts} Unread Post
                    </div>
                  ) : (
                    <div className="text-xs">&nbsp;</div>
                  )}
                </div>
                
                <div className={`font-semibold text-sm ${
                  isActive ? 'text-white' : 'text-gray-900'
                }`}>
                  {session.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface Props {
  activeSessions?: Session[];
}

export default function ForumTab({ activeSessions = defaultSessions }: Props) {
  const [sessions, setSessions] = useState<Session[]>(activeSessions);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(sampleForumPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);

  const handleSessionClick = (sessionId: number | null) => {
    setSelectedSessionId(sessionId);
    
    // If a specific session is clicked and it has unread posts, mark them as read
    if (sessionId !== null) {
      const session = sessions.find(s => s.id === sessionId);
      if (session && session.unreadPosts > 0) {
        // Mark all posts in this session as read
        setForumPosts(prevPosts => 
          prevPosts.map(post => 
            post.sessionId === sessionId 
              ? { ...post, isUnread: false }
              : post
          )
        );
        
        // Update session to have 0 unread posts
        setSessions(prevSessions => 
          prevSessions.map(s => 
            s.id === sessionId 
              ? { ...s, unreadPosts: 0 }
              : s
          )
        );
      }
    }
  };

  const handlePostCardClick = (post: ForumPost) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPost(null);
  };

  const handlePostDeleted = () => {
    if (selectedPost) {
      setForumPosts(prevPosts => prevPosts.filter(post => post.id !== selectedPost.id));
      setSessions(prevSessions => 
        prevSessions.map(session => {
          if (session.id === selectedPost.sessionId) {
            return {
              ...session,
              Posts: Math.max(0, session.Posts - 1),
              unreadPosts: selectedPost.isUnread ? Math.max(0, session.unreadPosts - 1) : session.unreadPosts
            };
          }
          return session;
        })
      );
    }
    handleCloseDialog();
  };

  const filteredPosts = selectedSessionId === null 
    ? forumPosts 
    : forumPosts.filter(post => post.sessionId === selectedSessionId);

  return (
    <div className="w-full">
      <div className="mb-5">
        <SessionHorizontalTab 
          sessions={sessions} 
          onSessionClick={handleSessionClick} 
          selectedSessionId={selectedSessionId}
        />
      </div>
      
      {filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <ForumPostCard
              key={post.id}
              courseCode={post.courseCode}
              professorName={post.professorName}
              professorTitle={post.professorTitle}
              postTitle={post.postTitle}
              postDate={post.postDate}
              replyCount={post.replyCount}
              onClick={() => handlePostCardClick(post)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No posts available</p>
          <p className="text-sm">Posts will appear here when they are created.</p>
        </div>
      )}
      
      {selectedPost && (
        <ForumDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onPostDeleted={handlePostDeleted}
          title={selectedPost.postTitle}
          content={selectedPost.postContent}
          authorName={selectedPost.professorName}
          authorDate={selectedPost.postDate}
          authorStatus={selectedPost.authorStatus}
        />
      )}
    </div>
  );
}