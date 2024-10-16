import express, {Request, Response} from 'express';
import {CityService} from "../domain/city/service";
import validateId from "./commons";


const cityRouter = express.Router();
const middleware = validateId("Invalid city id");
cityRouter.get("/cities/:id", middleware, async (req: Request, res: Response) => {
        const cityService: CityService = req.app.get('cityService');
        const id = req.params.id;
        const city = await cityService.getCityById(id);
        if (!city)
            res.status(404).send("City not found");

        res.send(city);
    }
);

export default cityRouter
