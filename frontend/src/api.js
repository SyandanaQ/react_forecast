import axios from "axios";

// URL backend
const API_URL = "http://localhost:5000/api/sales";

// Fungsi untuk mengambil data sales dari backend
const getSales = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return [];
  }
};

// Fungsi untuk menambah data sales
const addSale = async (sale) => {
  try {
    const response = await axios.post(API_URL, sale);
    const result = response.data;

    // Gabungkan data input (sale) dengan ID yang dikembalikan dari backend
    return { ...sale, id: result.id };
  } catch (error) {
    console.error("Error adding sale:", error);
    throw error;
  }
};

const updateSale = async (id, sale) => {
  try {
    await axios.put(`${API_URL}/${id}`, sale);
    // Kembalikan data lengkap dengan id yang diedit
    return { ...sale, id };
  } catch (error) {
    console.error("Error updating sale:", error);
    throw error;
  }
};

// Fungsi untuk menghapus data sales berdasarkan ID
const deleteSale = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting sale:", error);
    throw error;
  }
};

export { getSales, addSale, updateSale, deleteSale };
