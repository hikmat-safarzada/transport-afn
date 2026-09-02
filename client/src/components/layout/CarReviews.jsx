"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { updateReview } from "@/services/api.service";
import { Pencil, Trash2, Star, StarHalf } from "lucide-react";

const renderStars = (ratingValue, size = 16) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (ratingValue >= i) {
      stars.push(<Star key={i} size={size} fill="#facc15" color="#facc15" />);
    } else if (ratingValue >= i - 0.5) {
      stars.push(<StarHalf key={i} size={size} fill="#facc15" color="#facc15" />);
    } else {
      stars.push(<Star key={i} size={size} color="#d1d5db" />);
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
};

export default function CarReviews({ carId, currentUser }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);

  const [editingReview, setEditingReview] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentUserId = currentUser?._id;

  useEffect(() => {
    if (!carId) return;

    const getReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/car/${carId}`, {
          method: "GET",
          credentials: "include",
        });

        const text = await response.text();

        if (!response.ok) {
          throw new Error(`Reviews gətirilə bilmədi. Status: ${response.status}`);
        }

        const data = JSON.parse(text);
        setReviews(data.reviews || []);
      } catch (error) {
        console.error(error);
      }
    };

    getReviews();
  }, [carId]);

  let averageRating = 0;

  if (reviews.length > 0) {
    let total = 0;
    reviews.forEach((review) => {
      total += Number(review.rating);
    });
    averageRating = (total / reviews.length).toFixed(1);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    if (!currentUserId) {
      setError("Əvvəlcə hesabınıza daxil olun.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const body = {
        car: carId,
        rating: rating,
        comment: comment,
      };

      const response = await fetch(`/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data.message || "Review yaradıla bilmədi");
      }

      setComment("");
      setRating(5);

      const reviewsResponse = await fetch(`/api/reviews/car/${carId}`, {
        method: "GET",
        credentials: "include",
      });

      const reviewsText = await reviewsResponse.text();
      const reviewsData = JSON.parse(reviewsText);

      setReviews(reviewsData.reviews || []);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    const answer = confirm("Bu rəyi silmək istəyirsiniz?");

    if (!answer) {
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data.message || "Review silinə bilmədi");
      }

      const reviewsResponse = await fetch(`/api/reviews/car/${carId}`, {
        method: "GET",
        credentials: "include",
      });

      const reviewsText = await reviewsResponse.text();
      const reviewsData = JSON.parse(reviewsText);

      setReviews(reviewsData.reviews || []);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleUpdate = async (reviewId) => {
    try {
      setLoading(true);

      await updateReview(reviewId, {
        comment: editComment,
        rating: editRating,
      });

      setEditingReview(null);

      const response = await fetch(`/api/reviews/car/${carId}`, {
        method: "GET",
        credentials: "include",
      });

      const dataReviews = await response.json();
      setReviews(dataReviews.reviews || []);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            Rəylər və Qiymətləndirmə
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {reviews.length} rəy əsasında
          </p>
        </div>

        <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-xl border border-orange-100 w-fit">
          <span className="text-2xl font-extrabold text-[#F36F20]">
            {averageRating}
          </span>
          {renderStars(Number(averageRating), 20)}
        </div>
      </div>

      {currentUserId ? (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-gray-50 p-5 rounded-2xl border border-gray-200"
        >
          <h4 className="font-semibold text-gray-800 mb-3">
            Rəyiniz və Reytinqiniz
          </h4>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <button
                key={starValue}
                type="button"
                onClick={() => setRating(starValue)}
                className="cursor-pointer transition-transform hover:scale-110"
              >
                <Star
                  size={28}
                  fill={rating >= starValue ? "#facc15" : "transparent"}
                  color={rating >= starValue ? "#facc15" : "#d1d5db"}
                />
              </button>
            ))}
          </div>

          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Avtomobil haqqında fikrinizi yazın..."
            className="w-full p-3 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:border-[#F36F20] focus:ring-1 focus:ring-[#F36F20]/20 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-3 bg-[#F36F20] hover:bg-[#d85e17] text-white font-semibold py-2.5 px-6 rounded-xl disabled:opacity-50 transition cursor-pointer"
          >
            {loading ? "Göndərilir..." : "Rəyi Göndər"}
          </button>
        </form>
      ) : (
        <div className="mb-8 p-5 bg-orange-50 border border-orange-100 rounded-2xl text-center">
          <p className="text-sm text-gray-700">
            Rəy yazmaq üçün{" "}
            <Link
              href="/login"
              className="text-[#F36F20] font-bold underline hover:text-[#d85e17]"
            >
              hesabınıza daxil olun
            </Link>
          </p>
        </div>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-3 flex justify-center">
              <Star size={40} fill="#facc15" color="#facc15" />
            </div>
            <p className="text-sm text-gray-500">Hələ rəy yazılmayıb.</p>
            <p className="text-xs text-gray-400 mt-1">
              İlk rəyi siz yaza bilərsiniz.
            </p>
          </div>
        ) : (
          reviews.map((review) => {
            const renterId = review.renter?._id;
            const isMyReview =
              currentUserId && String(currentUserId) === String(renterId);
            const isEditing = editingReview === review._id;

            return (
              <div
                key={review._id}
                className="border border-gray-100 rounded-2xl p-4 sm:p-5 hover:border-gray-200 hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {review.renter?.name || "İstifadəçi"}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString("az-AZ")
                        : ""}
                    </p>
                  </div>

                  <div className="flex items-center shrink-0">
                    {renderStars(Number(review.rating), 16)}
                  </div>
                </div>

                {isEditing ? (
                  <div className="mt-4 bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">
                      Reytinq
                    </p>

                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setEditRating(starValue)}
                          className="cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            size={24}
                            fill={
                              editRating >= starValue ? "#facc15" : "transparent"
                            }
                            color={
                              editRating >= starValue ? "#facc15" : "#d1d5db"
                            }
                          />
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={3}
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:border-[#F36F20] transition"
                    />

                    <div className="flex gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => handleUpdate(review._id)}
                        disabled={loading}
                        className="bg-[#F36F20] hover:bg-[#d85e17] text-white px-4 py-2 rounded-lg text-xs font-semibold transition disabled:opacity-50"
                      >
                        {loading ? "Yenilənir..." : "Yadda saxla"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingReview(null)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs font-semibold transition"
                      >
                        Ləğv et
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">
                    {review.comment}
                  </p>
                )}

                {isMyReview && !isEditing && (
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingReview(review._id);
                        setEditComment(review.comment);
                        setEditRating(review.rating);
                      }}
                      title="Rəyi redaktə et"
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-500 transition cursor-pointer"
                    >
                      <Pencil size={14} />
                      Redaktə et
                    </button>

                    <span className="text-gray-200">|</span>

                    <button
                      type="button"
                      onClick={() => handleDelete(review._id)}
                      title="Rəyi sil"
                      className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 size={14} />
                      Sil
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}