export const saveSession = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getSession = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const removeSession = () => {
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return !!getSession();
};

export const isAdmin = () => {
  return getSession()?.role === "admin";
};

export const translateType = (type) => {
  const types = {
    meeting_room: "Sala de reuniones",
    private_office: "Oficina privada",
    coworking: "Coworking",
    auditorium: "Auditorio",
  };
  return types[type] || type;
};

export const translateStatus = (status) => {
  const statuses = {
    pending: "Pendiente",
    approved: "Aprobada",
    rejected: "Rechazada",
  };
  return statuses[status] || status;
};

export const statusColor = (status) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};