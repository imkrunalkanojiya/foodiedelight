import {
    createBrowserRouter,
} from "react-router-dom";

// components
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);