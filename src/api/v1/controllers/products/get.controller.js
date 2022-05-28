const axios = require('axios');
const { author, getDecimalPart } = require('../../helpers/miscellaneous');

const formatItem = (product, description, categories) => {
    return {
        author,
        id: product.id,
        title: product.title,
        price: {
            currency: product.currency_id,
            amount: product.price,
            decimals: getDecimalPart(product.price),
        },
        picture: product.pictures.length > 1 ? product.pictures[0].url : product.thumbnail,
        condition: product.condition,
        free_shipping: product.free_shipping,
        sold_quantity: product.sold_quantity,
        description: description.plain_text,
        categories
    }
};

const getProduct = async (id) => {
    try {        
        const url = encodeURI(`https://api.mercadolibre.com/items/${id}`);
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.log('getProduct', error);
    }
}

const getDescription = async (id) => {
    try {       
        const url = encodeURI(`https://api.mercadolibre.com/items/${id}/description`);
        const { data } = await axios.get(url);
        return data; 
    } catch (error) {
        console.log('getDescription', error);

    }
}

const getCategory = async (category) => {
    try {       
        const url = encodeURI(`https://api.mercadolibre.com/categories/${category}`);
        const { data } = await axios.get(url);
        return [data.name]; 
    } catch (error) {
        console.log('getDescription', error);

    }
}

const get = async (req, res) => {
    try {        
        const { id } = req.params;
        const product = await getProduct(id);
        const description = await getDescription(id);
        const categories = await getCategory(product.category_id);
        const payload = formatItem(product, description, categories);
        return res.status(200).send(payload);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error});
    }
};

module.exports = get;