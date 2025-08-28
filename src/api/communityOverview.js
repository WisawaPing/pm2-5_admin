import apiClient from "./apiClient";

export const getCommunityOverview = async () => {
  try {
    const res = await apiClient.get("/community-overview");
    return res.data;
  } catch (err) {
    console.error("Error fetching community overview:", err);
    return { response_status: "ERROR", message: err.message };
  }
};

export const updateCommunityOverview = async (data) => {
  try {
    const res = await apiClient.put("/community-overview", data);
    return res.data;
  } catch (err) {
    console.error("Error updating community overview:", err);
    return { response_status: "ERROR", message: err.message };
  }
};
