const Rent = require("../models/rent");
const Product = require("../models/product");

const crypto = require("crypto");
const NC_SERVICE_ID = "ncp:kkobizmsg:kr:2758773:rentacloth";
const NC_CREATE_URI = `/alimtalk/v2/services/${NC_SERVICE_ID}/messages`;
const NC_ACCESS_SECRET_KEY = "FDGSKADveLmSxMjyIeMHLieYGO5tExRLYEE2ndga";
const NC_ACCESS_KEY_ID = "lDicsWrsEnqEdCt0ysYQ";

const get_nc_headers = () => {
    const time_stamp = Date.now().toString();
    const signature = get_signature(time_stamp);
    return {
        "Content-Type": "application/json; charset=UTF-8",
        "x-ncp-apigw-timestamp": time_stamp,
        "x-ncp-iam-access-key": "lDicsWrsEnqEdCt0ysYQ",
        "x-ncp-apigw-signature-v2": signature,
    };
};

const get_signature = (time_stamp) => {
    const hmac = crypto.createHmac("sha256", NC_ACCESS_SECRET_KEY);
    const hmacDigest = hmac
        .update(`POST ${NC_CREATE_URI}\n${time_stamp}\n${NC_ACCESS_KEY_ID}`)
        .digest("base64");
    return hmacDigest;
};

const get_nc_body = async (template_code, data) => {
    const { phone } = data;
    const content = await get_alimtalk_content(template_code, data);
    return {
        plusFriendId: "@마음약한컴퍼니",
        templateCode: template_code,
        messages: [
            {
                countryCode: "+82",
                to: phone,
                content: content,
            },
        ],
    };
};

const get_alimtalk_content = async (template_code, data) => {
    let content;
    switch (template_code) {
        case "testAlim": {
            content =
                `안녕하세요.` +
                `\n` +
                `이것은 렌타클로스 테스트 알림톡 입니다.`;
            break;
        }
        case "orderReg": {
            const { rent_id, name } = data;
            const obj_rent = await Rent.findById(rent_id);
            const price = obj_rent.price;
            const product_id = obj_rent.product_id;
            const obj_product = await Product.findById(product_id);
            const product_name = obj_product.name;
            const payment_detail = "023502-42-209391 정서강";
            content =
                `[주문 접수 안내]` +
                `\n` +
                `${name}님의 주문이 접수 되었습니다.` +
                `\n` +
                `\n` +
                `- 주문번호: ${rent_id}` +
                `\n` +
                `- 상품명:  ${product_name}` +
                `\n` +
                `- 입급정보: ${payment_detail}` +
                `\n` +
                `- 입금금액: ${price}원` +
                `\n` +
                `\n` +
                `24시간 이내 입금 확인이 되어야 주문이 완료되는 점 참고 부탁드립니다.` +
                `\n` +
                `\n` +
                `추가적인 문의는 본 톡방에 남겨주시면, 담당자가 확인 후 안내드리겠습니다. `;
            break;
        }
        case "rentOrder2": {
            const { rent_id, name } = data;
            const obj_rent = await Rent.findById(rent_id);
            const price = obj_rent.price;
            const product_id = obj_rent.product_id;
            const obj_product = await Product.findById(product_id);
            const product_name = obj_product.name;
            content =
                `[주문 접수 안내]` +
                `\n` +
                `${name}님의 주문이 접수 되었습니다.` +
                `\n` +
                `\n` +
                `- 주문번호: ${rent_id}` +
                `\n` +
                `- 상품명:  ${product_name}` +
                `\n` +
                `- 결제액: ${price}원` +
                `\n` +
                `\n` +
                `상품 재고 확인 후 결제 방법 안내해 드리겠습니다.`;
            break;
        }
        default:
            break;
    }
    return content;
};

module.exports = { get_nc_headers, get_nc_body };
