Feature: Creacion de cuentas
  Como administrador quiero crear cuentas para mis usuarios

  Scenario Outline: Requerimiento contrasena
    Given Se esta creando una cuenta
    When Se ingresa la clave "<clave>"
    Then Se "<resultado>"  las condiciones
  
  Examples:
      | clave | resultado  |
      | 123a5678  | quiebran  |
      | abcdefgh   | quiebran  |
      | 17Agosto!   | cumplen  |
      | Nueve?09  | cumplen  |


