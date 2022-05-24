const axios = require('axios');

const get = async (req, res) => {
    try {        
        const { search } = req.query;
        const url = `https://api.mercadolibre.com/sites/MLA/search?q='${search}'`;
        const { data } = await axios.get(url);
        const { available_filters } = data;
        // console.log(available_filters[0].values)
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error});
    }
};

module.exports = get;