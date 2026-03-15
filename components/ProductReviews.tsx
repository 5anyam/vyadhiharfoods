'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Star, MessageCircle, User, Pencil, X } from 'lucide-react';
import { toast } from '../hooks/use-toast';

interface Review {
  id: number;
  date_created?: string;
  reviewer: string;
  reviewer_email?: string;
  review: string;
  rating: number;
  images?: string[];
}

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

interface ApiMetaItem {
  key: string;
  value: unknown;
}

interface ApiReview {
  id: number;
  date_created?: string;
  reviewer?: string;
  reviewer_email?: string;
  review?: string;
  rating?: number;
  meta_data?: ApiMetaItem[];
}

const isApiMetaItem = (m: unknown): m is ApiMetaItem =>
  typeof m === 'object' && m !== null && 'key' in m && 'value' in m &&
  typeof (m as Record<string, unknown>).key === 'string';

const isApiReview = (r: unknown): r is ApiReview =>
  typeof r === 'object' && r !== null &&
  typeof (r as Record<string, unknown>).id === 'number';

const stripHtml = (html: string): string => {
  if (!html) return '';
  const noP = html.replace(/<\/?p[^>]*>/gi, '\n').replace(/<br\s*\/?>/gi, '\n');
  const text = noP.replace(/<[^>]+]/g, '');
  return text.replace(/\n{3,}/g, '\n\n').trim();
};

const REVIEWS_API = '/api/reviews';

const StarRating = ({
  rating,
  onChange,
  interactive = false,
  size = 'md',
}: {
  rating: number;
  onChange?: (value: number) => void;
  interactive?: boolean;
  size?: 'sm' | 'md';
}) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => interactive && onChange?.(star)}
        className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        aria-label={`Rate ${star}`}
        disabled={!interactive}
      >
        {star <= rating ? (
          <StarIcon className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} text-[#D4A574] fill-[#D4A574]`} />
        ) : (
          <StarOutlineIcon className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} text-gray-300`} />
        )}
      </button>
    ))}
  </div>
);

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productName }) => {
  const [reviews, setReviews]       = useState<Review[]>([]);
  const [loading, setLoading]       = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showForm, setShowForm]     = useState<boolean>(false);

  const [formData, setFormData] = useState({
    reviewer: '',
    reviewer_email: '',
    review: '',
    rating: 0,
  });

  const parseImageUrlsFromMeta = (meta?: ApiMetaItem[]): string[] | undefined => {
    if (!Array.isArray(meta)) return undefined;
    const urlsItem = meta.find((m) => isApiMetaItem(m) && m.key === 'amraj_review_image_urls');
    if (!urlsItem) return undefined;
    const v = urlsItem.value;
    if (Array.isArray(v) && v.every((x) => typeof x === 'string')) return v as string[];
    return undefined;
  };

  const loadReviews = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch(`${REVIEWS_API}?product_id=${productId}`);
      if (!res.ok) { setReviews([]); return; }

      const data: unknown = await res.json();
      const list: ApiReview[] = Array.isArray(data) ? data.filter(isApiReview) : [];

      setReviews(list.map((rev) => ({
        id:             rev.id,
        reviewer:       rev.reviewer ? String(rev.reviewer) : 'Anonymous',
        reviewer_email: rev.reviewer_email ? String(rev.reviewer_email) : undefined,
        review:         stripHtml(rev.review ? String(rev.review) : ''),
        rating:         typeof rev.rating === 'number' ? rev.rating : 0,
        date_created:   rev.date_created ? String(rev.date_created) : undefined,
        images:         parseImageUrlsFromMeta(rev.meta_data),
      })));
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) void loadReviews();
  }, [productId, loadReviews]);

  const submitReview = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!formData.reviewer || !formData.review || formData.rating === 0) {
      toast({ title: 'Error', description: 'Please fill all fields and select a rating', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(REVIEWS_API, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id:     productId,
          review:         formData.review,
          reviewer:       formData.reviewer,
          reviewer_email: formData.reviewer_email || '',
          rating:         formData.rating,
          status:         'approved',
        }),
      });

      if (!res.ok) {
        const errTxt = await res.text();
        throw new Error(errTxt || 'Failed to submit review');
      }

      toast({ title: '🎉 Thank you!', description: 'Your review has been submitted.' });
      setFormData({ reviewer: '', reviewer_email: '', review: '', rating: 0 });
      setShowForm(false);
      await loadReviews();
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to submit review',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce<number>((acc, r) => acc + (r.rating || 0), 0) / reviews.length
      : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  return (
    <div className="bg-white rounded-3xl border border-[#D4A574]/20 shadow-sm overflow-hidden">

      {/* ── Header ── */}
      <div className="px-6 sm:px-10 pt-10 pb-8 border-b border-[#D4A574]/15">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-[#FFF8DC] rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-[#D4A574] fill-[#D4A574]" />
          </div>
          <span className="text-xs font-bold text-[#D4A574] uppercase tracking-widest">Reviews</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D2F1F] tracking-tight mb-1">
              Customer Reviews
            </h2>
            <p className="text-sm text-gray-500">{productName}</p>
          </div>

          {/* Average Rating + Bar Chart */}
          <div className="flex items-start gap-6">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-[#3D2F1F] leading-none mb-1">
                {averageRating > 0 ? averageRating.toFixed(1) : '—'}
              </div>
              <StarRating rating={Math.round(averageRating)} size="sm" />
              <p className="text-xs text-gray-400 mt-1">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
            </div>

            {reviews.length > 0 && (
              <div className="space-y-1.5 min-w-[140px]">
                {ratingCounts.map(({ star, count }) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-3">{star}</span>
                    <StarIcon className="w-3 h-3 text-[#D4A574] fill-[#D4A574] flex-shrink-0" />
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D4A574] rounded-full transition-all duration-500"
                        style={{ width: reviews.length > 0 ? `${(count / reviews.length) * 100}%` : '0%' }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-4 text-right">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-6">

        {/* ── Write Review Button ── */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm((s) => !s)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl border-2 transition-all ${
              showForm
                ? 'border-gray-200 text-gray-500 hover:bg-gray-50'
                : 'border-[#D4A574] text-[#5D4E37] hover:bg-[#FFF8DC]'
            }`}
          >
            {showForm
              ? <><X className="w-4 h-4" /> Cancel</>
              : <><Pencil className="w-4 h-4" /> Write a Review</>
            }
          </button>
        </div>

        {/* ── Review Form ── */}
        {showForm && (
          <form
            onSubmit={submitReview}
            className="mb-8 bg-[#FFFDF7] border border-[#D4A574]/25 rounded-2xl p-5 sm:p-6 space-y-4"
          >
            <h3 className="text-base font-bold text-[#3D2F1F] flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#D4A574]" />
              Share Your Experience
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.reviewer}
                  onChange={(e) => setFormData((s) => ({ ...s, reviewer: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-[#D4A574] focus:outline-none text-sm bg-white transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
                <input
                  type="email"
                  value={formData.reviewer_email}
                  onChange={(e) => setFormData((s) => ({ ...s, reviewer_email: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-[#D4A574] focus:outline-none text-sm bg-white transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Your Rating *</label>
              <div className="flex items-center gap-3">
                <StarRating
                  rating={formData.rating}
                  onChange={(v) => setFormData((s) => ({ ...s, rating: v }))}
                  interactive
                />
                {formData.rating > 0 && (
                  <span className="text-xs font-semibold text-[#D4A574]">
                    {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][formData.rating]}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Your Review *</label>
              <textarea
                required
                value={formData.review}
                onChange={(e) => setFormData((s) => ({ ...s, review: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-[#D4A574] focus:outline-none text-sm resize-none bg-white transition-colors"
                placeholder="Tell others about your experience..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-xl font-bold text-sm text-white transition-all ${
                submitting
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] shadow-md hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}

        {/* ── Reviews List ── */}
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#D4A574] border-t-transparent" />
            <p className="text-sm text-gray-400 font-medium">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-14 flex flex-col items-center justify-center gap-3 border border-dashed border-[#D4A574]/30 rounded-2xl bg-[#FFFDF7]">
            <div className="w-12 h-12 bg-[#FFF8DC] rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-[#D4A574]" />
            </div>
            <p className="font-bold text-[#3D2F1F]">No Reviews Yet</p>
            <p className="text-sm text-gray-400">Be the first to review {productName}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="p-5 sm:p-6 border border-gray-100 rounded-2xl bg-white hover:border-[#D4A574]/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A574] to-[#C19A6B] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <p className="font-bold text-sm text-[#3D2F1F] truncate">
                        {r.reviewer || 'Anonymous'}
                      </p>
                      <CheckBadgeIcon className="h-4 w-4 text-[#D4A574] flex-shrink-0" title="Verified" />
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={r.rating || 0} size="sm" />
                      {r.date_created && (
                        <span className="text-xs text-gray-400">
                          {new Date(r.date_created).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#5D4E37] leading-relaxed whitespace-pre-wrap pl-[52px]">
                  {stripHtml(r.review || '')}
                </p>

                {Array.isArray(r.images) && r.images.length > 0 && (
                  <div className="mt-4 pl-[52px] grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {r.images.map((src, i) => (
                      <img
                        key={`${r.id}-${i}`}
                        src={src}
                        alt="Review image"
                        className="w-full h-16 sm:h-20 object-cover border border-[#D4A574]/20 rounded-lg hover:scale-105 transition-transform cursor-pointer"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
