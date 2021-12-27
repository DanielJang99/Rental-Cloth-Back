const admins = ["01059373253", "01080785251", "01095578891"];

const getFormattedDate = (date) => {
    let new_date = new Date(date);
    return `${new_date.getFullYear()}.${
        new_date.getMonth() + 1
    }.${new_date.getDate()}`;
};

const getFormattedDatetime = () => {
    let d = new Date();
    return `${d.getFullYear()}.${
        d.getMonth() + 1
    }.${d.getDate()}-${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

const getFormattedPrice = (p) => {
    const price = p.toString();
    const price_length = price.length;
    const comma_offset = Math.ceil(price_length / 3 - 1);
    if (comma_offset > 0) {
        let formattedPrice = "";
        for (let i = comma_offset; i > 0; i--) {
            const init_position = i === comma_offset ? 0 : (i - 1) * 3;
            const comma_position = price_length - i * 3;
            formattedPrice += `${price.slice(init_position, comma_position)},`;
        }
        formattedPrice += `${price.slice(price_length - 3, price_length)}`;
        return formattedPrice;
    }
    return price;
};

module.exports = {
    admins,
    getFormattedDate,
    getFormattedDatetime,
    getFormattedPrice,
};
