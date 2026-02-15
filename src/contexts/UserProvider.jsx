import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
  const initialUser = JSON.parse(localStorage.getItem("session")) ?? {
    isLoggedIn: false,
    username: "",
    email: "",
  };

  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(initialUser);

  const login = async (email, password) => {
    // TODO: Implement the login function
    // Step 1: Wrap everything in a try/catch block
    // Step 2: Send a POST request to `${API_URL}/api/user/login` with:
    //         - method: "POST"
    //         - headers: { "Content-Type": "application/json" }
    //         - body: JSON.stringify({ email, password })
    //         - credentials: "include" (important for cookie-based auth)
    // Step 3: If the response status is NOT 200, return false (login failed)
    // Step 4: Create a newUser object: { isLoggedIn: true, username: "", email: email }
    // Step 5: Call setUser(newUser) to update React state
    // Step 6: Save the session to localStorage: localStorage.setItem("session", JSON.stringify(newUser))
    // Step 7: Return true (login succeeded)
    // Step 8: In the catch block, console.log the error and return false
  };

  const logout = async () => {
    // TODO: Implement the logout function
    // Step 1: Wrap the API call in a try/catch block
    // Step 2: Send a POST request to `${API_URL}/api/user/logout` with:
    //         - method: "POST"
    //         - credentials: "include"
    // Step 3: In the catch block, console.log the error (don't block logout on API failure)
    // Step 4: After the try/catch, create a newUser object: { isLoggedIn: false, username: "", email: "" }
    // Step 5: Call setUser(newUser) to clear the React state
    // Step 6: Update localStorage: localStorage.setItem("session", JSON.stringify(newUser))
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
