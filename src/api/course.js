import apiClient from "./apiClient";

export const getCourses = async () => {
  const res = await apiClient.get("/courses");
  return res.data;
};

export const getCourseById = async (id) => {
  const res = await apiClient.get(`/courses/${id}`);
  return res.data;
};

export const createCourse = async (data) => {
  const res = await apiClient.post("/courses", data); // default application/json
  return res.data;
};

export const updateCourse = async (id, data) => {
  const res = await apiClient.put(`/courses/${id}`, data); // default application/json
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await apiClient.delete(`/courses/${id}`);
  return res.data;
};
