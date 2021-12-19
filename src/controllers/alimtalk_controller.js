const { get_nc_headers, get_nc_body } = require("../services/alimtalk_service");
const User = require("../models/user");
const axios = require("axios");
const { admins } = require("../utils/utils");

const NC_API_URL = "https://sens.apigw.ntruss.com/alimtalk/v2/services";
const NC_SERVICE_ID = "ncp:kkobizmsg:kr:2758773:rentacloth";
const NC_ALIMTALK_SEND_URL = `${NC_API_URL}/${NC_SERVICE_ID}/messages`;

const sendAlimtalk = async (req, res) => {
    const { user_id, template_code, include_admin } = req.body;
    const alimtalk_header = get_nc_headers();
    const user = await User.findById(user_id);
    const { name, phone } = user;
    let data = req.body.data ? req.body.data : {};
    data["phone"] = phone;
    data["name"] = name;
    const alimtalk_body = await get_nc_body(template_code, data);
    const options = { headers: alimtalk_header };
    axios.post(NC_ALIMTALK_SEND_URL, alimtalk_body, options);

    if (include_admin) {
        for (let admin of admins) {
            data["phone"] = admin;
            const admin_alimtalk_body = await get_nc_body(template_code, data);
            await axios.post(
                NC_ALIMTALK_SEND_URL,
                admin_alimtalk_body,
                options,
            );
        }
    }
    res.status(201).send();
};

module.exports = { sendAlimtalk };
