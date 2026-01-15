import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user === null) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            {children}
        </>
    )
};
export default ProtectedRoute;
