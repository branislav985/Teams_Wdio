import { browser } from "@wdio/globals";
import TeamPageSelectors from "../elements/teamPageEl.js";
import axios from "axios";

const teamS = new TeamPageSelectors();
export let subscriptionsIdApi;
export let allSeatsApi;
export let availableSeatsApi;
export let teamIdApi;
export let teamMembersAPI;
export let invitedMembersApi;
export let inactiveMembersApi;
export let activeMembersApi;
export let suspendedMembersApi;
export let configuredMembersApi;
export let notConfiguredMembersApi;
export let administratorsMembersApi;
export let undeliverableMembersApi;
export let subscriptionTypeApi;

export default class TeamPage {
  async getTeamMembers() {
    
    const teamMembersNum = (await teamS.TEAM_DATA[0].getText()).split("\n")[0];
    // console.log(teamMembersNum)
    return parseInt(teamMembersNum);
  }

  async getAvailableSeats() {
    console.log(("PRE Awaiting for available seats to be different than 0" + ": " + await teamS.TEAM_DATA[1].getText()).split("\n",)[0]);
    await browser.waitUntil(
      async () => 
        (parseInt((await teamS.TEAM_DATA[1].getText()).split("\n",)[0])) > 0
      
    )
console.log(("POSLE Awaiting for available seats to be different than 0" + ": " + await teamS.TEAM_DATA[1].getText()).split("\n",)[0]);
    const availableSeatsNum = (await teamS.TEAM_DATA[1].getText()).split(
      "\n",
    )[0];
    return parseInt(availableSeatsNum);
  }

  async getInvitedMembers() {
    const invitedMembersNum = (await teamS.TEAM_DATA[2].getText()).split(
      "\n",
    )[0];
    // console.log(invitedMembersNum)
    return parseInt(invitedMembersNum);
  }

  async getInactivedMembers() {
    const inactiveMembersNum = (await teamS.TEAM_DATA[3].getText()).split(
      "\n",
    )[0];
    // console.log(inactiveMembersNum)
    return parseInt(inactiveMembersNum);
  }

  async getActiveMembers() {
    const activeMembersNum = (await teamS.TEAM_DATA[4].getText()).split(
      "\n",
    )[0];
    // console.log(activeMembersNum)
    return parseInt(activeMembersNum);
  }

  async getSuspendedMembers() {
    const suspendedMembersNum = (await teamS.TEAM_DATA[5].getText()).split(
      "\n",
    )[0];
    // console.log(suspendedMembersNum)
    return parseInt(suspendedMembersNum);
  }

  async getConfiguredForVoice() {
    const configuredForVoiceNum = (await teamS.TEAM_DATA[6].getText()).split(
      "\n",
    )[0];
    // console.log(configuredForVoiceNum)
    return parseInt(configuredForVoiceNum);
  }

  async getNotConfiguredForVoice() {
    const notConfiguredForVoiceNum = (await teamS.TEAM_DATA[7].getText()).split(
      "\n",
    )[0];
    // console.log(notConfiguredForVoiceNum)
    return parseInt(notConfiguredForVoiceNum);
  }

  async getAdministratorMembers() {
    const administratorMembersNum = (await teamS.TEAM_DATA[8].getText()).split(
      "\n",
    )[0];
    // console.log(administratorMembersNum)
    return parseInt(administratorMembersNum);
  }

  async getUndeliverableInvitations() {
    const undeliverableInvitationsNum = (
      await teamS.TEAM_DATA[9].getText()
    ).split("\n")[0];
    // console.log(undeliverableInvitationsNum)
    return parseInt(undeliverableInvitationsNum);
  }

  async getSubscriptionsIdAndTeamId() {
    // Uhvati return vrednost!
    const request = await browser.waitUntil(
      async () => {
        const requests = await browser.getRequests({ includePending: false });
        return requests.find(
          (req) => req.url.includes("api/v2/authUser") && req.response
        );
      },
      { timeout: 10000 }
    );

    // Sada request postoji
    subscriptionsIdApi = request.response.body.subscriptions[0];
    teamIdApi = request.response.body.team.id;
  }

  async getAllSeatsApiAndSubscriptionId() {
    // this.getSubscriptionsIdAndTeamId()
    const request = await browser.waitUntil(
      async () => {
        const requests = await browser.getRequests();
        return requests.find(
          (req) =>
            req.url ===
            "https://teams.qa.softphone.com/api/v2/subscription/" +
            subscriptionsIdApi && req.response,
        );
      },
      {
        timeout: 10000,
        timeoutMsg: "getSubscriptionsIdAndTeamId API has not found for 10 sec",
      },
    );

    allSeatsApi = request.response.body.seats;
    subscriptionTypeApi = request.response.body.product_handle;
    console.log("All seats from API:", allSeatsApi);
    console.log("Subscription type from API:", subscriptionTypeApi);
  }

  async getAvailableSeatsApi() {
    if (!teamIdApi) {
      await this.getSubscriptionsIdAndTeamId();
    }
    // this.getSubscriptionsIdAndTeamId()
    const request = await browser.waitUntil(
      async () => {
        const requests = await browser.getRequests();
        return requests.find(
          (req) => req.url.includes("/seats") && req.response,
        );
      },
      {
        timeout: 10000,
        timeoutMsg: `Team API (ID: ${teamIdApi}) has not been found for 10 sec`
      },
    );

    availableSeatsApi = request.response.body.available_seats;
    console.log("Available seats from API:", availableSeatsApi);
  }

  async getTeamDataApi() {
    // this.getSubscriptionsIdAndTeamId()
    const request = await browser.waitUntil(
      async () => {
        const requests = await browser.getRequests({ includePending: false });
        return requests.find(
          (req) =>
            req.url ===
            "https://teams.qa.softphone.com/api/v2/team/" + teamIdApi &&
            req.response,
        );
      },
      {
        timeout: 10000,
        timeoutMsg: "API has not fount for 10 sec",
      },
    );

    teamMembersAPI = request.response.body.team_size;
    invitedMembersApi = request.response.body.invited_members;
    inactiveMembersApi = request.response.body.inactive_members;
    activeMembersApi = request.response.body.active_members;
    suspendedMembersApi = request.response.body.suspended_members;
    configuredMembersApi = request.response.body.configured_for_voice;
    notConfiguredMembersApi = request.response.body.unconfigured_for_voice;
    administratorsMembersApi = request.response.body.admin_members;
    undeliverableMembersApi = request.response.body.undeliverable_email_members;

    console.log("Team members from API:", teamMembersAPI);
    console.log("Invited members from API:", invitedMembersApi);
    console.log("Inactive members from API:", inactiveMembersApi);
    console.log("Active members from API:", activeMembersApi);
    console.log("Suspended members from API:", suspendedMembersApi);
    console.log("Configured members from API:", configuredMembersApi);
    console.log("Not configured members from API:", notConfiguredMembersApi);
    console.log("Administrator members from API:", administratorsMembersApi);
    console.log("Undeliverable invitations from API:", undeliverableMembersApi);
  }

  async getSeatsTotalFromInput() {
    const seatsTotal = await teamS.SEAT_TOTAL_INPUT.getValue();
    return seatsTotal
  }
}
