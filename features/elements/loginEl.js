export default class LoginPageSelectors{
    //Dashboard
    TITLE = $('h1')
    // DASHBOARD_TITLE = $('div[class="content"]>div>div>div>div>div:first-child>div:first-child>div>h2')
    DASHBOARD_TITLE = $('h2')
    //Login
    LOGIN_TITLE = $('h2')
    EMAIL_INPUT = $('#email')
    PASSWORD_INPUT = $('#password')
    REMEMBER_CHECKBOX = $('remember')
    LOGIN_BUTTON = $('button[data-testid="loginButton"]')
    ERROR_LOGIN_MESSAGE = $('div[data-testid="loginErrorText"]')
    // forgot password
    FORGOT_PASSWORD = $('div[data-testid="forgotPasswordLink"] > a')
    FORGOT_PASSWORD_INPUT = $('#email')
    FORGOT_PASSWORD_ERROR_MESSAGE = $('.form-error-text')
    NEXT_BUTTON = $('button[data-testid="forgotPasswordSendEmailButton"]')

    //Mailinator
    LAST_EMAIL = $('tr[ng-repeat]:first-of-type')
    INBOX_IFRAME = $('#html_msg_body')
    RECOVERING_LINK = $('a')

    //Chose a new password
    CHOSE_TITLE = $('.title.text-center')
    CHOSE_INPUT_EMAIL = $('input')
    CHOSE_CHANGE_PASS_BUTTON = $('button[data-testid="resetPasswordSubmitButton"]')

    //Profile page
    PROFILE_ICON = $('.navbar-link-profile.ellipsis.has-locale-selector')
    PROFILE_CHANGE_PASSWORD = $('button[title="Change Your Password"]')
    INPUT_CURRENT_PASSWORD = $('div[data-password-input="currentPassword"]>input')
    INPUT_NEW_PASSWORD = $('div[data-password-input="newPassword"]>input')
    CONFIRM_CHANGE_PASSWORD = $('button[title="Update Password"]')
    CHANGE_PASS_CONFIRM_MESSAGE = $('div[data-testid="passwordChangeStatusSuccess"]')

    
    // ERROR_EMAIL_LOGIN_MESSAGE = $('#parsley-id-5')
    // ERROR_PASSWORD_LOGIN_mESSAGE = $('#parsley-id-7')
    // TEMPORARLY_LOCKED_OUT_LOGIN_MESSAGE_1 = $('ul[id="parsley-id-3"] > li:first-child')
    // TEMPORARLY_LOCKED_OUT_LOGIN_MESSAGE_2 = $('ul[id="parsley-id-3"] > li:first-child + li')
} 