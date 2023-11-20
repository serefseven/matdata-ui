import { Outlet, Route, Routes} from "react-router-dom";

import React from "react";
import ApplicationPageWrapper from "./application/ApplicationPage";

const MatdataPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route path='applications' element={ <ApplicationPageWrapper/> } />
            </Route>
        </Routes>
    )
}

export default MatdataPage;