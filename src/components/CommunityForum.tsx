import React, { useState } from 'react';
import { COMMUNITY_POSTS_INITIAL } from '../data/communityData';
import type { CommunityPost } from '../types/agriculture';
import { ThumbsUp, MessageSquare, Send, Plus, X, MapPin } from 'lucide-react';

const STORAGE_POSTS_KEY = 'terracrop_forum_posts_v1';
const STORAGE_LIKES_KEY = 'terracrop_forum_likes_v1';

const sanitizeText = (val: string): string => {
  return val.replace(/<[^>]*>?/gm, '').trim();
};

export const CommunityForum: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_POSTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return COMMUNITY_POSTS_INITIAL;
  });

  const [likedPostIds, setLikedPostIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LIKES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('Backyard Gardener');
  const [newLocation, setNewLocation] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState<'Beginner Advice' | 'Pest Emergency' | 'Soil & Water' | 'Harvest & Storing' | 'Climate Shifts'>('Beginner Advice');
  const [newCrop, setNewCrop] = useState('');

  const tags = ['All', 'Beginner Advice', 'Pest Emergency', 'Soil & Water', 'Harvest & Storing', 'Climate Shifts'];

  // Persist posts
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
    } catch {
      // storage unavailable or full
    }
  }, [posts]);

  // Persist likes
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LIKES_KEY, JSON.stringify(likedPostIds));
    } catch {
      // storage unavailable or full
    }
  }, [likedPostIds]);

  const filteredPosts = posts.filter(
    (p) => selectedTag === 'All' || p.categoryTag === selectedTag
  );

  const handleToggleLike = (postId: string) => {
    const isLiked = likedPostIds.includes(postId);
    const nextLiked = isLiked
      ? likedPostIds.filter((id) => id !== postId)
      : [...likedPostIds, postId];
    setLikedPostIds(nextLiked);

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likes: isLiked ? Math.max(0, p.likes - 1) : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  const handleAddReply = (postId: string) => {
    const raw = (replyInputs[postId] || '');
    const clean = sanitizeText(raw);
    if (!clean || clean.length < 2) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            replies: [
              ...p.replies,
              {
                id: `reply-${Date.now()}`,
                authorName: 'You (Community Member)',
                authorRole: 'Grower',
                text: clean.slice(0, 800),
                timestamp: 'Just now',
              },
            ],
          };
        }
        return p;
      })
    );
    setReplyInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const title = sanitizeText(newTitle);
    const author = sanitizeText(newAuthor);
    const content = sanitizeText(newContent);
    const location = sanitizeText(newLocation);
    const crop = sanitizeText(newCrop);

    if (title.length < 5) {
      setFormError('Please enter a descriptive title of at least 5 characters.');
      return;
    }
    if (author.length < 2) {
      setFormError('Please enter your name or handle (min 2 characters).');
      return;
    }
    if (content.length < 15) {
      setFormError('Please provide more context or details (at least 15 characters).');
      return;
    }

    const created: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: author.slice(0, 50),
      authorRole: newRole,
      location: (location || 'Regional Garden').slice(0, 60),
      title: title.slice(0, 120),
      content: content.slice(0, 2000),
      categoryTag: newTag,
      cropMentioned: (crop || 'General').slice(0, 40),
      likes: 1,
      replies: [],
      timestamp: 'Just now',
    };

    setPosts([created, ...posts]);
    setLikedPostIds((prev) => [...prev, created.id]);
    setIsNewPostModalOpen(false);

    // Reset fields
    setNewTitle('');
    setNewAuthor('');
    setNewLocation('');
    setNewContent('');
    setNewCrop('');
    setFormError(null);
  };

  return (
    <section id="community-forum" className="py-16 lg:py-24 bg-[#F5F8F4] border-t border-[#E2E8DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-[#2D6A4F] uppercase">
              Community Knowledge Exchange
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C251D] mt-1 tracking-tight">
              Wisdom from local fields and backyard beds
            </h2>
            <p className="text-base text-[#4A5568] mt-2 leading-relaxed">
              Real gardeners and farmers answering questions, sharing climate adaptations, and troubleshooting pests together.
            </p>
          </div>

          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#22543D] rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Share Tip or Ask Question</span>
          </button>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-[#1C251D] text-white shadow-xs'
                  : 'bg-white text-[#4A5568] border border-[#CBD5E1] hover:border-[#94A3B8]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Post Feeds */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-[#E2E8DE] rounded-xl p-6 sm:p-7 shadow-xs space-y-4"
            >
              {/* Author Row & Clean Unboxed Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0F4ED]">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#1C251D]">{post.authorName}</span>
                  <span className="text-[#64748B]">({post.authorRole})</span>
                  <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
                  <span className="text-[#64748B] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#2D6A4F]" />
                    {post.location}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <span>Topic: <strong className="text-[#1C251D]">{post.categoryTag}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>

              {/* Title & Body */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[#1C251D]">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Action Buttons: Like, Comment count */}
              <div className="flex items-center justify-between pt-2 text-xs border-t border-[#F0F4ED]">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center gap-1.5 font-semibold transition-colors group ${
                      likedPostIds.includes(post.id)
                        ? 'text-[#2D6A4F]'
                        : 'text-[#4A5568] hover:text-[#2D6A4F]'
                    }`}
                  >
                    <ThumbsUp
                      className={`w-3.5 h-3.5 group-hover:scale-110 transition-transform ${
                        likedPostIds.includes(post.id) ? 'fill-[#2D6A4F] text-[#2D6A4F]' : ''
                      }`}
                    />
                    <span>{likedPostIds.includes(post.id) ? 'Liked' : 'Helpful'} ({post.likes})</span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)
                    }
                    className="flex items-center gap-1.5 text-[#4A5568] hover:text-[#1C251D] font-medium transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>
                      {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
                    </span>
                  </button>
                </div>

                <div className="text-[11px] text-[#64748B]">
                  Crop focus: <strong className="text-[#2D6A4F]">{post.cropMentioned}</strong>
                </div>
              </div>

              {/* Replies Drawer */}
              {activeReplyPostId === post.id && (
                <div className="mt-4 pt-4 border-t border-[#F0F4ED] space-y-3 bg-[#FBFBF9] p-4 rounded-xl">
                  <div className="text-xs font-bold text-[#1C251D]">Grower Discussion</div>

                  {post.replies.length === 0 ? (
                    <div className="text-xs text-[#64748B] italic">
                      No replies yet. Be the first to share your experience!
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {post.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="p-3 bg-white border border-[#E2E8DE] rounded-lg text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[#64748B]">
                            <span className="font-semibold text-[#1C251D]">{reply.authorName}</span>
                            <span>{reply.timestamp}</span>
                          </div>
                          <p className="text-[#334155] leading-normal">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add reply composer */}
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Add practical advice or answer this question..."
                      value={replyInputs[post.id] || ''}
                      onChange={(e) =>
                        setReplyInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddReply(post.id);
                        }
                      }}
                      className="flex-1 bg-white border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                    />
                    <button
                      onClick={() => handleAddReply(post.id)}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#22543D] rounded-lg flex items-center gap-1 transition-colors shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* New Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#CBD5E1] shadow-xl p-6 sm:p-8 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-[#E2E8DE]">
              <div>
                <div className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
                  Community Post
                </div>
                <h3 className="text-xl font-bold text-[#1C251D]">
                  Share a Garden Tip or Question
                </h3>
              </div>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#1C251D] hover:bg-[#F1F5F0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
                  {formError}
                </div>
              )}
              <div>
                <label className="block font-semibold text-[#1C251D] mb-1">
                  Title / Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How we solved cabbage moth caterpillars naturally"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#FBFBF9] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1C251D] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Robin Lee"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-[#FBFBF9] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1C251D] mb-1">
                    Grower Role
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full bg-[#FBFBF9] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  >
                    <option value="Backyard Gardener">Backyard Gardener</option>
                    <option value="Community Grower">Community Grower</option>
                    <option value="Smallholder Farmer">Smallholder Farmer</option>
                    <option value="Educator / Student">Educator / Student</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1C251D] mb-1">
                    Location / Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sonoma County, CA"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-[#FBFBF9] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1C251D] mb-1">
                    Category Tag
                  </label>
                  <select
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value as any)}
                    className="w-full bg-[#FBFBF9] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  >
                    <option value="Beginner Advice">Beginner Advice</option>
                    <option value="Pest Emergency">Pest Emergency</option>
                    <option value="Soil & Water">Soil & Water</option>
                    <option value="Harvest & Storing">Harvest & Storing</option>
                    <option value="Climate Shifts">Climate Shifts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1C251D] mb-1">
                  Crop Mentioned (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tomato, Green Beans, Spinach"
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full bg-[#FBFBF9] border border-[#CBD5E1] rounded-lg px-3 py-2 text-sm text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C251D] mb-1">
                  Experience / Question Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe what you observed, what you tested, and any practical outcome..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-[#FBFBF9] border border-[#CBD5E1] rounded-lg p-3 text-sm text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E2E8DE]">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#1C251D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#22543D] rounded-lg transition-colors"
                >
                  Publish to Forum
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
