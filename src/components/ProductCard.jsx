import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Mock variant data - in real app this would come from product data
  const variants = product.variants || [
    { id: 1, name: "Small", price: product.price },
    { id: 2, name: "Medium", price: product.price + 5 },
    { id: 3, name: "Large", price: product.price + 10 },
  ];

  const isOutOfStock = product.stock === 0 || product.stock < 1;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("Product is out of stock!");
      return;
    }

    const productToAdd = {
      ...product,
      selectedVariant: selectedVariant || variants[0]?.name,
      qty: quantity, // Changed from quantity to qty to match reducer
      variantPrice: selectedVariant 
        ? variants.find(v => v.name === selectedVariant)?.price || product.price
        : product.price
    };

    dispatch(addCart(productToAdd));
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
      <div className="card product-card h-100 shadow-sm border-0">
        {/* Product Image */}
        <div className="product-image-container position-relative">
          <img
            src={product.image}
            alt={product.title}
            className="card-img-top product-image p-3"
            style={{ height: "250px", objectFit: "contain" }}
          />
          {isOutOfStock && (
            <div className="out-of-stock-overlay">
              <span className="badge bg-danger fs-6">Out of Stock</span>
            </div>
          )}
          {product.discount && (
            <div className="discount-badge position-absolute top-0 start-0 m-2">
              <span className="badge bg-success fs-6">
                -{product.discount}%
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="card-body d-flex flex-column">
          {/* Product Title */}
          <h6 className="card-title fw-bold mb-2 text-truncate" title={product.title}>
            {truncateText(product.title, 40)}
          </h6>

          {/* Product Description */}
          <p className="card-text text-muted small mb-3 flex-grow-1">
            {truncateText(product.description, 80)}
          </p>

          {/* Price Section */}
          <div className="price-section mb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="fs-5 fw-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-muted text-decoration-line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Variant Selection */}
          {variants.length > 1 && (
            <div className="mb-3">
              <label className="form-label small fw-semibold mb-1">
                Select Variant:
              </label>
              <select
                className="form-select form-select-sm"
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                disabled={isOutOfStock}
              >
                <option value="">Choose variant...</option>
                {variants.map((variant) => (
                  <option key={variant.id} value={variant.name}>
                    {variant.name} - {formatPrice(variant.price)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-3">
            <label className="form-label small fw-semibold mb-1">
              Quantity:
            </label>
            <div className="input-group input-group-sm">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isOutOfStock}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={product.stock || 99}
                disabled={isOutOfStock}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                disabled={isOutOfStock}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-grid gap-2">
            {isOutOfStock ? (
              <button
                className="btn btn-secondary btn-sm"
                disabled
              >
                Out of Stock
              </button>
            ) : (
              <>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleAddToCart}
                >
                  <i className="fa fa-cart-plus me-1"></i>
                  Add to Cart
                </button>
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-outline-dark btn-sm"
                >
                  <i className="fa fa-eye me-1"></i>
                  View Details
                </Link>
              </>
            )}
          </div>
        </div>
      </div>


    </div>
  );
};

export default ProductCard;
