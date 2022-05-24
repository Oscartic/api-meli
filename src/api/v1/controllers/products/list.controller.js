const axios = require('axios');

const getDescription = async (id) => {
    try {       
        const url = `https://api.mercadolibre.com/items/${id}/description`;
        console.log(id, url)
        const { data } = await axios.get(url);
        return data; 
    } catch (error) {
        console.log('getDescription', error);

    }
}

const getProduct = async (id) => {
    try {        
        const url = `https://api.mercadolibre.com/items/${id}`;
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.log('getProduct', error);
    }
}

const list = async (req, res) => {
    try {        
        const { id } = req.params;
        const product = await getProduct(id);
        const description = await getDescription(id);

        return res.status(200).send({product, description});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error});
    }
};

module.exports = list;