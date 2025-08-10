// This is /Users/sahibabc/ecomLanding/ecomlanding/src/app/products/[id]/page.tsx
"use client";

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  Truck, 
  Shield, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Minus,
  Check,
  X,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal
} from 'lucide-react';

// Interfaces
interface ImageGalleryProps {
  images: string[];
}

interface ProductInfoProps {
  product: {
    id: string;
    title: string;
    brand: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    stockCount: number;
    sku: string;
    category: string;
    subcategory: string;
    description: string;
    colors: Array<{ name: string; value: string; available: boolean }>;
    sizes: Array<{ name: string; available: boolean }>;
  };
}

interface RelatedProductsProps {
  products: Array<{
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
  }>;
}

// Mock product data
const product = {
  id: '1',
  title: 'Premium Wireless Headphones Pro Max',
  brand: 'AudioTech',
  price: 299,
  originalPrice: 399,
  discount: 25,
  rating: 4.8,
  reviewCount: 2847,
  inStock: true,
  stockCount: 23,
  sku: 'ATP-WH-001',
  category: 'Electronics',
  subcategory: 'Audio',
  description: 'Experience unparalleled audio quality with our flagship wireless headphones. Featuring advanced noise cancellation, premium materials, and industry-leading battery life.',
  features: [
    'Active Noise Cancellation (ANC)',
    '40-hour battery life',
    'Premium leather ear cushions',
    'Bluetooth 5.3 connectivity',
    'Quick charge: 5 min = 3 hours playback',
    'Multipoint connection',
    'Built-in voice assistant',
    'Foldable design with carrying case'
  ],
  specifications: {
    'Driver Size': '40mm dynamic drivers',
    'Frequency Response': '20Hz - 40kHz',
    'Impedance': '32 ohms',
    'Battery Life': '40 hours (ANC off), 30 hours (ANC on)',
    'Charging Time': '2 hours (full charge)',
    'Weight': '285g',
    'Connectivity': 'Bluetooth 5.3, 3.5mm jack',
    'Warranty': '2 years international warranty'
  },
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1528148343865-51218c4a13e6?w=600&h=600&fit=crop'
  ],
  colors: [
    { name: 'Midnight Black', value: '#1a1a1a', available: true },
    { name: 'Space Gray', value: '#6b7280', available: true },
    { name: 'Rose Gold', value: '#f59e0b', available: true },
    { name: 'Pearl White', value: '#f9fafb', available: false }
  ],
  sizes: [
    { name: 'Standard', available: true },
    { name: 'Large', available: true }
  ]
};

const reviews = [
  {
    id: 1,
    user: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop',
    rating: 5,
    date: '2024-01-15',
    title: 'Amazing sound quality!',
    content: 'These headphones exceeded my expectations. The noise cancellation is incredible and the battery life is exactly as advertised. Perfect for long flights and daily commutes.',
    helpful: 24,
    verified: true
  },
  {
    id: 2,
    user: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
    rating: 4,
    date: '2024-01-10',
    title: 'Great value for money',
    content: 'Solid build quality and excellent features. The only minor issue is that they can feel a bit heavy during extended use, but the comfort is generally good.',
    helpful: 18,
    verified: true
  },
  {
    id: 3,
    user: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
    rating: 5,
    date: '2024-01-08',
    title: 'Perfect for work from home',
    content: 'The noise cancellation helps me focus during video calls. Great microphone quality and the multipoint connection works flawlessly between my laptop and phone.',
    helpful: 31,
    verified: true
  }
];

const relatedProducts = [
  {
    id: '2',
    title: 'Wireless Charging Stand',
    price: 49,
    originalPrice: 69,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop',
    rating: 4.6
  },
  {
    id: '3',
    title: 'Premium Phone Case',
    price: 29,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop',
    rating: 4.4
  },
  {
    id: '4',
    title: 'Bluetooth Speaker Mini',
    price: 79,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
    rating: 4.7
  },
  {
    id: '5',
    title: 'Smart Watch Series X',
    price: 299,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    rating: 4.8
  }
];

// Image Gallery Component
const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <img
          src={images[currentImage]}
          alt={`Product image ${currentImage + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              currentImage === index
                ? 'border-teal-500 ring-2 ring-teal-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// Product Info Component
const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const increaseQuantity = () => setQuantity(prev => Math.min(prev + 1, product.stockCount));
  const decreaseQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="#" className="hover:text-teal-600">Home</a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:text-teal-600">{product.category}</a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:text-teal-600">{product.subcategory}</a>
          </li>
          <li>/</li>
          <li className="text-gray-900">{product.title}</li>
        </ol>
      </nav>

      {/* Brand and Title */}
      <div>
        <p className="text-sm font-medium text-teal-600 mb-1">{product.brand}</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
        <p className="text-sm text-gray-500">SKU: {product.sku}</p>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-gray-900">{product.rating}</span>
        </div>
        <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
        <a href="#reviews" className="text-sm text-teal-600 hover:text-teal-700">
          Write a review
        </a>
      </div>

      {/* Price */}
      <div className="flex items-baseline space-x-3">
        <span className="text-3xl font-bold text-gray-900">${product.price}</span>
        {product.originalPrice && (
          <>
            <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
              {product.discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        {product.inStock ? (
          <>
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-green-600 font-medium">In Stock</span>
            <span className="text-sm text-gray-500">({product.stockCount} items left)</span>
          </>
        ) : (
          <>
            <X className="w-5 h-5 text-red-500" />
            <span className="text-red-600 font-medium">Out of Stock</span>
          </>
        )}
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Color: <span className="font-normal">{selectedColor.name}</span>
        </h3>
        <div className="flex space-x-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => color.available && setSelectedColor(color)}
              disabled={!color.available}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                selectedColor.name === color.name
                  ? 'border-teal-500 ring-2 ring-teal-200'
                  : 'border-gray-300 hover:border-gray-400'
              } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {!color.available && (
                <div className="w-full h-full rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-500" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Size: <span className="font-normal">{selectedSize.name}</span>
        </h3>
        <div className="flex space-x-3">
          {product.sizes.map((size) => (
            <button
              key={size.name}
              onClick={() => size.available && setSelectedSize(size)}
              disabled={!size.available}
              className={`px-4 py-2 border rounded-md text-sm font-medium transition-all duration-200 ${
                selectedSize.name === size.name
                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              } ${!size.available ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 border-x border-gray-300 text-center min-w-[60px]">
              {quantity}
            </span>
            <button
              onClick={increaseQuantity}
              disabled={quantity >= product.stockCount}
              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            disabled={!product.inStock}
            className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-all duration-200 ${
              isWishlisted ? 'bg-red-50 border-red-300' : ''
            }`}
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
          <button className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors duration-200">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <button
          disabled={!product.inStock}
          className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Buy Now
        </button>
      </div>

      {/* Shipping Info */}
      <div className="border-t pt-6 space-y-4">
        <div className="flex items-center space-x-3 text-sm">
          <Truck className="w-5 h-5 text-green-600" />
          <span className="text-gray-700">Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <Shield className="w-5 h-5 text-blue-600" />
          <span className="text-gray-700">2-year warranty included</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <RefreshCw className="w-5 h-5 text-orange-600" />
          <span className="text-gray-700">30-day return policy</span>
        </div>
      </div>
    </div>
  );
};

// Product Tabs Props type
type ProductTabsProps = {
  product: typeof product;
  reviews: typeof reviews;
};

// Product Tabs Component
const ProductTabs: React.FC<ProductTabsProps> = ({ product, reviews }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${reviews.length})` }
  ];

  return (
    <div className="border-t pt-8">
      {/* Tab Navigation */}
      <div className="flex space-x-8 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 px-1 font-medium text-sm transition-colors duration-200 ${
              activeTab === tab.id
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'description' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">{key}</span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
              <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200">
                Write Review
              </button>
            </div>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.avatar}
                      alt={review.user}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900">{review.user}</h4>
                          {review.verified && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                      <p className="text-gray-700 mb-4">{review.content}</p>
                      
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700">
                          <ThumbsDown className="w-4 h-4" />
                          <span>Not Helpful</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Related Products Component
const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">({product.rating})</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <button className="bg-teal-600 text-white px-3 py-1 rounded-md text-sm hover:bg-teal-700 transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Product Details Page Component
const ProductDetailsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ImageGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
        <div className="mt-16">
          <ProductTabs product={product} reviews={reviews} />
        </div>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <button 
              onClick={() => window.location.reload()} 
              className="text-teal-600 hover:text-teal-700"
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrap the main component with ErrorBoundary
export default function Page() {
  return (
    <ErrorBoundary>
      <ProductDetailsPage />
    </ErrorBoundary>
  );
}