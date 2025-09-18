import { Given, When, Then, BeforeAll, Before, After } from '@wdio/cucumber-framework';
import Global from '../pageobjects/globalPage';
import TeamPageSelectors from '../elements/teamPageEl';
import teamPage from '../pageobjects/teamPage.js';

const global = new Global()
const teamS = new TeamPageSelectors()
const teamP = new teamPage()
// const teamMembers = teamMembersAPI

When(/^I click on Team label$/, async () => {
    await global.clickOnButton(teamS.TEAM_LABEL)
})

When(/^I check Team page elements and url (.*)$/, async (url) => {
    let elements = Array(teamS.TEAM_MEMBERS_TITLE)
    await global.confirmElementsExist(elements)
    await global.urlHasText(url)
})

Then(/^Confirm team members is equal data from API$/, async () => {
    // await browser.waitUntil(async () => {
    //     const eltext = (await teamS.TEAM_DATA[0].getText()).replace(/\r?\n|\r/g, ' ');
    //     return eltext === text;
    // });
    // console.log("BROJ CLANOVA: " + teamMembersAPI)

})


await teamP.getTeamMembers()
await teamP.getAvailableSeats()
await teamP.getInvitedMembers()
await teamP.getInactivedMembers()
await teamP.getActiveMembers()
await teamP.getSuspendedMembers()
await teamP.getConfiguredForVoice()
await teamP.getNotConfiguredForVoice()
await teamP.getAdministratorMembers()
await teamP.getUndeliverableInvitations()




Then(/^Confirm available seets text (.*)$/, async (text) => {

    await browser.waitUntil(async () => {
        const eltext = (await teamS.TEAM_DATA[1].getText()).replace(/\r?\n|\r/g, ' ');
        return eltext === text;
    });
})

Given(/^Provide required data from API$/, async () => {
    await teamP.getSeatsNum()
    await teamP.getTeamMembersApi()

})
