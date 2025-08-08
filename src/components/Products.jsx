import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "./ProductCard";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true);



  // Transform API data to match ProductCard format
  const transformProductData = (apiProduct) => {
    // Make some products out of stock for testing
    const isOutOfStock = Math.random() < 0.3; // 30% chance of being out of stock
    const stock = isOutOfStock ? 0 : Math.floor(Math.random() * 20) + 1;
    
    return {
      ...apiProduct,
      stock: stock, // Mock stock data with some products out of stock
      variants: generateVariants(apiProduct),
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : null, // Random discount
      originalPrice: Math.random() > 0.7 ? apiProduct.price * (1 + Math.random() * 0.3) : null, // Random original price
    };
  };

  // Generate mock variants based on product category
  const generateVariants = (product) => {
    const baseVariants = [
      { id: 1, name: "Small", price: product.price },
      { id: 2, name: "Medium", price: product.price + 2 },
      { id: 3, name: "Large", price: product.price + 4 },
    ];

    const colorVariants = [
      { id: 1, name: "Black", price: product.price },
      { id: 2, name: "White", price: product.price },
      { id: 3, name: "Blue", price: product.price + 3 },
    ];

    // Use color variants for clothing, size variants for others
    if (product.category.includes('clothing')) {
      return colorVariants;
    }
    return baseVariants;
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted.current) {
        const products = await response.clone().json();
        const transformedProducts = products.map(transformProductData);
        setData(transformedProducts);
        setFilter(transformedProducts);
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted.current = false;
    };
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        <div className="row">
          {filter.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
