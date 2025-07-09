// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function useCategory() {
//     const [categories, setCategories] = useState([]);

//     // Fetch categories from backend
//     const getCategories = async () => {
//         try {
//             const { data } = await axios.get("http://localhost:4000/api/category/get-category");
//             setCategories(data?.categories || []);
//         } catch (error) {
//             console.log("Error fetching categories", error);
//         }
//     };

//     useEffect(() => {
//         getCategories();
//     }, []);

//     return categories;
// }


import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/api/category/get-category`);
            setCategories(data?.categories || []);
        } catch (error) {
            console.log("Error fetching categories", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return categories;
}

