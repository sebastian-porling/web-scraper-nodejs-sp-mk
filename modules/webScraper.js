const cheerio = require("cheerio");

/**
 * Fetches name, img, wiki-link, party of all american presidents
 * on Wikipedia
 * @param html HTML of USA Presidents on wikipedia
 */
module.exports.scrapePresidents = async (html) => {
    const presidents = [];
    const $ = cheerio.load(html);
    const rows = $("tr:has(td:has(a:has(img)))", $("tbody")[1]);
    $(rows).each(async (i, row) => {
        const number = parseInt($("a", $("td", row)[0]).text());
        const name = $("b", $("td", row)[3]).text();
        const img = $("a", $("td", row)[2]).attr("href");
        const link = $("a", $("td", row)[3]).attr("href");
        const party = $("a", $("td", row)[5]).text();
        presidents.push({ number, name, img, link, party });
    });
    return presidents;
};

/**
 * Fetches the born and died information of an american president
 * @param html HTML content for an american president wikipedia page
 */
module.exports.scrapePresident = async (html) => {
    const $ = cheerio.load(html);
    const born = $(".bday").text();
    const died = $("span", $("tr:has(th:contains(Died))")).text();
    const signature = $("a", $("tr:has(th:contains(Signature))")).attr("href");
    return { born, died, signature };
};
