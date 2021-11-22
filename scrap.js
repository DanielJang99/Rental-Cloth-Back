const request = require("request");
const cheerio = require("cheerio");

request(
    "https://store.musinsa.com/app/goods/1886950",
    (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const coordi = $(".style_title");
            console.log(coordi.html());
        }
    },
);
