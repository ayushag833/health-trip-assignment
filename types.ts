export interface CustomerReview {
    id: number;
    text: string;
    rating: number;
};

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    images: string[];
    rating: number;
    reviews: number;
    brand: string;
    category: string;
    description: string;
    customerReviews: CustomerReview[];
};

export interface Filters {
    priceRange: string;
    brand: string;
    rating: string;
    category: string;
    searchQuery: string;
};

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

export interface CartContextType {
    cart: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    cartTotal: number;
    cartCount: number;
};