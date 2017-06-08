Feature: TRANSLATION

Narrative:
    In order to compare testing frameworks for HTML5 apps
    As a user
    I want to be able to execute end to end tests for the PilotoBS

Background:
    Given I am on any page

Scenario Outline: Change current locale at Login
    Meta:@scTranslationLocale

    When I select the option <locale>
    Then the title should be translated to <greeting>

    Examples:

    | locale   |  greeting                      |
    | Spanish  |  Bienvenido a Internet Banking |
    | English  |  Welcome to Internet Banking   |
