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

export default class teamPage {
  async getTeamMembers() {
    const teamMembersNum = (await teamS.TEAM_DATA[0].getText()).split("\n")[0];
    // console.log(teamMembersNum)
    return parseInt(teamMembersNum);
  }

  async getAvailableSeats() {
    const availableSeatsNum = (await teamS.TEAM_DATA[1].getText()).split(
      "\n",
    )[0];
    // console.log(vailableSeatsNum)
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
    await browser.waitUntil(
      async () => {
        const requests = await browser.getRequests();
        return (
          Array.isArray(requests) &&
          requests.some(
            (request) =>
              request.url &&
              request.url.includes("/api/v2/authUser") &&
              request.response,
          )
        );
      },
      {
        timeout: 10000,
        timeoutMsg: "API poziv se nije završio u roku od 10 sekundi",
      },
    );

    const requests = await browser.getRequests();
    const userApiRequest = requests.find((request) =>
      request.url.includes("https://teams.qa.softphone.com/api/v2/authUser"),
    );

    const response = userApiRequest.response;
    subscriptionsIdApi = response.body.subscriptions[0];
    teamIdApi = response.body.team.id;

    console.log("SubscritionsId from API: ", subscriptionsIdApi);
    console.log("TeamID from API: " + teamIdApi);
  }

  async getAllSeatsApi() {
    // this.getSubscriptionsIdAndTeamId()
    await browser.waitUntil(
      async () => {
        const requests = await browser.getRequests();
        return requests.some(
          (request) =>
            request.url ===
              "https://teams.qa.softphone.com/api/v2/subscription/" +
                subscriptionsIdApi && request.response,
        );
      },
      {
        timeout: 10000,
        timeoutMsg: "getSubscriptionsIdAndTeamId API has not fount for 10 sec",
      },
    );

    const requests = await browser.getRequests();
    const userApiRequest = requests.find(
      (request) =>
        request.url ===
        "https://teams.qa.softphone.com/api/v2/subscription/" +
          subscriptionsIdApi,
    );

    const response = userApiRequest.response;
    allSeatsApi = response.body.seats;
    console.log("All seats from API:", allSeatsApi);
  }

  async getAvailableSeatsApi() {
    // this.getSubscriptionsIdAndTeamId()
    await browser.waitUntil(
      async () => {
        const requests = await browser.getRequests();
        return requests.some(
          (request) => request.url.includes("/seats") && request.response,
        );
      },
      {
        timeout: 10000,
        timeoutMsg: "getAvailableSeatsApi API has not fount for 10 sec",
      },
    );

    const requests = await browser.getRequests();
    const userApiRequest = requests.find((request) =>
      request.url.includes("/seats"),
    );

    const response = userApiRequest.response;
    availableSeatsApi = response.body.available_seats;
    console.log("Available seats from API:", availableSeatsApi);
  }

  async getTeamDataApi() {
    // this.getSubscriptionsIdAndTeamId()
    await browser.waitUntil(
      async () => {
        const requests = await browser.getRequests();
        return requests.some(
          (request) =>
            request.url ===
              "https://teams.qa.softphone.com/api/v2/team/" + teamIdApi &&
            request.response,
        );
      },
      {
        timeout: 10000,
        timeoutMsg: "API has not fount for 10 sec",
      },
    );

    const requests = await browser.getRequests();
    const userApiRequest = requests.find(
      (request) =>
        request.url ===
        "https://teams.qa.softphone.com/api/v2/team/" + teamIdApi,
    );

    const response = userApiRequest.response;

    teamMembersAPI = response.body.team_size;
    invitedMembersApi = response.body.invited_members;
    inactiveMembersApi = response.body.inactive_members;
    activeMembersApi = response.body.active_members;
    suspendedMembersApi = response.body.suspended_members;
    configuredMembersApi = response.body.configured_for_voice;
    notConfiguredMembersApi = response.body.unconfigured_for_voice;
    administratorsMembersApi = response.body.admin_members;
    undeliverableMembersApi = response.body.undeliverable_email_members;

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
}
