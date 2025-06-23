import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Implementasi login di sini
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white rounded-2xl shadow-sm flex flex-col md:flex-row w-full max-w-4xl mx-2 overflow-hidden border border-gray-200">
        {/* Kiri: Logo & Judul */}
        <div className="flex flex-col items-center justify-center p-8 md:p-10 md:basis-1/2 md:max-w-[50%]">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-green-700 mb-2 tracking-wide">E-ARSIP<br/><span className="text-base font-semibold text-gray-600">PCA MOJOTENGAH</span></div>
            {/* Ganti src logo di bawah dengan logo asli */}
            <img src="https://placehold.co/120x120/008000/fff?text=LOGO" alt="Logo" className="mx-auto h-24 w-24 object-contain" />
          </div>
        </div>
        {/* Divider */}
        <div className="w-full h-px bg-gray-200 md:w-px md:h-auto" />
        {/* Kanan: Form Login */}
        <div className="flex flex-col justify-center p-8 md:p-10 md:basis-1/2 md:max-w-[50%]">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 tracking-wide">LOGIN</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-3 pr-3 py-2 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-sm placeholder-gray-400 bg-gray-50"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-3 pr-3 py-2 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 transition text-sm placeholder-gray-400 bg-gray-50"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-2 rounded-lg shadow hover:bg-green-700 focus:ring-2 focus:ring-green-200 transition font-semibold text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 