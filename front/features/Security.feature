Feature: Seguridad
  Como usuario, quiero que el app se maneje de forma segura

  Scenario: La informacion de la sesion es borrada
    Given El usuario esta cerrando sesion
    When Acepta cerrar la sesion y se "<hope>" los datos
    Then La seguridad es "<result>"

  Examples:
      | hope | result |
      | borran  | buena  |
      | mantienen  | mala  |

  Scenario: Se le avisa al servidor que se cerro sesion
    Given El usuario esta cerrando sesion
    When Acepta cerrar la sesion y se "<hope>" al servidor
    Then La seguridad es "<result>"

  Examples:
      | hope | result |
      | avisa  | buena  |
      | omite  | mala  |