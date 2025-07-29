export default function Footer() {
  return (
    <footer className="bg-white shadow-[0px_-6px_10px_rgba(0,0,0,.1)] ">

      <div
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex
      items-center justify-center"
      >
        <p className="text-center text-gray-500 text-sm">
          Ishan Ahmad &copy; {new Date().getFullYear()}
        </p>
      </div>
      
    </footer>
  );
}
