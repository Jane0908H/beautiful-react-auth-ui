export default function Dark() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 bg-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 bg-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button className="w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-700 transition">
          Continue
        </button>
      </div>
    </div>
  )
}