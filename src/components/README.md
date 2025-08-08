# ProductCard Component

A responsive, modern product card component for ecommerce applications built with React and Bootstrap.

## Features

### ✅ Core Requirements
- **Product Image**: Displays product image with hover effects
- **Product Name**: Truncated title with full text on hover
- **Product Price**: Formatted price display with discount support
- **Variant Dropdown**: Select product variants (size, color, etc.)
- **Add to Cart Button**: Integrates with Redux cart management
- **Out of Stock Handling**: Disabled state when product is unavailable

### 🎨 Additional Features
- **Responsive Design**: Mobile-first approach with Bootstrap grid
- **Quantity Selector**: +/- buttons with input field
- **Discount Badges**: Visual discount indicators
- **Hover Animations**: Smooth transitions and effects
- **Modern UI**: Clean, professional design
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Usage

### Basic Implementation

```jsx
import ProductCard from './components/ProductCard';

const MyProductList = () => {
  const product = {
    id: 1,
    title: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://example.com/image.jpg",
    stock: 15,
    discount: 20,
    variants: [
      { id: 1, name: "Black", price: 199.99 },
      { id: 2, name: "White", price: 199.99 },
    ]
  };

  return (
    <div className="row">
      <ProductCard product={product} />
    </div>
  );
};
```

### Product Data Structure

```javascript
const product = {
  id: Number,                    // Unique product ID
  title: String,                 // Product name
  description: String,           // Product description
  price: Number,                 // Current price
  originalPrice: Number,         // Original price (optional)
  image: String,                 // Image URL
  stock: Number,                 // Available quantity (0 = out of stock)
  discount: Number,              // Discount percentage (optional)
  variants: [                    // Product variants (optional)
    {
      id: Number,
      name: String,              // Variant name (e.g., "Small", "Black")
      price: Number              // Variant-specific price
    }
  ]
};
```

## Demo

The ProductCard component is now integrated into the main Products page. You can see it in action by navigating to the Products page in your application.

## Styling

The component uses Bootstrap classes and custom CSS. The styles are defined in `ProductCard.css` and include:

- Hover animations and transitions
- Gradient backgrounds
- Shadow effects
- Responsive breakpoints
- Modern button styling

## Redux Integration

The component automatically integrates with your Redux store using the `addCart` action. Make sure your Redux setup includes:

```javascript
// In your Redux action
export const addCart = (product) => {
  return {
    type: "ADD_CART",
    payload: product
  };
};
```

## Responsive Behavior

- **Desktop**: 4 cards per row (col-lg-3)
- **Tablet**: 3 cards per row (col-md-4)
- **Mobile**: 2 cards per row (col-sm-6)
- **Small Mobile**: 1 card per row (col-12)

## Accessibility

- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast color scheme
- Focus indicators

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- React 18+
- React Redux
- React Router DOM
- Bootstrap 5
- React Hot Toast
- Font Awesome (for icons)

## Customization

You can customize the component by:

1. Modifying the CSS classes in `ProductCard.css`
2. Adjusting the Bootstrap grid classes
3. Changing the color scheme in the CSS variables
4. Adding additional props for more features

## License

This component is part of the ecommerce project and follows the same license terms.
