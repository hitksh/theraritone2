import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ToastContainer';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';

const ReviewPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    title: '',
    review: '',
    productPurchased: ''
  });

  const [existingReviews] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      title: "Amazing AI Technology!",
      review: "The AI body scan is incredible! Perfect fit every time. I've never had clothes fit so well from online shopping.",
      date: "2024-12-15",
      verified: true
    },
    {
      id: 2,
      name: "Arjun Patel",
      rating: 5,
      title: "Revolutionary Shopping Experience",
      review: "The virtual try-on feature saved me so much time. Quality is outstanding and delivery was super fast.",
      date: "2024-12-10",
      verified: true
    },
    {
      id: 3,
      name: "Sneha Reddy",
      rating: 4,
      title: "Great Quality and Service",
      review: "Love the personalized recommendations. The clothes are high quality and the customer service is excellent.",
      date: "2024-12-05",
      verified: true
    }
  ]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      showToast({
        type: 'warning',
        title: 'Rating Required',
        message: 'Please select a star rating before submitting your review.'
      });
      return;
    }

    // Simulate review submission
    showToast({
      type: 'success',
      title: 'Review Submitted!',
      message: 'Thank you for your feedback. Your review will be published after moderation.'
    });

    // Reset form
    setRating(0);
    setReviewData({
      name: user?.displayName || '',
      email: user?.email || '',
      title: '',
      review: '',
      productPurchased: ''
    });
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <Star
          key={index}
          size={interactive ? 32 : 20}
          className={`${
            starValue <= (interactive ? (hoveredRating || rating) : currentRating)
              ? 'text-amber-500 fill-current'
              : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={interactive ? () => setRating(starValue) : undefined}
          onMouseEnter={interactive ? () => setHoveredRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Customer Reviews"
        showBackButton={true}
      />

      <div className="pt-20 max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Reviews</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share your experience and help other customers make informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Review Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h2>
              
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <Label className="text-gray-900 text-lg mb-3 block">Rate Your Experience</Label>
                  <div className="flex space-x-2 mb-2">
                    {renderStars(rating, true)}
                  </div>
                  <p className="text-sm text-gray-600">
                    {rating === 0 && 'Click to rate'}
                    {rating === 1 && 'Poor'}
                    {rating === 2 && 'Fair'}
                    {rating === 3 && 'Good'}
                    {rating === 4 && 'Very Good'}
                    {rating === 5 && 'Excellent'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-900">Name</Label>
                    <Input
                      id="name"
                      value={reviewData.name}
                      onChange={(e) => setReviewData({...reviewData, name: e.target.value})}
                      required
                      className="mt-1 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-900">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={reviewData.email}
                      onChange={(e) => setReviewData({...reviewData, email: e.target.value})}
                      required
                      className="mt-1 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="title" className="text-gray-900">Review Title</Label>
                  <Input
                    id="title"
                    value={reviewData.title}
                    onChange={(e) => setReviewData({...reviewData, title: e.target.value})}
                    placeholder="Summarize your experience"
                    required
                    className="mt-1 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <Label htmlFor="productPurchased" className="text-gray-900">Product Purchased (Optional)</Label>
                  <Input
                    id="productPurchased"
                    value={reviewData.productPurchased}
                    onChange={(e) => setReviewData({...reviewData, productPurchased: e.target.value})}
                    placeholder="Which product did you purchase?"
                    className="mt-1 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <Label htmlFor="review" className="text-gray-900">Your Review</Label>
                  <textarea
                    id="review"
                    value={reviewData.review}
                    onChange={(e) => setReviewData({...reviewData, review: e.target.value})}
                    placeholder="Tell us about your experience with RARITONE..."
                    required
                    rows={4}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 text-white hover:bg-amber-700 py-3 rounded-xl flex items-center justify-center space-x-2"
                >
                  <Send size={18} />
                  <span>Submit Review</span>
                </Button>
              </form>
            </div>

            {/* Existing Reviews */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">What Our Customers Say</h2>
              
              {existingReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-600">{review.review}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Review Guidelines */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Review Guidelines</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Be honest and constructive in your feedback</li>
              <li>• Focus on your experience with the product and service</li>
              <li>• Avoid inappropriate language or personal attacks</li>
              <li>• Reviews are moderated and may take 24-48 hours to appear</li>
              <li>• Only customers who have made a purchase can leave reviews</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewPage;