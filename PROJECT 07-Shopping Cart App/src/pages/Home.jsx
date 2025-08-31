import Product from "../component/Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../features/productSlice";

export default function Home() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center ">
        <h1 className="text-green-500 text-4xl font-semibold">Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-red-500 text-4xl font-semibold">Error...</h1>
      </div>
    );
  }

  return (
    <section className="px-4 py-8 sm:px-8 flex flex-wrap lg:grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto sm:py-16  ">
      {products?.map((product) => (
        <Product product={product} key={product.id}></Product>
      ))}
    </section>
  );
}
