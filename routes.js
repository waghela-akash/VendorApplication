var Item = require('./models/fruit');

function getItemList(res) {
    Item.find(function (err, items) {
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
    
    
    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); 
    });
};