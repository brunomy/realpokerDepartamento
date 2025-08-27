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
  getUsersDepartamento: (idDepartamento) => http(`/api/getUsersDepartamento/${idDepartamento}`, { method: "GET" }),

  getUserEquipes: (idUser, idDepartamento) => http(`/api/getUserEquipes/${idUser}/${idDepartamento}`, { method: "GET" }),
  createEquipe: (payload) => http("/api/criarEquipe", { method: "POST", body: JSON.stringify(payload), }),
  updateEquipe: (id, payload) => http(`/api/updateEquipe/${id}`, { method: "PUT", body: JSON.stringify(payload), }),
  deleteEquipe: (id) => http(`/api/deletarEquipe/${id}`, { method: "DELETE" }),
  
  getFuncionarios: (idEquipe) => http(`/api/getFuncionarios/${idEquipe}`, { method: "GET" }),
  createFuncionario: (payload) => http("/api/criarFuncionario", { method: "POST", body: JSON.stringify(payload), }),
  deleteFuncionario: (id) => http(`/api/deletarFuncionario/${id}`, { method: "DELETE" }),
};

export const config_api = {
  getCategorias: (idDepartamento) => http(`/api/configuracao/${idDepartamento}`, { method: "GET" }),

  getEtapas: (idDepartamento, idCategoria) => http(`/api/configuracao/buscarEtapas/${idDepartamento}/categoria/${idCategoria}/etapas`, { method: "GET" }),
  createEtapa: (payload) => http("/api/configuracao/criarEtapa", { method: "POST", body: JSON.stringify(payload), }),
  updateEtapa: (id, payload) => http(`/api/configuracao/etapa/${id}`, { method: "PUT", body: JSON.stringify(payload), }),
  deleteEtapa: (id) => http(`/api/configuracao/deletarEtapa/${id}`, { method: "DELETE", }),
  
  getAtividades: (idEtapa) => http(`/api/configuracao/buscarAtividades/${idEtapa}`, { method: "GET" }),
  createAtividade: (payload) => http("/api/configuracao/criarAtividade", { method: "POST", body: JSON.stringify(payload), }),
  updateAtividade: (id, payload) => http(`/api/configuracao/atividade/${id}`, { method: "PUT", body: JSON.stringify(payload), }),
  deleteAtividade: (id) => http(`/api/configuracao/deletarAtividade/${id}`, { method: "DELETE", }),

  getChecklistVolumes: (idAtividade) => http(`/api/configuracao/buscarChecklistVolumes/${idAtividade}`, { method: "GET" }),
  createChecklist: (payload) => http("/api/configuracao/criarChecklist", { method: "POST", body: JSON.stringify(payload), }),
  deleteChecklist: (id) => http(`/api/configuracao/deletarChecklist/${id}`, { method: "DELETE", }),
  createVolume: (payload) => http("/api/configuracao/criarVolume", { method: "POST", body: JSON.stringify(payload), }),
  deleteVolume: (id) => http(`/api/configuracao/deletarVolume/${id}`, { method: "DELETE", }),
};

export const ordem_api = {
  getOrdens: (id) => http(`/api/getOrdensDepartamento/${id}`, { method: "GET" }),
}

export const remessa_api = {
  getEstados: () => http(`/api/getEstados`, { method: "GET" }),
  getCidades: (idEstado) => http(`/api/getCidades/${idEstado}`, { method: "GET" }),
  getRemessa: (idRemessa) => http(`/api/getRemessa/${idRemessa}`, { method: "GET" }),
  updateRemessa: (id, payload) => http(`/api/updateRemessa/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  getOrdensRemessa: (id) => http(`/api/getOrdensRemessa/${id}`, { method: "GET" }),
  getOrdensRemessaDepartamento: (id_departamento, id) => http(`/api/getOrdensRemessaDepartamento/${id_departamento}/${id}`, { method: "GET" }),
}

