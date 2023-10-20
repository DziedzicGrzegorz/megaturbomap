import {Router} from "express";
import {AdRecord} from "../record/record";

export const adRouter: Router = Router()

adRouter
    .get('/search/:name?', async (req, res) => {

        if (!req.params.name) return res.json({
            message: "",
        })
        const ads = await AdRecord.findAll(req.params.name);

        res.json({
            ads
        })
    })
    .get('/:id', async (req, res) => {
        const ad = await AdRecord.getAdById(req.params.id);

        res.json({
            ad,
        })
    })
    .post('/', async (req, res) => {
        const ad = new AdRecord(req.body);
        await ad.insert();
        res.json({
            ad
        })

    })
