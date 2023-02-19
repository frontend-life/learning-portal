const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const timeLabel = "Puppeteer: check html for H1";

async function checkHtmlPageByPuppeteer() {
  const contentHtml = fs.readFileSync(
    path.resolve(__dirname, "./testPuppeteer.html"),
    "utf8"
  );
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setDefaultTimeout(100);
  await page.setContent(contentHtml);

  /**
   *  Test css styles: flex and color
   */
  const headerSelector = "h1";
  try {
    const result = await page.$eval(headerSelector, (el) => {
      const styles = window.getComputedStyle(el);
      const isRed = styles.color === "rgb(255, 0, 0)";
      const isDisplayFlex = styles.display === "flex";
      return { isRed, isDisplayFlex };
    });

    logCheckResult(result);
  } catch (err) {
    console.log("Error -> no element");
  }

  /**
   * Test css styles with external css file: width, height, background-color
   */
  try {
    await page.addStyleTag({
      path: path.resolve(__dirname, "./testPuppeteer.css"),
    });
    const result = await page.$eval(".content", (el) => {
      const isElExists = el !== null;
      const elStyles = window.getComputedStyle(el);
      const isWidthCorrect = elStyles.width === "400px";
      const isHeightCorrect = elStyles.height === "400px";
      const isBackgroundColorCorrect =
        elStyles.backgroundColor === "rgb(127, 255, 212)";

      return {
        isElExists,
        isWidthCorrect,
        isHeightCorrect,
        isBackgroundColorCorrect,
      };
    });

    logCheckResult(result);
  } catch (err) {
    console.log("Error -> no element");
  }

  const spanSelector = "span";
  try {
    const span = await page.waitForSelector(spanSelector);
  } catch (err) {
    console.log("Error -> no element");
  }

  const imgSelector = "img";
  try {
    const img = await page.waitForSelector(imgSelector);
  } catch (err) {
    console.log("Error -> no element");
  }

  /**
   * Timeout to see browser if it is turn on in headless mode
   */
  await new Promise((resolve) => setTimeout(resolve, 5000));

  await browser.close();
}

/**
 * result is an object with keys: isRed, isDisplayFlex, for example
 * as return we got string like this: "Test is success -> isRed: true, isDisplayFlex: true"
 */
function logCheckResult(result) {
  console.log(
    `Test is success -> ${Object.entries(result).reduce((acc, [key, value]) => {
      return acc + `${key}: ${value}, `;
    }, "")})}`
  );
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

checkMemoryAsyncFunc(checkHtmlPageByPuppeteer);
