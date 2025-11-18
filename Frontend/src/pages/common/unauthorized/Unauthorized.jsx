

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-3xl font-bold text-red-600 mb-2">Access Denied 🚫</h1>
    <p className="text-gray-700">You do not have permission to access this page.</p>
    <a
      href="/login"
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
    >
      Go to Login
    </a>
  </div>
);

export default Unauthorized;
