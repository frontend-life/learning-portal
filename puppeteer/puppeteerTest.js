const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const timeLabel = "Puppeteer: check html for H1";

async function checkHtmlPageByPuppeteer() {
  const contentHtml = fs.readFileSync(
    path.resolve(__dirname, "./testPuppeteer.html"),
    "utf8"
  );
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultTimeout(100);
  await page.setContent(contentHtml);

  const headerSelector = "h1";
  try {
    const [isRed, isDisplayFlex] = await page.$eval(headerSelector, (el) => {
      const styles = window.getComputedStyle(el);
      return [styles.color === "rgb(255, 0, 0)", styles.display === "flex"];
    });

    console.log(isRed, isDisplayFlex);
  } catch (err) {
    console.log("Error -> no element");
  }

  // const spanSelector = "span";
  // try {
  //   const span = await page.waitForSelector(spanSelector);
  // } catch (err) {
  //   console.log("Error -> no element");
  // }

  // const imgSelector = "img";
  // try {
  //   const img = await page.waitForSelector(imgSelector);
  // } catch (err) {
  //   console.log("Error -> no element");
  // }

  await browser.close();
}

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

checkHtmlPageByPuppeteer();
