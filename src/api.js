// src/api.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function http(path, options = {}) {
  const token = localStorage.getItem("authToken");

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || res.statusText);
  return data;
}

export const user_api = {
  login: (payload) => http("/api/login", { method: "POST", body: JSON.stringify(payload) }),
  getDepartamentos: (idUser) => http(`/api/getDepartamentos/${idUser}`, { method: "GET" }),
};

export const config_api = {
  getCategorias: (idDepartamento) => http(`/api/configuracao/${idDepartamento}`, { method: "GET" }),

  getEtapas: (idDepartamento, idCategoria) => http(`/api/configuracao/buscarEtapas/${idDepartamento}/categoria/${idCategoria}/etapas`, { method: "GET" }),
  createEtapa: (payload) => http("/api/configuracao/criarEtapa", { method: "POST", body: JSON.stringify(payload), }),
  updateEtapa: (id, payload) => http(`/api/configuracao/etapa/${id}`, { method: "PUT", body: JSON.stringify(payload), }),
  deleteEtapa: (id) => http(`/api/configuracao/deletarEtapa/${id}`, { method: "DELETE", }),
  
  getAtividades: (idEtapa) => http(`/api/configuracao/buscarAtividades/${idEtapa}`, { method: "GET" }),
  createAtividade: (payload) => http("/api/configuracao/criarAtividade", { method: "POST", body: JSON.stringify(payload), }),
  deleteAtividade: (id) => http(`/api/configuracao/deletarAtividade/${id}`, { method: "DELETE", }),
};