var express = require('express');
var router = express.Router();
const path = require('path')
const csvtojson = require("csvtojson");

const policyService = require('../service/policyDetails/crud')
const jsonService = require('../service/policyDetails/convertJSON')
const {Policy} = require('../model/policy')

const fileLocation = path.join(global.root, 'data', 'test.csv')
const jsonLocation = path.join(global.root, 'data', 'json', 'demo.json')

router.post('/bulkUpload', async function(req, res, next) {
 let jsonRecords = await jsonService.toJSON(csvtojson, fileLocation, jsonLocation)
 return res.send(jsonRecords)
 let result = await policyService.insert(req.body, Policy)
 return res.send(result)
});

module.exports = router;
