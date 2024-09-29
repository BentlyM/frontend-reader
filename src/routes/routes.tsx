import Navbar from "../components/NavBar";
import App from "../pages/App";
import CardDetails from "../pages/CardDetails";
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
        path: '/posts/:id',
        element: <CardDetails isAuthenticated={""} />
    }
]

export default routes;