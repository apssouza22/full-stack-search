import {type ChangeEvent, useState} from "react";
import {SearchData} from "./models.ts";
import {useRestAPI} from "../../hooks/useFetch.ts";
import {ResultGroup} from "./result-group.tsx";
import {Spinner} from "../Spinner";
import {API_URL} from "../../common/vars.ts";


export function SearchBox() {
    const [input, setInput] = useState("");
    const [displayResults, setDisplayResults] = useState(false);
    const [searchData, setSearchData] = useState<SearchData>();
    const {loading, httpController, get} = useRestAPI(`${API_URL}`);
    const [showClearBtn, setShowClearBtn] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const fetchData = async (value: string): Promise<void> => {
        const result = await get<SearchData>(`/search/${value}`);
        setShowClearBtn(true);
        setSearchData(result.data);
        setDisplayResults(true);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (loading) {
            httpController.abort("A new search has been initiated");
        }

        const value = event.target.value;
        setInput(value);

        if (value === '') {
            setSearchData({hotels: [], countries: [], cities: []});
            setDisplayResults(false);
            setShowClearBtn(false);
            return;
        }

        //This is to prevent sending request on every key press
        const newTimeoutId = setTimeout(() => {
            fetchData(value);
            setTimeoutId(null);
        }, 500);

        setTimeoutId(newTimeoutId);
    };

    const resetInput = (): void => {
        setInput("");
        setSearchData({hotels: [], countries: [], cities: []});
        setDisplayResults(false);
    };

    return (
        <div className="dropdown">
            <div className="form">
                <i className="fa fa-search"></i>
                <input
                    type="text"
                    value={input}
                    className="form-control form-input"
                    placeholder="Search accommodation..."
                    onChange={handleInputChange}
                />
                {showClearBtn && (
                    <span className="left-pan" onClick={resetInput} role="button">
                        <i className="fa fa-close"></i>
                    </span>
                )}
            </div>

            {(loading || timeoutId) && Spinner()}

            {!loading && displayResults && searchData && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                    <ResultGroup
                        title="Hotels"
                        data={searchData.hotels}
                        prop={"hotel_name"}
                        icon={"fa-building"}
                    />
                    <ResultGroup
                        title="Countries"
                        data={searchData.countries}
                        prop={"country"}
                        icon={"fa-map"}
                    />
                    <ResultGroup
                        title="Cities"
                        data={searchData.cities}
                        prop={"name"}
                        icon={"fa-map"}
                    />
                </div>
            )}
        </div>
    );
}
