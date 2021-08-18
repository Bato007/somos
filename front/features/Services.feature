Feature: Proveer servicios
  Brindar servicios a personas con necesidades

  Scenario Outline: Usuario provee servicios
    Given El usuario no este en la lista negra "<email>" y <telefono>
    When El usuario le da submit
    Then Debe ser tratado por medio del "<estado>"

  Examples:
      | email | telefono | estado |
      | ama19020@uvg.edu.gt  | 54136877  | restringido  |
      |   | 25442544  | restringido  |
      | her20369@uvg.edu.gt  |  0  | restringido  |
      |    |  0  | irrestricto  |