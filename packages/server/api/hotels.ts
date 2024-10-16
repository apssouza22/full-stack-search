import {Router} from "express";
import HotelService from "../domain/hotel/service";
import validateId from "./commons";

const hotelRouters = Router();
let middleware = validateId("Invalid hotel id");

hotelRouters.get('/hotels', async (req, res) => {
    const hotelService: HotelService = req.app.get('hotelService');
    const hotels = await hotelService.getHotels();
    res.send(hotels);
});


hotelRouters.get('/hotels/:id', middleware, async (req, res) => {
    const hotelService: HotelService = req.app.get('hotelService');
    const hotel = await hotelService.getHotelById(req.params.id);
    if (!hotel) {
        res.status(404).send({error: 'Hotel not found'});
        return;
    }
    res.send(hotel);
});


hotelRouters.get('/hotels/search/:term', async (req, res) => {
    const hotelService: HotelService = req.app.get('hotelService');
    const hotels = await hotelService.search(req.params.term);
    res.send(hotels);
});

export default hotelRouters;
