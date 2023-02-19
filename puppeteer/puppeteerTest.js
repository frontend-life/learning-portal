const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const timeLabel = "Puppeteer: check html for H1";

const main = async () => {
  // console.time(timeLabel);
  const contentHtml = fs.readFileSync(
    path.resolve(__dirname, "./testPuppeteer.html"),
    "utf8"
  );
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.setDefaultTimeout(100);
  await page.setContent(contentHtml);

  try {
    const headerSelector = "h1";
    const h1 = await page.waitForSelector(headerSelector);
    console.log(await (await h1.getProperty("textContent")).jsonValue());
  } catch (err) {
    console.log("Error -> no element");
  }
  // console.timeEnd(timeLabel);

  /**
   * Example from docs
   
  //   await page.goto("https://developer.chrome.com/");

  // Set screen size
  //   await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
//   await page.type(".search-box__input", "automate beyond recorder");

  // Wait and click on first result
  const searchResultSelector = ".search-box__link";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    "text/Customize and automate"
  );

  const fullTitle = await textSelector.evaluate((el) => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);
*/
  //   await (() =>
  //     new Promise((res) => {
  //       setTimeout(() => res(), 5000);
  //     }))();
  await browser.close();
};

async function checkTimeAsyncFunc(func, label) {
  console.time(label);
  await func();
  console.timeEnd(label);
}

async function checkMemoryAsyncFunc(func) {
  await func();
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }
}

checkTimeAsyncFunc(main, timeLabel);
checkMemoryAsyncFunc(main, timeLabel);
