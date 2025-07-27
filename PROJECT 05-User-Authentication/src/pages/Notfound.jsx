import { Link } from "react-router-dom"



export default function NotFound() {
  return(
   <section className="min-h-screen w-full flex items-center justify-center bg-blue-200">
    <div className="flex flex-col gap-3 items-center">
      <h1 className="text-5xl font-semibold tracking-wide ">404</h1>
      <h3 className="text-gray-600 text-xl font-semibold">Sorry , the page not found</h3>
      <Link to={"/"} className="bg-black w-fit text-white p-3 rounded-lg cursor-pointer hover:bg-gray900 active:scale-95">Return Home</Link>
    </div>
   </section>
  )
}
