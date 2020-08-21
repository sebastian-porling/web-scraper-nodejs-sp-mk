# Web Scraper With Node

This solution is made by Sebastian Porling and Mehtab Kayani.

## Execution and compile

You can compile this by using `npm i`.

And execute by using `npm start`.

## Motivation

We decided to gather information from presidents of the United States of America!
The structure we were looking for is like this:

```json
[
    {
        "name": "string",
        "img": "string",
        "link": "string",
        "party": "string",
        "born": "string",
        "died": "string"
    }
]
```

We decided to use **cheerio** in order to scrape the page. It used simple and understandable syntax that is basically identical to jQuery.

We use the **request-promise** package to fetch the data from wikipedia! The first request is pretty fast, but it takes some time to fetch infromation on each wikipedia page for the presidents. We only gather the birth and death dates from the presidents own wikipage. The rest of the info could be gathered from the list of presidents page.

The class **fileWrite.js** utilizes the **jsonfile** package. It writes a json file with the given path/filename and json input.
