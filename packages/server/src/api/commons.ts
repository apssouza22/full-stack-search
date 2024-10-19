import {NextFunction, Request, Response} from "express";

function validateId(errorMessage: string = "Invalid id") {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            next();
            return;
        }

        res.status(400).send(errorMessage);
    };
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log('Error:', err.message);
    res.status(500).json({error: 'Internal Server Error'});
}

export default validateId;
