import products from "../utils/data";
import Product from "./Product";
export default function Products({}) {
  return (
    <div className=" ">
      <h1 className="font-bold text-4xl mb-8">Desserts</h1>

      <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-3   ">
        {products.map((product, index) => {
          return (
            <Product
              key={index}
              product={product}
              index={index}
             
            ></Product>
          );
        })}
      </div>
    </div>
  );
}
