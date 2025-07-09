import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "../../lib/axios";
import Spinner from "../Spinner";


export default function PrivateRoute() {
    const [ok, setOk] = useState(false)
    const { auth, setAuth } = useAuth()

    console.log({ auth });

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('https://ecommerce-watch.onrender.com/api/auth/user-auth')
            if (res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if (auth?.user?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner />
}