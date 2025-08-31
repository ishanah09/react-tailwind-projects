import CartProduct from "../component/CartProducts";
import { useSelector } from "react-redux";
export default function Cart()
{
  const cartProducts=useSelector(state=>state.cart)
  return(

    <section className="max-w-7xl px-4  py-8   mx-auto">

      <p className="text-4xl font-semibold text-blue-600 mb-4 sm:mb-8 border-b-2 w-fit">Cart items</p>
      { cartProducts.length===0 && <div className="w-full text-2xl font-semibold text-gray-500 text-center ">Cart Is Empty</div>}
       <section className=" flex flex-col items-center gap-6   ">
    {cartProducts.map((product)=><CartProduct key={product.id} product={product} ></CartProduct>)}
    </section>
    </section>



 
  )
}