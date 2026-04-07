import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#F0FDFA] text-[#134E4A]">
        <div className="text-center px-4">
          <h1 className="text-8xl font-bold mb-4">404</h1>
          <p className="text-xl mb-8">Page not found</p>
          <Link
            href="/"
            className="bg-[#0891B2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0E7490] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
