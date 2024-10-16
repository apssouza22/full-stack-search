import {Router} from "express";
import HotelService from "../domain/hotel/service";
import {SearchService} from "../domain/search/service";
import {SearchResult} from "../domain/search/mongo";

const searchRouter = Router();


searchRouter.get('/search/:term', async (req, res) => {
    const searchService: SearchService = req.app.get('searchService');
    const result = await searchService.search(req.params.term);

    // SLow down the response to simulate a real-world scenario
    setTimeout(() => {
        res.send(result);
    }, 2000);
});

export default searchRouter;
