import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, X, Filter } from 'lucide-react';
import { searchProducts, getLatestProducts, Product } from '@/lib/product';
import { useAuth } from '@/contexts/AuthContext';
import { addRecentSearch } from '@/lib/user';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProductModal from '@/components/ProductModal';
import { useToast } from '@/components/ToastContainer';
import { addToCart } from '@/lib/user';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sortBy: 'relevance'
  });
  const { user, refreshCart, addToLocalCart } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const trendingSearches = ['luxury shirts', 'designer jeans', 'evening wear', 'casual tops', 'accessories'];

  // Mock products for search
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Bold vibe Oversize Tshirt',
      description: 'Luxury cotton t-shirt with premium finish and exceptional comfort.',
      price: 696.00,
      imageURL: 'Raritone Collection/Bold vibe Oversize Tshirt.jpg',
      category: 'Tops',
      stock: 10,
      tags: ['Cotton', 'Premium', 'Casual'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Raritone Hoodie',
      description: 'Premium hoodie with modern design and exceptional comfort.',
      price: 1043.13,
      imageURL: 'Raritone Collection/Hoddie1(F).jpg',
      backImageURL: 'Raritone Collection/Hoddie1(B).jpg',
      category: 'Outerwear',
      stock: 5,
      tags: ['Hoodie', 'designer', 'Cozy'],
      sizes: ['S', 'M', 'L', 'XL'],
      createdAt: new Date()
    },
    {
      id: '3',
      name: 'Kiss me again Oversize Tshirt',
      description: 'Soft premium fabric with chic modern design.',
      price: 399.20,
      imageURL: 'Raritone Collection/Kiss me again.jpeg',
      category: 'Tops',
      stock: 8,
      tags: ['Tshirt', 'luxury', 'comfort'],
      sizes: ['S', 'M', 'L', 'XL'],
      createdAt: new Date()
    }
  ];

  useEffect(() => {
    loadSuggestedProducts();
    loadRecentSearches();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const debounceTimer = setTimeout(() => {
        handleSearch(searchQuery);
      }, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const loadSuggestedProducts = async () => {
    setSuggestedProducts(mockProducts);
  };

  const loadRecentSearches = () => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // Filter mock products based on search query
      const results = mockProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      
      setSearchResults(results);
      
      // Add to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      if (user) {
        await addRecentSearch(user.uid, query);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = async (product: Product, quantity: number, size?: string, color?: string) => {
    const cartItem = {
      id: product.id!,
      name: product.name,
      price: product.price,
      quantity,
      size,
      imageURL: product.imageURL
    };

    if (user) {
      try {
        await addToCart(user.uid, cartItem);
        await refreshCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to add item to cart. Please try again.'
        });
        return;
      }
    } else {
      addToLocalCart(cartItem);
    }

    showToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart!`
    });
  };

  const handleAddToWishlist = (productId: string) => {
    const currentWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (!currentWishlist.includes(productId)) {
      currentWishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
      window.dispatchEvent(new Event('wishlistUpdated'));
      showToast({
        type: 'success',
        title: 'Added to Wishlist',
        message: 'Item has been saved to your wishlist!'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Search"
        showBackButton={true}
      />
      
      <div className="pt-20 max-w-6xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Search Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your perfect style from our curated collection of premium fashion items.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="Search for products, brands, or styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-amber-500 focus:outline-none rounded-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
            >
              <option value="">All Categories</option>
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Dresses">Dresses</option>
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
            >
              <option value="">All Prices</option>
              <option value="0-1000">Under ₹1,000</option>
              <option value="1000-3000">₹1,000 - ₹3,000</option>
              <option value="3000-5000">₹3,000 - ₹5,000</option>
              <option value="5000+">Above ₹5,000</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
            >
              <option value="relevance">Relevance</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && !isLoading && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Search Results ({searchResults.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                    <p className="text-lg font-bold text-amber-600">₹{product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Trending Searches */}
        {!searchQuery && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="mr-2" size={24} />
              Trending Searches
            </h3>
            <div className="flex flex-wrap gap-3">
              {trendingSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="px-4 py-2 bg-white border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 rounded-full text-gray-700 transition-all duration-200"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {recentSearches.length > 0 && !searchQuery && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Recent Searches</h3>
            <div className="flex flex-wrap gap-3">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="px-4 py-2 bg-white border border-gray-300 hover:border-amber-400 hover:bg-amber-50 rounded-full text-gray-700 transition-all duration-200"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && !searchQuery && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Discover New Arrivals</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {suggestedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                    <p className="text-lg font-bold text-amber-600">₹{product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchQuery && searchResults.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any products matching "{searchQuery}". Try different keywords or browse our categories.
            </p>
            <button
              onClick={() => navigate('/catalog')}
              className="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-colors"
            >
              Browse All Products
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    </div>
  );
};

export default Search;