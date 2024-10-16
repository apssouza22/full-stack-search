import {City, Country, Hotel} from "./models.ts";
import {Link} from "react-router-dom";

export const ResultGroup = ({title, data, prop, icon}: {
    title: string;
    data: Array<Hotel | Country | City>;
    prop: "country" | "name" | "hotel_name";
    icon: "fa-building" | "fa-map";
}) => {
    return (
        <div>
            <h2>{title}</h2>
            {data.length ? (
                <>
                    {data.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={`/${title.toLowerCase()}/${item._id}`}
                                className="dropdown-item"
                            >
                                <i className={`fa ${icon} mr-2`}></i>
                                {item[prop as keyof typeof item]}
                            </Link>
                            <hr className="divider"/>
                        </li>
                    ))}
                </>
            ) : (
                <p>No {title.toLowerCase()} matched</p>
            )}
        </div>
    );
};

