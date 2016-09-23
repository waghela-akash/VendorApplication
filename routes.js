var Item = require('./models/fruit');

function getItemList(res) {
    Item.find().sort({'name':'asc'}).exec(function (err, items) {
        if (err) {
            res.send(err);
        }
        res.json(items);
    });
};

module.exports = function (app) {

    app.get('/api/items', function (req, res) {
        getItemList(res);
    });

    app.post('/api/items', function (req, res) {
        Item.create({
            name: req.body.name,
            cost: req.body.cost,
            quantity: req.body.quantity,
            done: false
        }, function (err, item) {
            if (err)
                res.send(err);

            getItemList(res);
        });

    });

    // update an item
    /*
    app.findOne('/api/items/:item_id', function (req, res) {
        Item.remove({
            _id: req.params.item_id
        }, function (err, item) {
            if (err)
                res.send(err);

            getItemList(res);
        });
    });
    */

    app.delete('/api/items/:item_id', function (req, res) {
        Item.remove({
            _id: req.params.item_id
        }, function (err, item) {
            if (err)
                res.send(err);

            getItemList(res);
        });
    });
    
    app.get('/api/query', function (req, res) {

        var result= "";
        Item.find().sort({'cost':'desc'}).limit(1).exec(function (err, item) {
            if (err)
                res.send(err);
            result = result + JSON.stringify(item[0]);
        });
        Item.find().sort({'cost':'asc'}).limit(1).exec(function (err, item) {
            if (err)
                res.send(err);
            result = result + ',' + JSON.stringify(item[0]);
        });
        Item.find().sort({'quantity':'desc'}).limit(1).exec(function (err, item) {
            if (err)
                res.send(err);
            result = result + ',' + JSON.stringify(item[0]);
        });
        Item.find().sort({'quantity':'asc'}).limit(1).exec(function (err, item) {
            if (err)
                res.send(err);
            result = result + ',' + JSON.stringify(item[0]);
            res.json(JSON.parse('['+result+']'));
        });
    });
    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); 
    });
};