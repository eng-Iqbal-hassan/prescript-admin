import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    // Here, we crate a variable in context by which we will store the access token.
    const [aToken, setAToken] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const value = {
        aToken, setAToken,
        backendUrl
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;