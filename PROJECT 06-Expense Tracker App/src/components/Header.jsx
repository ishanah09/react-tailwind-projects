export default function Header() {
  return (
    <header className="bg-white shadow-lg ">
      <div className="max-w-7xl mx-auto    ">
        <div className="flex items-center justify-center md:justify-between px-4 md:px-6 lg:px-8 py-5">
          <h1 className="text-[27px] sm:text-3xl font-bold text-red-400 ">
            Expense Tracker
          </h1>

          <p className="hidden md:block text-gray-500">
            Track your expenses easily
          </p>
        </div>
      </div>
    </header>
  );
}
