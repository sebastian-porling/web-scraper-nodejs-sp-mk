# :tophat: Web Scraper With Node

This solution is made by Sebastian Porling and Mehtab Kayani.

## :boom: Execution and compile

You can compile this by using `npm i`. By using `npm run build` you will make executable binaries for all operating systems. But the Windows version seems to be buggy.

And execute by using `npm start` or running any of the binaries which can be found in the **/build** directory.

## :question: Motivation

We decided to gather information from [presidents of the United States of America!](https://en.wikipedia.org/wiki/List_of_presidents_of_the_United_States)
The structure we were looking for is like this:

```json
[
    {
        "number" "integer"
        "name": "string",
        "img": "string",
        "link": "string",
        "party": "string",
        "born": "string",
        "died": "string",
        "signature": "string"
    }
]
```

We decided to use **cheerio** in order to scrape the page. It used simple and understandable syntax that is basically identical to jQuery.

We use the **axios** package to fetch the data from wikipedia! The first request is pretty fast, but it takes some time to fetch infromation on each wikipedia page for the presidents. We only gather the birth and death dates from the presidents own wikipage. The rest of the info could be gathered from the list of presidents page.

The class **fileWrite.js** utilizes the **jsonfile** package. It writes a json file with the given path/filename and json input.

The main class **index.js** uses a "throbber" for the console output, showing that something is happening for the user. Because fetching all the presidents take some time...

Something interesting to know about the implementation of the fetching of each president is that using this version of a loop:

```javascript
await Promise.all(presidents.map(async (president) => {
    const response = await getPresident(president.link);
    throbber.start("Fetched " + president.link + "\n");
    const presidentInfo = await scrapePresident(response.data);
    result.push(await Object.assign(president, presidentInfo));
}));
```

Is much faster than trying to do it synchrounously. I timed it to be about 40% faster to use the asyncrounous version with the reduce function.
