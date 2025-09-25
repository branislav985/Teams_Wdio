import { Given, When, Then, After } from "@wdio/cucumber-framework";
import LoginPageSelectors from "../elements/loginEl.js";
import Global from "../pageobjects/globalPage.js";
import * as dotenv from "dotenv";
import { browser } from "@wdio/globals";
import { credentials } from "../../wdio.conf.js";

dotenv.config();
const loginS = new LoginPageSelectors();
const global = new Global();

Given(/^I land on login page Teams$/, async () => {
  await global.open("login");
  await expect(loginS.TITLE).toHaveText("Login to Bria Teams");
});

When(/^I enter email$/, async () => {
  await global.populateInputField(loginS.EMAIL_INPUT, credentials.USERNAME_ADMIN);
});

When(/^I enter password$/, async () => {
  await global.populateInputField(loginS.PASSWORD_INPUT, credentials.PASSWORD_ADMIN);
});

When(/^Clear input fields$/, async () => {
  await global.clearInput(loginS.EMAIL_INPUT);
  await global.clearInput(loginS.PASSWORD_INPUT);
});

Then(/^Confirm login button is disabled$/, async () => {
  await global.confirmAttributeOfElement(
    loginS.LOGIN_BUTTON,
    "disabled",
    "true",
  );
});

When(/^I click on Login button$/, async () => {
  await global.clickOnButton(loginS.LOGIN_BUTTON);
});

Then(/^I am on Dashboard with title (.*) and URL (.*)$/, async (title, url) => {
  await global.elementHasText(loginS.DASHBOARD_TITLE, title);
  await global.urlHasText(url);
});

Then(/^I get the auth token$/, async () => {
  await global.getToken();
});

When(/^I enter (.*) email$/, async (email) => {
  await global.populateInputField(loginS.EMAIL_INPUT, email);
});

When(/^I enter (.*) password$/, async (pass) => {
  await global.populateInputField(loginS.PASSWORD_INPUT, pass);
});

Then(/^(.*) is shown$/, async (messageText) => {
  await expect(loginS.ERROR_LOGIN_MESSAGE).toHaveText(messageText);
});

Then(/^Incorrect login (.*) is shown$/, async (messageText) => {
  await expect(loginS.ERROR_LOGIN_MESSAGE).toHaveText(messageText);
});

Then(/^Do the pause$/, async () => {
  await browser.pause(100000);
});

When(/^I click on forgot password link$/, async () => {
  await global.clickOnButton(loginS.FORGOT_PASSWORD);
});

When(/^Page with (.*) is opened$/, async (title) => {
  await global.waitForElement(loginS.NEXT_BUTTON);
  await global.elementHasText(loginS.TITLE, title);
});

When(/^click on next button$/, async () => {
  await global.clickOnButton(loginS.NEXT_BUTTON);
});

Then(/^(.*) is appeared$/, async (message) => {
  await global.elementHasText(loginS.FORGOT_PASSWORD_ERROR_MESSAGE, message);
});

Then(/^log out by API$/, async () => {
  await global.logOut();
});

When(/^open (.*) page in new tab$/, async (url) => {
  await global.openNewTabWithUrl(url);
  await browser.pause(3000);
});

When(/^open last email in inbox$/, async () => {
  await global.clickOnButton(loginS.LAST_EMAIL);
});

When(/^open link for email recovering$/, async () => {
  await browser.switchFrame(loginS.INBOX_IFRAME);
  await global.scrollIntoView(loginS.RECOVERING_LINK);
  await global.clickOnButton(loginS.RECOVERING_LINK);
});

When(/^enter new password (.*)$/, async (email) => {
  await global.populateInputField(loginS.CHOSE_INPUT_EMAIL, email);
});

When(/^confirm page with title (.*)$/, async (title) => {
  await global.switchToWindow(3);
  await browser.pause(1000);
  await global.elementHasText(loginS.CHOSE_TITLE, title);
});

When(/^confirm change password button is disabled$/, async () => {
  !(await loginS.CHOSE_CHANGE_PASS_BUTTON.isEnabled());
});

When(/^confirm change password button is enabled$/, async () => {
  await loginS.CHOSE_CHANGE_PASS_BUTTON.isEnabled();
});

When(/^click on confirm change password$/, async () => {
  await global.clickOnButton(loginS.CHOSE_CHANGE_PASS_BUTTON);
});

Then(
  /^Revert back old password (.*) instead of (.*)$/,
  async (oldPass, currentPass) => {
    await global.clickOnButton(loginS.PROFILE_ICON);
    await global.clickOnButton(loginS.PROFILE_CHANGE_PASSWORD);
    await global.populateInputField(loginS.INPUT_CURRENT_PASSWORD, currentPass);
    await global.populateInputField(loginS.INPUT_NEW_PASSWORD, oldPass);
    await global.clickOnButton(loginS.CONFIRM_CHANGE_PASSWORD);
  },
);

Then(/^Change password message (.*) is present$/, async (text) => {
  await global.elementHasText(loginS.CHANGE_PASS_CONFIRM_MESSAGE, text);
});

When(/^I click on Click here link$/, async () => {
  await global.clickOnButton(loginS.CLICK_HERE_LINK);
});

When(
  /^I am redirected on page with title (.*) and URL (.*)$/,
  async (title, url) => {
    await global.elementHasText(loginS.CREATE_ACCOUNT_TITTLE, title);
    await global.urlHasText(url);
  },
);

Then(/^Title is (.*)$/, async (title) => {
  await global.elementHasText(loginS.TITLE, title);
});

When(/^I change the language to Espanol$/, async () => {
  await global.selectFromDropDownByAttribute(
    loginS.LANGUAGE_SELECTOR,
    "data-testid",
    "locale_option_es",
  );
});

Then("log out by API and close all tabs", async () => {
  await global.logOut();
  await global.closeAllTabs();
});
