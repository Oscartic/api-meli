const axios = require('axios');
const { author } = require('../../helpers/miscellaneous');

const formatItem = (product, description, category) => {
    return {
        author,
        id: product.id,
        title: product.title,
        price: {
            currency: product.currency_id,
            amount: product.price,
            decimals: product.price,
        },
        picture: product.pictures.length > 1 ? product.pictures[0].url : product.thumbnail,
        condition: product.condition,
        free_shipping: product.free_shipping,
        sold_quantity: product.sold_quantity,
        description: description.plain_text,
        category
    }
};

const getProduct = async (id) => {
    try {        
        const url = `https://api.mercadolibre.com/items/${id}`;
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.log('getProduct', error);
    }
}

const getDescription = async (id) => {
    try {       
        const url = `https://api.mercadolibre.com/items/${id}/description`;
        const { data } = await axios.get(url);
        return data; 
    } catch (error) {
        console.log('getDescription', error);

    }
}

const getCategory = async (category) => {
    try {       
        const url = `https://api.mercadolibre.com/categories/${category}`;
        const { data } = await axios.get(url);
        return data.name; 
    } catch (error) {
        console.log('getDescription', error);

    }
}

const get = async (req, res) => {
    try {        
        const { id } = req.params;
        const product = await getProduct(id);
        const description = await getDescription(id);
        const category = await getCategory(product.category_id);
        const payload = formatItem(product, description, category);
        return res.status(200).send(payload);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error});
    }
};

module.exports = get;