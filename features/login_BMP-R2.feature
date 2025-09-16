# anotation for Zephyr Test Cycle
@BMP-R2
Feature: login to Teams

  Background:
    Given I land on login page Teams

  @BMP-T192
  Scenario: Login with empty email and password - disabled login button
    When Clear input fields
    Then Confirm login button is disabled

  Scenario: Login with populated email and empty password - disabled login button
    When Clear input fields
    And I enter branislav985@gmail.com email
    Then Confirm login button is disabled

  Scenario: Login with populated email and empty password - disabled login button
    When Clear input fields
    And I enter Samobane985% password
    Then Confirm login button is disabled

  Scenario: Login with invalid email - error message
    When I enter <invalid_email> email
    And I enter Samobane985% password
    And I click on Login button
    Then <error_message> is shown

    Examples:
      | invalid_email | error_message                                   |
      | someWord      | An unexpected error occurred. Please try again. |

  Scenario: Login with valid but wrong email - error message
    When I enter <wrong_email> email
    And I enter Samobane985% password
    And I click on Login button
    Then <error_message> is shown

    Examples:
      | wrong_email            | error_message                                |
      | branislav999@gmail.com | Invalid email or password. Please try again. |

  Scenario: Login with invalid password and corect email - error message
    When I enter email
    And I enter <invalid_password> password
    When I click on Login button
    Then <error_message> is shown

    Examples:
      | invalid_password | error_message                                |
      | invalidPass      | Invalid email or password. Please try again. |

  Scenario: Login with valid credentials
    When I enter email
    And I enter password
    And I click on Login button
    And I am on Dashboard with title TEAM MEMBERS and URL https://teams.qa.softphone.com/dashboard/
    Then I get the auth token
    And log out by API

  Scenario: Forgot password - invalid email
    When I click on forgot password link
    And Page with <page title> is opened
    When I enter invalid_email email
    And click on next button
    Then <error_message> is appeared

    Examples:
      | invalid_email | error_message                      | page title            |
      | someWord      | A valid email address is required. | Recover your Password |

  Scenario: Forgot password - email doesn't exist
    When I click on forgot password link
    And Page with <page title> is opened
    When I enter <unexistedEmail> email
    And click on next button
    Then <error_message> is appeared

    Examples:
      | unexistedEmail              | error_message                      | page title            |
      | branislav999@mailinator.com | Email does not exist on Bria Teams | Recover your Password |

  Scenario: Forgot password - change password
    When I click on forgot password link
    And Page with Recover your Password is opened
    When I enter <corectEmail> email
    And click on next button
    And open <mailinatorHomeURL> page in new tab
    When open last email in inbox
    And open link for email recovering
    And confirm page with title Choose a New Password
    And confirm change password button is disabled
    When enter new password <newPass>
    And confirm change password button is enabled
    When click on confirm change password
    Then Revert back old password <currentPass> instead of <newPass>
    And Change password message <messageText> is present

    Examples:
      | corectEmail                 | mailinatorHomeURL                                                | currentPass  | newPass    | messageText                     |
      | branislav985@mailinator.com | https://www.mailinator.com/v4/public/inboxes.jsp?to=branislav985 | Samobane985% | newPass123 | Your Password has been updated. |
