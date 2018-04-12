Feature: Add wishes

  As a person that forgets everything
  I want to be able to save my wishes to a list
  So I can look them up once I forget them

  Scenario Outline: Add a wish
    When I add a new wish with title "<title>" and description "<description>"
    Then the wish with title "<title>" and description "<description>" will be displayed

    Examples:
      | title    | description      |
      | New wish | Wish description |
