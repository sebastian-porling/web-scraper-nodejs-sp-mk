const cheerio = require("cheerio");

/**
 * Fetches name, img, wiki-link, party of all american presidents
 * on Wikipedia
 * @param html HTML of USA Presidents on wikipedia
 */
module.exports.scrapePresidents = async (html) => {
    const presidents = [];
    const $ = cheerio.load(html);
    const tableBody = $("tbody")[1];
    const rows = $("tr:has(td:has(a:has(img)))", tableBody);
    $(rows).each(async (i, row) => {
        const number = parseInt($("a", $("td", row)[0]).text());
        const name = $("b", $("td", row)[3]).text();
        const img = $("a", $("td", row)[2]).attr("href");
        const link = $("a", $("td", row)[3]).attr("href");
        const party = $("a", $("td", row)[5]).text();
        const json = { number, name, img, link, party };
        presidents.push(json);
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
    const diedTr = $("tr:has(th:contains(Died))");
    const died = $("span", diedTr).text();
    const signatureTr = $("tr:has(th:contains(Signature))");
    const signature = $("a", signatureTr).attr("href");
    return { born, died, signature };
};
