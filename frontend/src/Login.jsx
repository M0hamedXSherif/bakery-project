import { useState } from "react"

const API_URL = "https://efficient-warmth-production-3ad5.up.railway.app"

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleLogin() {
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json().then(data => ({ status: res.status, body: data })))
      .then(({ status, body }) => {
        if (status !== 200) {
          setError(body.error)
          return
        }
        localStorage.setItem("token", body.token)
        localStorage.setItem("role", body.role)
        localStorage.setItem("email", body.email)
        onLoginSuccess(body.role, body.email)
      })
  }

  return (
    <div className="login-page">
      <h2>تسجيل الدخول</h2>
      {error && <p className="login-error">{error}</p>}
      <input placeholder="الإيميل" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="كلمة السر" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>دخول</button>
    </div>
  )
}

export default Login