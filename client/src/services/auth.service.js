const API_URL = "/api";
const API_AUTH = `${API_URL}/auth`
export const authService = {
  login: async (credentials) => {
    const res = await fetch(`${API_AUTH}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Giriş uğursuz oldu");
    return data;
  },

  register: async (userData) => {
    const res = await fetch(`${API_AUTH}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Qeydiyyat uğursuz oldu");
    return data;
  },

  forgotPassword: async (email) => {
    const res = await fetch(`${API_AUTH}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Xəta baş verdi");
    return data;
  },

  logout: async () => {
    const res = await fetch(`${API_AUTH}/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Çıxış edilə bilmədi");
    return data;
  },

  getMe: async () => {
    const res = await fetch(`${API_AUTH}/me`, {
      method: "GET",
      credentials: "include"
    });

    const data = await res.json();
    if(!res.ok){
      throw new Error(data.message)
    }
    return data;
  }
};