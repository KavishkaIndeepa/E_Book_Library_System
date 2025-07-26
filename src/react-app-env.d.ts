/// <reference types="react-scripts" />

interface BookItem {
  _id: string;
  title: string;
  image: string;
  price: string;
  category: string;
  // Add other properties as needed based on your book object structure
}

interface WishlistItem {
  _id: string;
  bookId: BookItem;
  // Add other properties as needed for your wishlist item
}
