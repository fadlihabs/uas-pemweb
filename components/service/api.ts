const API_URL = "http://localhost/SMART-CAMPUS-API";

export const getTugas = (id_user: number) => {
  return fetch(`${API_URL}/getTugas.php?id_user=${id_user}`)
    .then(res => res.json());
};

export const getDashboard = (id_user: number) => {
  return fetch(`${API_URL}/getDashboard.php?id_user=${id_user}`)
    .then(res => res.json());
};
