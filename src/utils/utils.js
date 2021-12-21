const admins = ["01059373253", "01080785251", "01095578891"];

const getFormattedDate = (date) => {
    let new_date = new Date(date);
    return `${new_date.getFullYear()}.${
        new_date.getMonth() + 1
    }.${new_date.getDate()}`;
};

module.exports = { admins, getFormattedDate };
