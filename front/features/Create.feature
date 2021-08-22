Feature: Creacion de cuentas
  Como administrador quiero crear cuentas para mis usuarios

  Scenario: Requerimiento contrasena
    Given Se esta creando la cuenta
    When Se ingresa la clave "<clave>"
    Then Se "<resultado>"  las condiciones
  
  Examples:
      | clave | resultado  |
      | 123a5678  | quiebran  |
      | abcdefgh   | quiebran  |
      | 17Agosto!   | cumplen  |
      | Nueve?09  | cumplen  |

  Scenario: Campos obligatorios
    Given Se esta creando la cuenta
    When Se llenan <cantidad> campos
    And <obligatorios> se llenan
    Then Se "<resultado>" la cuenta

  Examples:
    | cantidad | obligatorios | resultado |
    | 2 | 2 | declina |
    | 5 | 5 | declina |
    | 10 | 7 | acepta |
    | 8 | 7 | acepta |
    | 9 | 6 | declina |

  Scenario: Requisitos correo electrónico
    Given Se esta creando la cuenta
    When Se ingresa el correo "<correo>"
    Then El correo es "<resultado>"

    Examples:
    | correo | resultado |
    | ama19020@uvg.edu.gt | acepta |
    | martinamadog@gmail.com | acepta |
    | juanpaco@hotmail | denega |
    | yosoypedro@.com | denega |



