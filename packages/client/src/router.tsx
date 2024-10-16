import {createBrowserRouter} from 'react-router-dom';
import AppLayout from "./layouts/App.tsx";
import HomePage from "./pages/Home";
import ErrorPage from "./pages/Error/Error.tsx";
import HotelPage from "./pages/Hotel/hotel.tsx";
import CountryPage from "./pages/Country/country.tsx";
import CityPage from "./pages/City/city.tsx";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <HomePage/>,
            },
            {
                path: '/hotels/:id',
                element: <HotelPage/>
            },
            {
                path: '/countries/:id',
                element: <CountryPage/>
            },
            {
                path: '/cities/:id',
                element: <CityPage/>
            },
        ],
    },
]);