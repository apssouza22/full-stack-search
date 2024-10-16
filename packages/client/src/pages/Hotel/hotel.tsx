import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useRestAPI} from "../../hooks/useFetch.ts";
import {API_URL} from "../../common/vars.ts";
import {Spinner} from "../../components/Spinner";


export interface Hotel {
    _id: string;
    hotel_name: string;
    country: string;
}

export default function HotelPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<Hotel>();
    const {loading, get} = useRestAPI(`${API_URL}`);

    useEffect(() => {
        const fetchData = async () => {
            const res = await get<Hotel>(`/hotels/${id}`);
            console.log(res);
            setData(res.data);
            if (!res.data) {
                navigate("/notFound");
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Spinner/>;
    }

    return (
        <>
            {data && (<div className="row height d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                    <h1 className="text-center">Hotel Page</h1>
                    <p className="text-center">{data.hotel_name}</p>
                    <p className="text-center">{data.country}</p>

                    <div className="d-flex justify-content-center">
                        <Link className="btn btn-primary" to="/">
                            Home
                        </Link>
                    </div>
                </div>
            </div>)
            }
        </>
    );
}
