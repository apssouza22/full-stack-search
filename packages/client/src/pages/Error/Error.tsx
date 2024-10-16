import {Link, useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div className="App">
            <div className="container">
                <div className="col-md-6">
                    <h1 className={"text-center"}>Oops!</h1>
                    <p className="text-center">Sorry, an unexpected error has occurred.</p>
                    <p className="text-center">
                        <i>{error.statusText || error.message}</i>
                    </p>
                    <div className="d-flex justify-content-center">
                        <Link className="btn btn-primary" to="/">
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
