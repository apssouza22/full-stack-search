import {Link} from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="col-md-6">
            <h1 className="text-center">Page not found</h1>

            <div className="d-flex justify-content-center">
                <Link className="btn btn-primary" to="/">
                    Home
                </Link>
            </div>
        </div>
    );
}
