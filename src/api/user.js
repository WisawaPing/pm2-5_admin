import apiClient from "./apiClient";

// Login
export const loginUser = async (username, password) => {
  try {
    const res = await apiClient.post("/users/login", { username, password });
    return res.data; // backend ส่ง { response_status, data, message }
  } catch (err) {
    console.error(err);
    // ดึงข้อความจาก response ของ backend
    if (err.response && err.response.data) {
      return err.response.data;
    }
    return {
      response_status: "ERROR",
      message: err.message || "เกิดข้อผิดพลาด",
    };
  }
};

// ดึงรายชื่อผู้ใช้ทั้งหมด
export const getUsers = async () => {
  try {
    const res = await apiClient.get("/users");
    return res.data;
  } catch (err) {
    console.error(err);
    return {
      response_status: "ERROR",
      message: err.message || "เกิดข้อผิดพลาด",
    };
  }
};

// เพิ่ม / อัปเดต / ลบ user
export const createUser = async (user) => apiClient.post("/users", user);
export const updateUser = async (id, user) =>
  apiClient.put(`/users/${id}`, user);
export const deleteUser = async (id) => apiClient.delete(`/users/${id}`);
