import { useAuth } from "../contexts/useAuth.jsx";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {

    const {isAuthenticated, loading} = useAuth()

    if (loading) {
        return <h1>Loading…</h1>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default PrivateRoute