import { Login } from "@/presentention/pages";
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
