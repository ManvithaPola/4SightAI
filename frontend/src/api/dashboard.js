// import api from './axios'

// export const getDashboardSummary = async () => {
//   const response = await api.get('/dashboard/summary')

//   return response.data
// }

import api from "./axios";

export const getDashboardSummary = async () => {
  const response = await api.get("/dashboard/summary");
  return response.data;
};

export const getRecentTickets = async () => {
  const response = await api.get("/dashboard/recent-tickets");
  return response.data;
};

export const getTeamPerformance = async () => {
  const response = await api.get("/dashboard/team-performance");
  return response.data;
};