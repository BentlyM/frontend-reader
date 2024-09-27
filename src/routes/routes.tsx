import Navbar from "../components/NavBar";
import App from "../pages/App";
import Login from "../pages/Login";
import Register from "../pages/Register";

const routes : Array<object> /* or object[] */ = [
    {
        path: '/',
        element: <Navbar />,
        children: [
            {
                index: true,
                element: <App />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            }
        ]
    },
    {
        path: '/blog/:id',
    }
]

export default routes;