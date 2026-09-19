import api from './api';
import { env } from '../schemas/env.schema';

const INITIAL_ESTUDIANTES = [
  { id: 1, nombre: 'Carlos', apellido: 'Mendoza', email: 'carlos@correo.com', edad: 20 },
  { id: 2, nombre: 'Ana', apellido: 'Gómez', email: 'ana@correo.com', edad: 22 }
];

const getLocalData = () => {
  const data = localStorage.getItem('estudiantes');
  if (!data) {
    localStorage.setItem('estudiantes', JSON.stringify(INITIAL_ESTUDIANTES));
    return INITIAL_ESTUDIANTES;
  }
  return JSON.parse(data);
};

const saveLocalData = (data) => {
  localStorage.setItem('estudiantes', JSON.stringify(data));
};

export const estudianteService = {
  getAll: async (params) => {
    if (env.VITE_AUTH_MODE === 'localstorage') {
      let list = getLocalData();

      if (params?.nombre) {
        list = list.filter((e) => e.nombre.toLowerCase().includes(params.nombre.toLowerCase()));
      }
      if (params?.apellido) {
        list = list.filter((e) => e.apellido.toLowerCase().includes(params.apellido.toLowerCase()));
      }
      if (params?.edad) {
        list = list.filter((e) => e.edad.toString() === params.edad.toString());
      }

      return {
        data: list,
        total: list.length,
        page: params?.page || 1,
        limit: params?.limit || 10,
      };
    }
    return (await api.get('/estudiantes', { params })).data;
  },

  getById: async (id) => {
    if (env.VITE_AUTH_MODE === 'localstorage') {
      const list = getLocalData();
      return list.find((item) => item.id === Number(id) || item.id === id);
    }
    return (await api.get(`/estudiantes/${id}`)).data;
  },

  create: async (data) => {
    if (env.VITE_AUTH_MODE === 'localstorage') {
      const list = getLocalData();
      const newItem = { id: Date.now(), ...data };
      list.push(newItem);
      saveLocalData(list);
      return newItem;
    }
    return (await api.post('/estudiantes', data)).data;
  },

  update: async (id, data) => {
    if (env.VITE_AUTH_MODE === 'localstorage') {
      let list = getLocalData();
      list = list.map((item) => (item.id === Number(id) || item.id === id ? { ...item, ...data } : item));
      saveLocalData(list);
      return { id, ...data };
    }
    return (await api.put(`/estudiantes/${id}`, data)).data;
  },

  delete: async (id) => {
    if (env.VITE_AUTH_MODE === 'localstorage') {
      let list = getLocalData();
      list = list.filter((item) => item.id !== Number(id) && item.id !== id);
      saveLocalData(list);
      return { message: 'Eliminado correctamente' };
    }
    return (await api.delete(`/estudiantes/${id}`)).data;
  },
};