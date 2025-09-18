import { browser } from '@wdio/globals';
import TeamPageSelectors from '../elements/teamPageEl.js';
import axios from 'axios'


const teamS = new TeamPageSelectors()
let subscriptionsId;
let allSeats;
let teamId;
var teamMembersAPI;

export default class teamPage {

    async getTeamMembers() {
        const teamMembersNum = (await teamS.TEAM_DATA[0].getText()).split('\n')[0]
        // console.log(teamMembersNum)
        return teamMembersNum
    }

    async getAvailableSeats() {
        const vailableSeatsNum = (await teamS.TEAM_DATA[1].getText()).split('\n')[0]
        // console.log(vailableSeatsNum)
        return vailableSeatsNum
    }

    async getInvitedMembers() {
        const invitedMembersNum = (await teamS.TEAM_DATA[2].getText()).split('\n')[0]
        // console.log(invitedMembersNum)
        return invitedMembersNum
    }

    async getInactivedMembers() {
        const inactiveMembersNum = (await teamS.TEAM_DATA[3].getText()).split('\n')[0]
        // console.log(inactiveMembersNum)
        return inactiveMembersNum
    }

    async getActiveMembers() {
        const activeMembersNum = (await teamS.TEAM_DATA[4].getText()).split('\n')[0]
        // console.log(activeMembersNum)
        return activeMembersNum
    }

    async getSuspendedMembers() {
        const suspendedMembersNum = (await teamS.TEAM_DATA[5].getText()).split('\n')[0]
        // console.log(suspendedMembersNum)
        return suspendedMembersNum
    }

    async getConfiguredForVoice() {
        const configuredForVoiceNum = (await teamS.TEAM_DATA[6].getText()).split('\n')[0]
        // console.log(configuredForVoiceNum)
        return configuredForVoiceNum
    }

    async getNotConfiguredForVoice() {
        const notConfiguredForVoiceNum = (await teamS.TEAM_DATA[7].getText()).split('\n')[0]
        // console.log(notConfiguredForVoiceNum)
        return notConfiguredForVoiceNum
    }

    async getAdministratorMembers() {
        const administratorMembersNum = (await teamS.TEAM_DATA[8].getText()).split('\n')[0]
        // console.log(administratorMembersNum)
        return administratorMembersNum
    }

    async getUndeliverableInvitations() {
        const undeliverableInvitationsNum = (await teamS.TEAM_DATA[9].getText()).split('\n')[0]
        // console.log(undeliverableInvitationsNum)
        return undeliverableInvitationsNum
    }

    async getSubscriptionsIdAndTeamId() {
        await browser.waitUntil(
            async () => {
                const requests = await browser.getRequests();
                return Array.isArray(requests) && requests.some(request =>
                    request.url && request.url.includes('/api/v2/authUser') &&
                    request.response
                );
            },
            {
                timeout: 10000,
                timeoutMsg: 'API poziv se nije završio u roku od 10 sekundi'
            }
        );

        const requests = await browser.getRequests();
        const userApiRequest = requests.find(request =>
            request.url.includes('https://teams.qa.softphone.com/api/v2/authUser')
        );

        const response = userApiRequest.response;
        subscriptionsId = response.body.subscriptions[0]
        teamId = response.body.team.id
        console.log('SubscritionsId: ', subscriptionsId);
        console.log('TeamID: ' + teamId)
    }

    async getSeatsNum() {
        this.getSubscriptionsIdAndTeamId()
        await browser.waitUntil(
            async () => {
                const requests = await browser.getRequests();
                return requests.some(request =>
                    request.url === ('https://teams.qa.softphone.com/api/v2/subscription/' + subscriptionsId) &&
                    request.response
                );
            },
            {
                timeout: 10000,
                timeoutMsg: 'API has not fount for 10 sec'
            }
        );

        const requests = await browser.getRequests();
        const userApiRequest = requests.find(request =>
            request.url === ('https://teams.qa.softphone.com/api/v2/subscription/' + subscriptionsId)
        );

        const response = userApiRequest.response;
        allSeats = response.body.seats
        console.log('All seats:', allSeats);
    }

 async getTeamMembersApi() {
        // this.getSubscriptionsIdAndTeamId()
        await browser.waitUntil(
            async () => {
                const requests = await browser.getRequests();
                return requests.some(request =>
                    request.url === ('https://teams.qa.softphone.com/api/v2/team/' + teamId) &&
                    request.response
                );
            },
            {
                timeout: 10000,
                timeoutMsg: 'API has not fount for 10 sec'
            }
        );

        const requests = await browser.getRequests();
        const userApiRequest = requests.find(request =>
            request.url === ('https://teams.qa.softphone.com/api/v2/team/' + teamId)
        );

        const response = userApiRequest.response;
        teamMembersAPI = response.body.team_size
        console.log('Team members:', teamMembersAPI);
    }

}