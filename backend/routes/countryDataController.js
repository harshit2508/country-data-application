const express = require('express')
const router  = express.Router()
const countryDataService = require('../services/countryDataService')

router.get('/country', async function(req, res, next) {
    try{
        const page = req.query.page
        const searchString = req.query.searchString;
        const columnName = req.query.columnName;
        const order = req.query.order;
        const listPerPage = req.query.listPerPage;

        res.json(await countryDataService.getCountries(page, searchString, columnName, order, listPerPage))
    }
    catch(e){
        console.error("Error while fetching countries", e.message);
        next(e)
    }
})

router.get('/countrySearch', async function(req, res, next) {
    try{
        const searchId = req.query.id;
        const columnName = req.query.columnName;
        const order = req.query.order;

        res.json(await countryDataService.getSearchCountries(req.query.page, searchId, columnName, order))
    }
    catch(e){
        console.error("Error while fetching search countries", e.message);
        next(e)
    }
})

module.exports = router