const BeerType = require('../models').BeerType;
const pagination = require('../utils/pagination');

const createBeerType = (req, res) => {
    BeerType.create({
        name: req.body.name,
        liters: req.body.liters,
        notes: req.body.notes,
        userId: req.user.id
    })
    .then(beerType => {
        res.send(beerType);
    })
    .catch(error => {
        res.status(400).send({ message: "an error occurred while processing your request"});
    });
}

const editBeerType = (req, res) => {
    BeerType.find({ 
        where: { 
            id: req.params.id,
            userId: req.user.id 
        }    
    })
    .then(beerType => {
        if (beerType) {
            let params = {
                name: req.body.name ? req.body.name : beerType.name ,
                liters: req.body.liters ? req.body.liters : beerType.liters,
                notes: req.body.notes ? req.body.notes : beerType.notes
            }
            beerType.update(params)
            .then(updatedBeerType => { res.send(updatedBeerType) })
        } else {
            res.status(404).send({ message: "beer type not found" });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(400).send({ message: "an error occurred while processing your request"});
    });
}

const listBeerTypes = (req, res) => {
    let paginationParams = pagination.params(req);
    let name = req.query.name ? req.query.name : '';
    let query = { 
        userId: req.user.id, 
        name: { $iLike: `%${ name }%` } 
    }
    BeerType.findAndCountAll({
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
        console.log("**** error: " + error)
        res.status(400).send({"message": "an error occurred while processing your request"});
    })
}

const beerTypeDetail = (req, res) => {
    BeerType.find({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    })
    .then(beerType => {
        res.send(beerType);
    })
    .catch(error => res.status(400).send({ message: "an error occurred while processing your request" }));
}

const removeBeerType = (req, res) => {
    BeerType.find({
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    })
    .then(beerType => {
        if (beerType) {
            return beerType.destroy();
        } else {
            res.status(404).send({ message: "beer type not found" });
        }
    })
    .then(() => {
        res.send({ message: "Beer type was deleted successfully"});
    })
    .catch(error => {
        res.status(400).send({ message: "an error occurred while processing your request" });
        console.log(error);
    });
}
 
module.exports = {
    createBeerType,
    editBeerType,
    listBeerTypes,
    beerTypeDetail,
    removeBeerType
}