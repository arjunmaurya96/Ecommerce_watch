import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "../../lib/axios";
import Spinner from "../Spinner";


export default function AdminRoute() {
    const [ok, setOk] = useState(false)
    const { auth, setAuth } = useAuth()

    console.log({ auth });

    useEffect(() => {
        const authCheck = async () => {
            // const res = await axios.get('http://localhost:4000/api/auth/admin-auth')
            const res = await axios.get('https://ecommerce-watch.onrender.com/api/auth/admin-auth')
            if (res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if (auth?.user?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path="" />
}