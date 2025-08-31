export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="p-4 bg-gray-50 border-t flex items-center justify-center">
      <div className="text-sm text-gray-600">
        Ishan Ahmad © {year} | Built with React, Redux Toolkit, Tailwind CSS
      </div>
    </footer>
  );
}
