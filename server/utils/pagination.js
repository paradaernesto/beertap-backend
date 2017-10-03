const params = (req) => {
    let limit = (req.query.limit > 0 && req.query.limit < 10) ? req.query.limit : 5;
    let page = (req.query.page > 0) ? req.query.page : 1;
    let offset = (page - 1) * limit;
    return {limit: limit, page: page, offset: offset}
}

module.exports = {
    params
}