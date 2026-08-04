import { useEffect, useState } from "react";
import { businessService } from "../services/businessService";

export default function useBusinesses() {

    const [businesses, setBusinesses] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        businessService
            .getAll()
            .then((data) => {

                setBusinesses(data);

            })
            .finally(() => {

                setLoading(false);

            });

    }, []);

    return {

        businesses,

        loading,

    };

}