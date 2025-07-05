import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductsData from './data/products.json';
import ProductCard from './components/ProductCard';

const App = () => {
  const containerRef = useRef(null);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
      await new Promise((r) => setTimeout(r, 500));
      setProducts(ProductsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 space-y-20">
      <h2 className="font-avenir font-[300] text-4xl text-center">
        Product List
      </h2>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#E6CA97] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="relative w-full max-w-8xl">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
            disabled={products.length === 0}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div
            ref={containerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide px-12 py-6"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {products.map((p, idx) => (
              <div key={idx} className="flex-none w-1/4 scroll-snap-align-start">
                <ProductCard
                  title={p.name}
                  price={p.price}
                  currency="USD"
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
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
            disabled={products.length === 0}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
