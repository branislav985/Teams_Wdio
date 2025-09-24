@notNewUser
@permanentAdmin
Feature: Team page - all functionalities

Background:
Given Provide team data from API

Scenario: Check team members data
When I click on Team label
And I check Team page elements and url https://teams.qa.softphone.com/dashboard/team
Then Confirm team members is equal to data from API
Then Confirm available seets is equal to data from API
Then Confirm invited members is equal to data from API
Then Confirm inactive members is equal to data from API
Then Confirm suspended members is equal to data from API
Then Confirm configured for voice is equal to data from API
Then Confirm not configured for voice is equal to data from API
Then Confirm administrators members is equal to data from API
Then Confirm undeliverable invitations is equal to data from API