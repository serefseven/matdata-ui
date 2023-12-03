import { Outlet, Route, Routes} from "react-router-dom";

import React from "react";
import ApplicationPageWrapper from "./application/ApplicationPage";
import FilePageWrapper from "./file/FilePage";

const MatdataPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route path='applications' element={ <ApplicationPageWrapper/> } />
                <Route path='files' element={ <FilePageWrapper/> } />
            </Route>
        </Routes>
    )
}

export default MatdataPage;