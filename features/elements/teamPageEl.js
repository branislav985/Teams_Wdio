export default class TeamPageSelectors {
  TEAM_LABEL = $("#nav-team");
  TEAM_MEMBERS_TITLE = $("div[class=col-12]:first-child>div>div>h2");
  ADMINISTRATOR_ACCESS_TITLE = $("div[class=col-12]:last-child>div>div>h2");
  TEAM_DATA = $$("div[data-v-51518359]");

  // Manage subscription
    //Seats and subscription elements
  ADD_SEATS_BUTTON = $("button[data-testid='addRemoveSeats']");
  APPLAY_CHANGES_BUTTON = $("button[title='Apply Changes']")
  CACNEL_SUBSCRIPTION_BUTTON = $("button[data-testid='manageSubscriptionCloseButton']");
  SEAT_TOTAL_INPUT = $("input[name='updated_seat_count']");
  SEATS_NUMBER_CHANGE = $("span[data-subscription-text='seat_difference']:nth-child(1)");
  SEATS_ADDED_REMOVED = $("span[data-subscription-text='seat_difference']:nth-child(2)");
  PRICE_PER_SEAT = $("div[data-testid='changesToSubscription']>div:nth-child(2)>span>span");
  TOTAL_PRICE = $("div[data-testid='changesToSubscription']>div:nth-child(3)>span:nth-child(1)>span:nth-child(1)");
  TOTAL_PRICE_OLD = $("div[data-testid='changesToSubscription']>div:nth-child(3)>span:nth-child(2)>span:nth-child(1)")
    //Team members elements
  INVITE_TEAM_MEMBER_BUTTON = $("button[title='Invite Members']")
  EMAIL_INPUT = $("input[name='email-0']");
  ADD_MEMBER_BUTTON= $('button[data-testid="saveButtonContactAdd"]')
  ALL_MEMBERS_EMAILS = $$("input[data-profile-input='member.email']");
  TOAST_MESSAGE = $("div[class='noty_body']")
  DELETE_MEMBER_BUTTONS = $$("//input/./../../../../following-sibling::div[2]//button[@title='Remove Member from Team']");
  

}
