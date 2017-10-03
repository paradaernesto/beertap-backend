const BorrowedItem = require('../models').BorrowedItem;
const pagination = require('../utils/pagination');

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
    let paginationParams = pagination.params(req);
    let name = req.query.name ? req.query.name : '';
    let query = { 
        userId: req.user.id, 
        name: { $iLike: `%${ name }%` } 
    }
    BorrowedItem.findAndCountAll({
         where: query, 
         limit: paginationParams.limit,
         offset: paginationParams.offset  
        })
    .then( data => {
        let pages = Math.ceil(data.count / paginationParams.limit);
        res.send({ 
            items: data.rows, 
            pages: pages, 
            currentPage: paginationParams.page 
        });          
    })
    .catch(error => {
        console.log(error)
        res.status(400).send({"message": "an error occurred while processing your request"});
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
    .catch(error => res.status(400).send({message: 'an error occurred'}));
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
    .catch(error => res.status(400).send({message: 'an error occurred during update'}));
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