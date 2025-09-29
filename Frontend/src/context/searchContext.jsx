import { createContext, useState } from "react";
import React from "react";

export const SearchContext = createContext();


export const SearchProvider = ({ children }) => {

    const [keyword, setKeyword] = useState("");
    const [filter, setFilter] = useState({
        fullName: "",
        skills: "",
        company: "",
        experience: "",
        education: "",
        designation: "",
        address: "",
    })

    return (

        <SearchContext.Provider value={{ keyword, setKeyword, filter, setFilter }} >
            {children}
        </SearchContext.Provider>


    )
}

