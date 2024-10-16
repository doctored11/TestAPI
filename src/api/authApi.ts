export const checkAuth = async () => {
    const response = await fetch("http://localhost:3000/auth/check", {
      credentials: "include",
    });
    return response.json();
  };
  
  export const refreshAuthToken = async () => {
    const response = await fetch("http://localhost:3000/auth/refresh", {
      credentials: "include",
    });
    return response.json();
  };
  