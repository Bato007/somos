Feature: Account creation
  As an administrator, I want to create accounts for my users

  Scenario Outline: User account creation
    Given Someone interested approaches SOMOS
    When The account is created by an Admin with <username> and <password>
    Then <inUser> <inPass> can access the resources in an ordered way
  
  Examples:
      | username | password  | inUser   | inPass    |
      | patrick  | abcdefgh  | patrick  | abcdefgh  |
      | johnny   | a1234567  | johnny   | a1234567  |
      | stevie   | abc12345  | stevie   | abc12345  |
      | bato007  | 1b3d4f6h  | bato007  | 1b3d4f6h  |
