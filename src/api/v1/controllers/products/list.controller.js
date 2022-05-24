const axios = require('axios');
const { author } = require('../../helpers/miscellaneous');

const formatItems = (items) => {
    return items.map((item) => {
        return {
            id: item.id,
            title: item.title,
            price: {
                currency: item.prices.presentation.display_currency,
                amount: item.price,
                decimals: 00
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
        }
    });
};

const formatCategory = (data) => {
    if(data.filters && data.filters.length > 0) {
        return data.filters[0].values[0].name;
    }
    const categories = data.available_filters.filter(e => e.id == 'category')
    if(categories && categories.length > 0){
        const majorCategory = categories[0].values.reduce((acc, current) => acc.results > current.results ? acc : acc = current)
        return majorCategory.name
    }
    return "Sin Categoría";
};

const list = async (req, res) => {
    try {        
        const { search } = req.query;
        const url = `https://api.mercadolibre.com/sites/MLA/search?q='${search}'&limit=4`;
        const { data } = await axios.get(url);
        const payload = {
            author,
            category: formatCategory(data),
            items: formatItems(data.results)
        }
        return res.status(200).send(payload);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error});
    }
};

module.exports = list;