import api from "./axios";

export const getTickets = async (params = {}) => {
  const response = await api.get("/tickets", {
    params,
  });

  return response.data;
};

export const getTicket = async (ticketId) => {
  const response = await api.get(`/tickets/${ticketId}`);

  return response.data;
};

export const createTicket = async (ticketData) => {
  const response = await api.post("/tickets", ticketData);

  return response.data;
};

export const analyzeTicket = async (ticketId) => {
  const response = await api.post(`/tickets/${ticketId}/analyze`);

  return response.data;
};

export const getAISuggestions = async (ticketId) => {
  const response = await api.get(`/tickets/${ticketId}/ai-suggestions`);

  return response.data;
};

export const reviewAISuggestion = async (ticketId, reviewData) => {
  const response = await api.put(`/tickets/${ticketId}/review`, reviewData);

  return response.data;
};

export const getComments = async (ticketId) => {
  const response = await api.get(`/tickets/${ticketId}/comments`);

  return response.data;
};

export const createComment = async (ticketId, content) => {
  const response = await api.post(`/tickets/${ticketId}/comments`, {
    content,
  });

  return response.data;
};

export const getActivities = async (ticketId) => {
  const response = await api.get(`/tickets/${ticketId}/activities`);

  return response.data;
};

export const getTeams = async () => {
  const response = await api.get("/teams");
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const assignTicket = async (ticketId, assignmentData) => {
  const response = await api.put(
    `/tickets/${ticketId}/assignment`,
    assignmentData,
  );

  return response.data;
};

export const updateTicketStatus = async (ticketId, status) => {
  const response = await api.put(`/tickets/${ticketId}/status`, {
    status,
  });

  return response.data;
};

export const updateTicket = async (ticketId, ticketData) => {
  const response = await api.put(`/tickets/${ticketId}`, ticketData);

  return response.data;
};

export const rejectAISuggestion = async (ticketId) => {
  const response = await api.post(`/tickets/${ticketId}/review/reject`);

  return response.data;
};

export const getAllAISuggestions = async () => {
  const response = await api.get(
    "/tickets/ai-suggestions"
  )

  return response.data
}

export const getAllActivities = async () => {
  const response = await api.get(
    "/tickets/activities"
  )

  return response.data
}