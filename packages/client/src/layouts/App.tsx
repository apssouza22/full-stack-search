import {Outlet} from 'react-router';

export default function AppLayout() {
    return (
        <div className="App">
            <div className="container">
                <Outlet/>
            </div>
        </div>
    );
}