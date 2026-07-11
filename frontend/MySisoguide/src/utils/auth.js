// export const saveToken=(token) => {
//     localStorage.setItem("access_token", token.access);
//     localStorage.setItem("refresh_token", token.refresh);
//   }

// export const clearTokens = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
// }

// export const getAccessToken = () => {
//     return localStorage.getItem("access_token");
// }

// export const getRefreshToken = () => {
//     return localStorage.getItem("refresh_token");
// }

// export const authFetch=(url, options={})=>{
//     const token=getAccessToken();
//     const headers=options.headers ?{...options.headers}:{};
//     if(token){
//         headers["Authorization"]=`Bearer ${token}`;
//         headers["Content-Type"]="application/json";

//         return fetch(url,{...options,headers});
//     }
// }


// Save access token, refresh token and user details
export const saveToken = (data) => {
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
};

// Clear everything on logout
export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

// Get Access Token
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

// Get Refresh Token
export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

// Get Logged-in User
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Authenticated Fetch
export const authFetch = (url, options = {}) => {
  const token = getAccessToken();

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};