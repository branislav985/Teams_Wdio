import {
  Given,
  When,
  Then,
  BeforeAll,
  Before,
  After,
} from "@wdio/cucumber-framework";
import Global from "../pageobjects/globalPage.js";
import TeamPageSelectors from "../elements/teamPageEl.js";
import teamPage, {
  administratorsMembersApi,
  availableSeatsApi,
  configuredMembersApi,
  inactiveMembersApi,
  invitedMembersApi,
  notConfiguredMembersApi,
  suspendedMembersApi,
  undeliverableMembersApi,
} from "../pageobjects/teamPage.js";
import { teamMembersAPI } from "../pageobjects/teamPage.js";

const global = new Global();
const teamS = new TeamPageSelectors();
const teamP = new teamPage();

Given(/^Provide team data from API$/, async () => {
  await teamP.getSubscriptionsIdAndTeamId();
  await teamP.getAllSeatsApi();
  await teamP.getAvailableSeatsApi();
  await teamP.getTeamDataApi();
});

When(/^I click on Team label$/, async () => {
  await global.clickOnButton(teamS.TEAM_LABEL);
});

When(/^I check Team page elements and url (.*)$/, async (url) => {
  let elements = Array(teamS.TEAM_MEMBERS_TITLE);
  await global.confirmElementsExist(elements);
  await global.urlHasText(url);
});

Then(/^Confirm team members is equal to data from API$/, async () => {
  //There is waitUntill because it requires some time for data to be loaded
  await browser.waitUntil(async () => {
    let eltext = await teamP.getTeamMembers();
    await expect(eltext).toEqual(teamMembersAPI);
    return true;
  });
});

Then(/^Confirm available seets is equal to data from API$/, async () => {
  await browser.waitUntil(async () => {
    let eltext = await teamP.getAvailableSeats();
    await expect(eltext).toEqual(availableSeatsApi);
    return true;
  });
});

Then(/^Confirm invited members is equal to data from API$/, async () => {
  await browser.waitUntil(async () => {
    let eltext = await teamP.getInvitedMembers();
    await expect(eltext).toEqual(invitedMembersApi);
    return true;
  });
});

Then(/^Confirm inactive members is equal to data from API$/, async () => {
  await browser.waitUntil(async () => {
    let eltext = await teamP.getInactivedMembers();
    await expect(eltext).toEqual(inactiveMembersApi);
    return true;
  });
});

Then(/^Confirm suspended members is equal to data from API$/, async () => {
  await browser.waitUntil(async () => {
    let eltext = await teamP.getSuspendedMembers();
    await expect(eltext).toEqual(suspendedMembersApi);
    return true;
  });
});

Then(/^Confirm configured for voice is equal to data from API$/, async () => {
  await browser.waitUntil(async () => {
    let eltext = await teamP.getConfiguredForVoice();
    await expect(eltext).toEqual(configuredMembersApi);
    return true;
  });
});

Then(
  /^Confirm not configured for voice is equal to data from API$/,
  async () => {
    await browser.waitUntil(async () => {
      let eltext = await teamP.getNotConfiguredForVoice();
      await expect(eltext).toEqual(notConfiguredMembersApi);
      return true;
    });
  },
);

Then(/^Confirm administrators members is equal to data from API$/, async () => {
  await browser.waitUntil(async () => {
    let eltext = await teamP.getAdministratorMembers();
    await expect(eltext).toEqual(administratorsMembersApi);
    return true;
  });
});

Then(
  /^Confirm undeliverable invitations is equal to data from API$/,
  async () => {
    await browser.waitUntil(async () => {
      let eltext = await teamP.getUndeliverableInvitations();
      await expect(eltext).toEqual(undeliverableMembersApi);
      return true;
    });
  },
);
