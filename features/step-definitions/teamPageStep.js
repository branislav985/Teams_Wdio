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
import TeamPage, {
  administratorsMembersApi,
  allSeatsApi,
  availableSeatsApi,
  configuredMembersApi,
  inactiveMembersApi,
  invitedMembersApi,
  notConfiguredMembersApi,
  suspendedMembersApi,
  teamIdApi,
  undeliverableMembersApi,
} from "../pageobjects/teamPage.js";
import { teamMembersAPI } from "../pageobjects/teamPage.js";

const global = new Global();
const teamS = new TeamPageSelectors();
const teamP = new TeamPage();
let availableSeatsBeforeIncrease;
// let randomSeatsForIncreaseDecrease
const randomSeatsForIncreaseDecrease = Math.floor(Math.random() * 10) + 1;
let teamMembersBeforeInvite;
let activeMembersBeforeInvite
let invitedMembersBeforeInvite;
let inactiveMembersBeforeInvite;
let suspendedMembersBeforeInvite;
let configuredMembersBeforeInvite;
let notConfiguredMembersBeforeInvite;
let administratorsMembersBeforeInvite;
let undeliverableMembersBeforeInvite;
let memberId
// let totalSeatsBeforeIncreaseApi

Given(/^Provide team data from API$/, async () => {

  await teamP.getSubscriptionsIdAndTeamId();
  await teamP.getAllSeatsApiAndSubscriptionId();
  await teamP.getAvailableSeatsApi();
  await teamP.getTeamDataApi();
});

When(/^I click on Team label$/, async () => {
  // await browser.setupInterceptor()
  await global.clickOnButton(teamS.TEAM_LABEL);

});

When(/^I check Team page elements and url (.*)$/, async (url) => {
  let elements = Array(teamS.TEAM_MEMBERS_TITLE);
  await global.confirmElementsExist(elements);
  await global.urlHasText(url);
});

Then(/^Confirm team members is equal to data from API$/, async () => {
  //There is waitUntill because it requires some time for data to be loaded

  console.log("Team members from API: " + teamMembersAPI);
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

When(/^I click on add seats button$/, async () => {
  await global.clickOnButton(await teamS.ADD_SEATS_BUTTON);
})

Then(/^increase total number of seats by random number between 1 and 10$/, async () => {

  const increasedSeats = parseInt(await teamP.getSeatsTotalFromInput()) + randomSeatsForIncreaseDecrease;
  await global.populateInputField(await teamS.SEAT_TOTAL_INPUT, increasedSeats);
})

Then(/^I click on Update subscription button$/, async () => {
  await global.clickOnButton(await teamS.APPLAY_CHANGES_BUTTON);
  await global.clickOnButton(await teamS.CACNEL_SUBSCRIPTION_BUTTON)
})

When(/^I get available seats before increase_decrease$/, async () => {
  availableSeatsBeforeIncrease = await teamP.getAvailableSeats()
})

Then(/^Confirm available seats is increased for the given random number$/, async () => {
  await browser.refresh()
  // const availableSeatsAfterIncrease = await teamP.getAvailableSeats();

  console.log("Available seats before increase: " + availableSeatsBeforeIncrease);
  console.log("Random seats for increase: " + randomSeatsForIncreaseDecrease);

  await browser.waitUntil(
    async () => {
      return await teamP.getAvailableSeats() === (availableSeatsBeforeIncrease + randomSeatsForIncreaseDecrease);
    },
    {
      timeout: 10000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
  console.log("Available seats after increase: " + await teamP.getAvailableSeats());
})

Then(/^Decrease total number of seats by same number we increased$/, async () => {
  const decreasedSeats = parseInt(await teamP.getSeatsTotalFromInput()) - randomSeatsForIncreaseDecrease;
  await global.populateInputField(await teamS.SEAT_TOTAL_INPUT, decreasedSeats);
})

Then(/^Confirm available seats is decreased for the given random number$/, async () => {
  await browser.refresh()
  // const availableSeatsAfterIncrease = await teamP.getAvailableSeats();

  console.log("Available seats before decrease: " + availableSeatsBeforeIncrease);
  console.log("Random seats for decrease: " + randomSeatsForIncreaseDecrease);

  await browser.waitUntil(
    async () => {
      return await teamP.getAvailableSeats() === (availableSeatsBeforeIncrease - randomSeatsForIncreaseDecrease);
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
  console.log("Available seats after decrease: " + await teamP.getAvailableSeats());
})

When(/^I click on Invite team member button$/, async () => {
  await global.clickOnButton(teamS.INVITE_TEAM_MEMBER_BUTTON);
})

When(/^I enter (.*) email in email input field$/, async (email) => {
  await global.populateInputField(teamS.EMAIL_INPUT, email)
})

When(/^I click on Add Member button$/, async () => {
  // await browser.setupInterceptor()
  await global.clickOnButton(teamS.ADD_MEMBER_BUTTON)
})

When(/^I provide data before inviting new member$/, async () => {
  teamMembersBeforeInvite = await teamP.getTeamMembers();
  availableSeatsBeforeIncrease = await teamP.getAvailableSeats();
  invitedMembersBeforeInvite = await teamP.getInvitedMembers();
  activeMembersBeforeInvite = await teamP.getActiveMembers();
  inactiveMembersBeforeInvite = await teamP.getInactivedMembers();
  suspendedMembersBeforeInvite = await teamP.getSuspendedMembers();
  configuredMembersBeforeInvite = await teamP.getConfiguredForVoice();
  notConfiguredMembersBeforeInvite = await teamP.getNotConfiguredForVoice();
  administratorsMembersBeforeInvite = await teamP.getAdministratorMembers();
  undeliverableMembersBeforeInvite = await teamP.getUndeliverableInvitations();

  console.log("Team members before invite: " + teamMembersBeforeInvite);
  console.log("Available seats before invite: " + availableSeatsBeforeIncrease);
  console.log("Invited members before invite: " + invitedMembersBeforeInvite);
  console.log("Inactive members before invite: " + inactiveMembersBeforeInvite);
  console.log("Active members before invite: " + activeMembersBeforeInvite);
  console.log("Suspended members before invite: " + suspendedMembersBeforeInvite);
  console.log("Configured for voice before invite: " + configuredMembersBeforeInvite);
  console.log("Not configured for voice before invite: " + notConfiguredMembersBeforeInvite);
  console.log("Administrators members before invite: " + administratorsMembersBeforeInvite);
  console.log("Undeliverable invitations before invite: " + undeliverableMembersBeforeInvite);
})


Then(/^Confirm invited members increase by 1$/, async () => {
  await browser.waitUntil(
    async () => {
      let invitedMembers = await teamP.getInvitedMembers();
      await expect(invitedMembers).toEqual(invitedMembersBeforeInvite + 1);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

Then(/^Confirm team members increase by 1s$/, async () => {
  await browser.waitUntil(
    async () => {
      let teamMembers = await teamP.getTeamMembers();
      await expect(teamMembers).toEqual(teamMembersBeforeInvite + 1);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

Then(/^Confirm available seats decrease by 1$/, async () => {
  await browser.waitUntil(
    async () => {
      let availableSeats = await teamP.getAvailableSeats();
      await expect(availableSeats).toEqual(availableSeatsBeforeIncrease - 1);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

Then(/^Confirm not configured for voice increased by 1$/, async () => {
  await browser.waitUntil(
    async () => {
      let notConfiguredForVoice = await teamP.getNotConfiguredForVoice();
      await expect(notConfiguredForVoice).toEqual(notConfiguredMembersBeforeInvite + 1);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

Then(/^Confirm inactive members did not change$/, async () => {
  await browser.waitUntil(
    async () => {
      let inactiveMembers = await teamP.getInactivedMembers();
      await expect(inactiveMembers).toEqual(inactiveMembersBeforeInvite);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

Then(/^Confirm active members did not change$/, async () => {
  await browser.waitUntil(
    async () => {
      let activeMembers = await teamP.getActiveMembers();
      await expect(activeMembers).toEqual(activeMembersBeforeInvite);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

Then(/^Confirm suspended members did not change$/, async () => {
  await browser.waitUntil(
    async () => {
      let suspendedMembers = await teamP.getSuspendedMembers();
      await expect(suspendedMembers).toEqual(suspendedMembersBeforeInvite);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

Then(/^Confirm configured for voice did not change$/, async () => {
  await browser.waitUntil(
    async () => {
      let configuredForVoice = await teamP.getConfiguredForVoice();
      await expect(configuredForVoice).toEqual(configuredMembersBeforeInvite);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

Then(/^Confirm administrators members did not change$/, async () => {
  await browser.waitUntil(
    async () => {
      let administratorsMembers = await teamP.getAdministratorMembers();
      await expect(administratorsMembers).toEqual(administratorsMembersBeforeInvite);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

Then(/^Confirm undeliverable invitations did not change$/, async () => {
  await browser.waitUntil(
    async () => {
      let undeliverableInvitations = await teamP.getUndeliverableInvitations();
      await expect(undeliverableInvitations).toEqual(undeliverableMembersBeforeInvite);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

Then(/^I store added member's data from API$/, async () => {
  console.log("Team ID from API: " + teamIdApi);

  // Samo jedan poziv getRequests() u celom step-u
  const request = await browser.waitUntil(
    async () => {
      const requests = await browser.getRequests({ includePending: false });
      return requests.find(
        (req) =>
          req.url === `https://teams.qa.softphone.com/api/v2/team/${teamIdApi}/member` &&
          req.response
      );
    },
    {
      timeout: 10000,
      timeoutMsg: "The API has not been found for 10 sec",
    }
  );

  memberId = request.response.body.members[0].id;
  console.log("Added member ID from API:", memberId);
})

Then(/^I delete added member via API to keep the state$/, async () => {
  await global.makeRequest("DELETE", "https://teams.qa.softphone.com/api/v2/team/" + teamIdApi + "/member/" + memberId + "/?admin=false&status=invited");
  await browser.refresh()
})

Then(/^Confirm seccess toast message (.*) is displayed$/, async (message) => {
  await teamS.TOAST_MESSAGE.waitForDisplayed({ timeout: 10000 });
  expect(await teamS.TOAST_MESSAGE.getText()).toContain(message);
})

Then(/^Added user with (.*) is in the Team Members list$/, async (userEmail) => {
  // await browser.refresh()

  await browser.waitUntil(
    async () => {
      const allMembers = await teamS.ALL_MEMBERS_EMAILS
      return expect(allMembers.forEach((element) => {
        (element.getValue() === userEmail)
      }))
    },
    {
      timeout: 5000,
      timeoutMsg: "User email is not found in the Team Members list after 5sec",
      interval: 300
    }
  )

})

Then(/^I click on Remove team member button for (.*) added member$/, async (email) => {
  // await browser.pause(5000)

  // console.log("All members count: " + allAddedMembers.length)
  // await browser.pause(5000)


  const allAddedMembers = await $$("input");

  for (let i = 0; i < allAddedMembers.length; i++) {
    let inputElement = allAddedMembers[i];
    const emailValue = await allAddedMembers[i].getValue();
    console.log("Email value: " + await emailValue)
    await inputElement.scrollIntoView();

    if (emailValue === email) {
      const deleteButton = await teamS.DELETE_MEMBER_BUTTONS[i]
      await global.clickOnButton(deleteButton)
    }
  }
})

Then(/^Click on Confirm button$/, async () => {
  await global.clickOnButton(teamS.CONFIRM_REMOVE_MEMBER_BUTTON)
})

Then(/^Confirm invited members decrease by 1$/, async () => {
  await browser.waitUntil(
    async () => {
      let invitedMembers = await teamP.getInvitedMembers();
      await expect(invitedMembers).toEqual(invitedMembersBeforeInvite);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})
Then(/^Confirm team members decrease by 1$/, async () => {
  await browser.waitUntil(
    async () => {
      let teamMembers = await teamP.getTeamMembers();
      await expect(teamMembers).toEqual(teamMembersBeforeInvite);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

Then(/^Confirm available seats increase by 1$/, async () => {
  await browser.waitUntil(
    async () => {
      let availableSeats = await teamP.getAvailableSeats();
      await expect(availableSeats).toEqual(availableSeatsBeforeIncrease);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

Then(/^Confirm not configured for voice decrease by 1$/, async () => {
  await browser.waitUntil(
    async () => {
      let notConfiguredForVoice = await teamP.getNotConfiguredForVoice();
      await expect(notConfiguredForVoice).toEqual(notConfiguredMembersBeforeInvite);
      return true;
    },
    {
      timeout: 5000,
      timeoutMsg: "data is not loaded after 10sec",
      interval: 300
    }
  )
})

// When(/^I click on Team label_delete$/, async() => {
// await browser.setupInterceptor()
//   await global.clickOnButton(teamS.TEAM_LABEL);
// })

