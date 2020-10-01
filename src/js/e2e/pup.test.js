import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('Popover form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    server.kill();
    await browser.close();
  });
  test('button click no popover', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.popover-form');
    const but = await form.$('.button-small');
    but.click();
    await page.waitForSelector('.popover');
    const popover = await page.$('.popover');
    const value = await page.evaluate((el) => el.style.display, popover);
    if (value !== 'block') { throw new Error('error'); }
  });

  test('button click popover', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.popover-form');
    const but = await form.$('.button-small');
    but.click();
    but.click();
    await page.waitForSelector('.popover');
    const popover = await page.$('.popover');
    const value = await page.evaluate((el) => el.style.display, popover);
    if (value !== 'none') { throw new Error('error'); }
  });
});
