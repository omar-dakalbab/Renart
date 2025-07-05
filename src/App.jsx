import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductsData from './data/products.json';
import ProductCard from './components/ProductCard';
import { getGoldPrice } from './api/getGoldPrice';

const App = () => {
  const containerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedPrice, setSelectedPrice] = useState([0, 1000]);

  const [minPopularity, setMinPopularity] = useState(0);

  const scroll = (direction) => {
    if (!containerRef.current) return;
    const { clientWidth, scrollLeft } = containerRef.current;
    const scrollAmount = clientWidth * (direction === 'left' ? -1 : 1);
    containerRef.current.scrollTo({
      left: scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  const getProducts = async () => {
    try {
      const goldPrice = await getGoldPrice();

      if (!goldPrice) throw new Error("Gold price unavailable");

      const enhanced = ProductsData.map((product) => {
        const calculatedPrice = (product.popularityScore * 5 + 1) * (product.weight || 1) * goldPrice;
        return { ...product, price: calculatedPrice };
      });

      const prices = enhanced.map((p) => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      setMinPrice(min);
      setMaxPrice(max);
      setSelectedPrice([min, max]);
      setProducts(enhanced);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.price >= selectedPrice[0] &&
      p.price <= selectedPrice[1] &&
      p.popularityScore >= minPopularity
  );

  return (
    <div className="min-h-screen bg-white px-6 py-12 space-y-10">
      <h2 className="text-center text-3xl sm:text-4xl font-light font-avenir">Product List</h2>
      <div className="w-full max-w-5xl mx-auto bg-[#F8F8F8] border border-gray-200 rounded-xl p-6 grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Price Range:&nbsp;
            {new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(selectedPrice[0])}
            {" – "}
            {new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(selectedPrice[1])}
          </label>

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={10}
            value={selectedPrice[0]}
            onChange={(e) => setSelectedPrice([+e.target.value, selectedPrice[1]])}
            className="w-full accent-[#E6CA97]"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={10}
            value={selectedPrice[1]}
            onChange={(e) => setSelectedPrice([selectedPrice[0], +e.target.value])}
            className="w-full accent-[#E6CA97] mt-2"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">Minimum Popularity</label>
          <select
            value={minPopularity}
            onChange={(e) => setMinPopularity(parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E6CA97]"
          >
            <option value={0}>All</option>
            <option value={0.2}>20%</option>
            <option value={0.4}>40%</option>
            <option value={0.6}>60%</option>
            <option value={0.8}>80%</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#E6CA97] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="relative w-full max-w-screen-2xl mx-auto">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
            disabled={filteredProducts.length === 0}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <div
            ref={containerRef}
            className="flex space-x-4 overflow-x-auto px-4 sm:px-8 py-6 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {filteredProducts.map((p, idx) => (
              <div
                key={idx}
                className="flex-none scroll-snap-align-start w-[80%] sm:w-[45%] md:w-[30%] lg:w-[22%]"
              >
                <ProductCard
                  product={p}
                  title={p.name}
                  currency="USD"
                  price={p.price.toFixed(2)}
                  images={p.images}
                  colors={[
                    { color: '#E6CA97', name: 'Yellow Gold' },
                    { color: '#E1A4A9', name: 'Rose Gold' },
                    { color: '#D9D9D9', name: 'White Gold' },
                  ]}
                  rating={p.popularityScore * 5}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
            disabled={filteredProducts.length === 0}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
