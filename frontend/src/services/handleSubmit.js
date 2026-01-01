import { login } from "../services/api";

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const res = await login({ email, password });
        localStorage.setItem("token", res.data.token);
        onLogin(res.data.admin);
    } catch {
        alert("Invalid credentials");
    } finally {
        setLoading(false);
    }
};
