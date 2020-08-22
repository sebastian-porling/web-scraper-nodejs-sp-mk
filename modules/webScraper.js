const cheerio = require("cheerio");

/**
 * Fetches name, img, wiki-link, party of all american presidents
 * on Wikipedia
 * @param html HTML of USA Presidents on wikipedia
 */
module.exports.scrapePresidents = async (html) => {
    if (html === undefined || html === "") throw "Html undefined or empty"
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
    if (html === undefined || html === "") throw "Html undefined or empty"
    const $ = cheerio.load(html);
    const born = $(".bday").text();
    const died = $("span[style='display:none']", $("tr:has(th:contains(Died))"))
        .text()
        .replace(/[\(\)]/gi, "");
    const signature = $("a", $("tr:has(th:contains(Signature))")).attr("href");
    return { born, died, signature };
};
