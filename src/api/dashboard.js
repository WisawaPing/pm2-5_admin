import apiClient from "./apiClient";

export const getDashboard = async () => {
  const res = await apiClient.get("/dashboard");
  return res.data;
};

export const updateDashboard = async (data) => {
  const res = await apiClient.put("/dashboard", data);
  return res.data;
};
