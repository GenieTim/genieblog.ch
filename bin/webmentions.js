const fs = require("fs");
const path = require("path");
const https = require("https");

/**
 * The "main" function:
 * loading the data and writing it to the correct directory
 */
fetchWebmentions().then(webmentions => {
  webmentions.forEach(webmention => {
    const slug = webmention["wm-target"]
      .replace("https://genieblog.ch/", "")
      .replace("index.html", "")
      .replace(/\/$/, "");

    const filename = `${__dirname}/../source/data/webmentions/${slug}.json`;

    if (!fs.existsSync(filename)) {
      ensureDirectoryExistence(filename);
      fs.writeFileSync(filename, JSON.stringify([webmention], null, 2));

      return;
    }

    const entries = JSON.parse(fs.readFileSync(filename))
      .filter(wm => wm["wm-id"] !== webmention["wm-id"])
      .concat([webmention]);

    entries.sort((a, b) => a["wm-id"] - b["wm-id"]);

    fs.writeFileSync(filename, JSON.stringify(entries, null, 2));
  });
}).catch(error => {
  console.error(error)
});

/**
 * Make sure all directories to a file exist
 * 
 * @param {string} filePath 
 */
function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname, {
    recursive: true
  });
}

/**
 * Actually load the webmentions from the 
 * webmention.io API endpoint
 */
function fetchWebmentions() {
  const token = process.env.WEBMENTIONS_TOKEN;

  const since = new Date();
  since.setDate(since.getDate() - 3);

  const url =
    "https://webmention.io/api/mentions.jf2" +
    "?domain=genieblog.ch" +
    `&token=${token}` +
    `&since=${since.toISOString()}` +
    "&per-page=999";

  return doGetJSON(url).then(response => {
    if (!("children" in response)) {
      throw new Error("Invalid webmention.io response. Got response: " + JSON.stringify(response));
    }

    return response.children;
  })
}

/**
 * Make a "GET" request to fetch some JSON data
 * 
 * @param {string} url 
 */
function doGetJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let body = "";

        res.on("data", chunk => {
          body += chunk;
        });

        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", error => {
        reject(error);
      });
  }).then(response => {
    return response
  });
}
