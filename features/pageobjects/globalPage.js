import { browser } from "@wdio/globals";
import axios from "axios";

var token = "";

export default class Global {
  async waitForElement(element) {
    await element.waitForDisplayed({ timeout: 5000 });
  }

  async open(path) {
    await browser.maximizeWindow();
    await browser.url(`/${path}`);
  }

  async populateInputField(selector, data) {
    await selector.click();
    await selector.setValue(data);
  }

  async clickOnButton(selector) {
    await selector.click();
  }
  async expectedTabsNumber(num) {
    await expect(await this.getTabsCount()).toEqual(num);
  }

  async confirmElementExists(selector) {
    await expect(selector).toBeExisting();
  }

  async confirmElementsExist(elements) {
    elements.forEach((element) => {
      expect(element).toBeExisting();
    });
  }

  async confirmElementDoesNotExist(selector) {
    await expect(selector).not.toBeExisting();
  }

  async confirmAttributeOfElement(selector, attribute, value) {
    await expect(selector).toHaveAttribute(attribute, value);
  }

  async elementHasText(element, text) {
    await expect(element).toHaveText(text);
  }

  async elementGetTextAndCompare(element, text) {
    const textElement = await element.getText();
    await expect(text).toEqual(textElement);
  }

  async urlHasText(url) {
    await expect(browser).toHaveUrl(url);
  }

  async switchToWindow(num) {
    browser.switchToWindow((await browser.getWindowHandles())[num - 1]);
  }

  async clearInput(element) {
    await element.clearValue();
  }

  async getTabsCount() {
    console.log("Tubs count is: " + (await browser.getWindowHandles()).length);
    return (await browser.getWindowHandles()).length;
  }

  async currentUrlContains(url) {
    await expect(browser).toHaveUrl(expect.stringContaining(url));
  }

  async closeCurentTab() {
    await browser.closeWindow();
    await browser.switchToWindow((await browser.getWindowHandles())[0]);
  }

  async openNewTabWithUrl(url) {
    await browser.createWindow("tab");
    await browser.switchWindow("about:blank");
    await browser.navigateTo(url);
  }

  async logOut() {
    await this.makeRequest("GET", 'https://teams.qa.softphone.com//api/v2/session/logout');
  }

  async makeRequest(method, url, data) {
    const token = await this.getToken();
    const cookies = await browser.getCookies('CP_3ae49351d5f78dd6a0985c4ddf144764');
    try {
      const response = await axios({
        method,
        url,
        data,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'cookie': 'CP_3ae49351d5f78dd6a0985c4ddf144764=' + cookies[0].value
        },
        timeout: 10000
      });
      console.log(`✓ API ${method} ${url} - Status: ${response.status}`);
      return response.data;
    } catch (error) {
      console.error(`✗ API ${method} ${url} failed:`, error.message);
      throw error;
    }
  }

  async getToken() {
    token = await browser.execute(() => {
      return localStorage.getItem("authentication-token");
    });
    // console.log(token);
    return token;
  }

  async scrollIntoView(element) {
    await element.scrollIntoView();
  }

  async selectFromDropDownByAttribute(element, attribute, value) {
    await element.selectByAttribute(attribute, value);
  }

  async closeAllTabs() {
    const allWindows = await browser.getWindowHandles();
    for (let i = 1; i < allWindows.length; i++) {
      await browser.switchToWindow(allWindows[i]);
      await browser.closeWindow();
      await browser.switchToWindow(allWindows[0]);
    }
  }

  async waitForPageLoad(timeout = 30000) {
    await browser.waitUntil(
      async () => (await browser.execute(() => document.readyState)) === 'complete',
      { timeout, timeoutMsg: 'Page did not load completely' }
    );
  }

  async takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await browser.saveScreenshot(`./screenshots/${name}_${timestamp}.png`);
    console.log(`📸 Screenshot saved: ${name}_${timestamp}.png`);
  }

}
