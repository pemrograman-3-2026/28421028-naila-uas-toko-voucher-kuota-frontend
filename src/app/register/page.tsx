'use client'

import { showToast } from "@/components/toast/Toast"
import { api } from "@/lib/axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"



export default function RegisterPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [noTelp, setNoTelp] = useState('')
  const router = useRouter()

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const res = await api.post('/user/register', {
        username,
        password,
        no_telp: noTelp
    
    }) 
      showToast(res.data.message, 'success')
      router.push('/')
    } catch (error: any) {
      showToast(error.response.data.message, 'danger')  
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card border-0 shadow"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="d-flex align-items-center justify-content-center flex-column">
            <h5 className="fw-bold mb-1">Register</h5>
            <p className="text-muted small mb-4">Daftarkan akun anda</p>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Username</label>
              <input
                type="text"
                name="username"
                className="form-control form-control-sm py-2"
                placeholder="Masukan Username anda"
                value={username}
                onChange={(e) => setUsername (e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-sm py-2"
                placeholder="Masukan Password"
                value={password}
                onChange={(e) => setPassword (e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">No Telp</label>
              <input
                type="Number"
                name="no_telp"
                className="form-control form-control-sm py-2"
                placeholder="Masukan no telp"
                value={noTelp}
                onChange={(e) => setNoTelp (e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 py-2 text-white fw-semibold"
              style={{ background: "#1e2a3a", borderRadius: "8px" }}
            >
              Daftar
            </button>
          </form>

          <p className="text-center text-muted small mt-4 mb-0">
            Sudah punya akun?
          </p>
          <Link href={'/'}>
            <button
                type="submit"
                className="btn w-100 py-2 text-white fw-semibold"
                style={{ background: "#222e3d", borderRadius: "8px" }}
              >
                Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}