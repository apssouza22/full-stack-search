import {Request, Response, Router} from 'express';
import {CountryService} from "../domain/country/service";
import validateId from "./commons";


const countryRouter = Router();
const middleware = validateId("Invalid country id");
countryRouter.get("/countries/:id", middleware, async (req: Request, res: Response) => {
        const countryService: CountryService = req.app.get('countryService');
        const id = req.params.id;
        const country = await countryService.getCountryById(id);
        if (!country) res.status(404).send("Country not found");
        res.send(country);
    }
);

export default countryRouter;
