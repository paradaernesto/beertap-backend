const BorrowedItem = require('../models').BorrowedItem;

const registerBorrowedItem = (req, res) => {
    BorrowedItem.create({
        name: req.body.name,
        item: req.body.item,
        returned: false,
        userId: req.user.id
    })
    .then(borrowedItem => { 
        res.status(200).send({borrowedItem})
     })
     .catch(err => {
         console.log(err);
         res.status(400).send({message:'Error'})
     });
}

const itemsForUser = (req, res) => {
    let limit = (req.query.limit > 0 && req.query.limit < 10) ? req.query.limit : 5;
    let page = (req.query.page > 0) ? req.query.page : 1;
    let name = req.query.name ? req.query.name : '';
    let query = { 
        userId: req.user.id, 
        name: { $iLike: `%${ name }%` } 
    }
    BorrowedItem.findAndCountAll({ where: query })
    .then( data => {
        let pages = Math.ceil(data.count / limit);
        BorrowedItem.findAll({
            where: query,
            limit: limit,
            offset: (page - 1) * limit    
        })
        .then(items => {
            res.send({ items: items, pages: pages, currentPage: page });
        })          
    })
    .catch(error => {
        res.status(400).send({"message": "an error has occurred"});
    })
}

const itemDetail = (req, res) => {
    let itemId = req.params.id
    BorrowedItem.find({
        where: {
            userId: req.user.id,
            id: itemId
        }
    })
    .then(item => {
        res.send(item)
    })
    .catch(error => res.status(400).send({message: 'error'}));
}

const updateItem = (req, res) => {
    BorrowedItem.find({
        where: {
            userId: req.user.id,
            id: req.params.id
        }
    })
    .then(item => {
        item.update(itemParams(req))
        .then(item => res.send(item))
    })
    .catch(error => res.status(400).send({message: 'error'}));
}

const itemParams = (req) => {
    let output = {
        name: req.body.name,
        returned: req.body.returned,
        item: req.body.item
    };
    return output;
}

module.exports = {
    registerBorrowedItem,
    itemsForUser,
    itemDetail,
    updateItem
}