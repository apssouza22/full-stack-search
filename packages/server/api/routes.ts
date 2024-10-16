import { Router } from "express";
import hotelRouters from "./hotels";
import countryRouter from "./countries";
import cityRouter from "./cities";
import searchRouter from "./search";

const router = Router();
router.use(hotelRouters);
router.use(countryRouter);
router.use(cityRouter);
router.use(searchRouter);

export default router;
