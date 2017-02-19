var mongo = require("mongodb");
module.exports = function(app, express, db) {
    var apiRouter = express.Router();
    var messages = db.collection("sarah_msg");

    apiRouter.get('/', function(req, res) {
        var query = req.query;
        var mQuery = false;

        if(query.start_date) {
            if(!query.end_date) {
                res.send({ message: "Need end date!" });
            } else {

                mQuery = {
                    "date": {
                        "$gte": new Date(query.start_date),
                        "$lt": new Date(query.end_date)
                    }
                };


            }

        } else if(query.keyword) {

            mQuery = {
                "$text": {
                    "$search": query.keyword
                }
            };

            if(query.keyword_exact) {
                mQuery.$text.$search = "\"" + query.keyword + "\"";
            }

        }

        if(mQuery) {

            var msg = messages.find(mQuery).toArray(function(err, docs) {
                res.send(docs);
            });

        } else {
            res.send({ message: "sup brah" });
        }


    });

    apiRouter.get('/date/:d', function(req, res) {
        var date = new Date(req.params.d);
        var tomorrow = new Date(req.params.d);
        tomorrow.setDate(tomorrow.getDate()+1);
        
        messages.find({ date: { "$gte": date, "$lt": tomorrow } }).toArray(function(err, docs) {
            res.send(docs);
        });
    });

    return apiRouter;
};


var MongoClient = require('mongodb').MongoClient;
var MONGO_URL = 'mongodb://localhost:27017/test';
