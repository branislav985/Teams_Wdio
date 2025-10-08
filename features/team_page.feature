@notNewUser @permanentAdmin
Feature: Team page - all functionalities
  As an administrator
  I want to view and manage team information
  So that I can monitor team members and their status

  Background:
    Given Provide team data from API
    When I click on Team label
    And I check Team page elements and url https://teams.qa.softphone.com/dashboard/team

  Scenario: Check team members data
    Then Confirm team members is equal to data from API
    Then Confirm available seets is equal to data from API
    Then Confirm invited members is equal to data from API
    Then Confirm inactive members is equal to data from API
    Then Confirm suspended members is equal to data from API
    Then Confirm configured for voice is equal to data from API
    Then Confirm not configured for voice is equal to data from API
    Then Confirm administrators members is equal to data from API
    Then Confirm undeliverable invitations is equal to data from API

  Scenario: Increase total number of seats and check available seats
    When I get available seats before increase_decrease
    When I click on add seats button
    Then increase total number of seats by random number between 1 and 10
    Then I click on Update subscription button
    Then Confirm available seats is increased for the given random number

  Scenario: Decrease total number of seats and check available seats
    When I get available seats before increase_decrease
    When I click on add seats button
    Then Decrease total number of seats by same number we increased
    Then I click on Update subscription button
    Then Confirm available seats is decreased for the given random number

  Scenario: Invite a new team member and check the logic
    When I provide data before inviting new member
    When I click on Invite team member button
    And I enter <email> email in email input field
    And I click on Add Member button
    Then Confirm seccess toast message <message> is displayed
    And Added user with <email> is in the Team Members list
    Then I store added member's data from API
    Then Confirm invited members increase by 1
    Then Confirm team members increase by 1s
    Then Confirm available seats decrease by 1
    Then Confirm not configured for voice increased by 1
    And Confirm inactive members did not change
    And Confirm active members did not change
    And Confirm suspended members did not change
    And Confirm configured for voice did not change
    And Confirm administrators members did not change
    And Confirm undeliverable invitations did not change
    Then I delete added member via API to keep the state

    Examples:
      | email                          | message                                    |
      | autoteammonthly@mailinator.com | has been successfully invited to your team |

  Scenario: Delete invited member through UI before acceptance
    When I provide data before inviting new member
    When I click on Invite team member button
    And I enter <email> email in email input field
    And I click on Add Member button
    Then Confirm seccess toast message <message> is displayed
    And Added user with <email> is in the Team Members list

     Examples:
      | email                          | message                                    |
      | autoteammonthly@mailinator.com | has been successfully invited to your team |

# Scenario: Invited member accepts invitation
# Scenario: Delete invited member after acceptance
# Scenario: Remove a team member and check the logic
# When I click on Remove team member button
# And Confirm removal of team member
# Then Confirm invited members decrease by 1
# Then Confirm team members decrease by 1
# Then Confirm available seats increase by 1
# And confirn inactive members decrease by 1
# Then Confirm not configured for voice decrease by 1
# Scenario: Inactive members
# Scenario: Active members
# Scenario: Suspended members
# Scenario: Configured for voice members
# Scenario: Not configured for voice members
# Scenario: Administrators members
# Scenario: Undeliverable invitations
