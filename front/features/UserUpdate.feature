Feature: Actualizar la información de un usuario
	Un usuario puede actualizar su información de cuenta

  Scenario Outline: La categoría no se puede quedar vacía
    Given Un usuario quiere actualizar su cuenta
    When Modifica para tener <categorias> categorias
    Then La cuenta "<final>" es actualizada

  Examples:
    | categorias | final |
    | 0 | no |
    | 5 | si |


  Scenario Outline: La contraseña y confirmación deben ser iguales
    Given Un usuario quiere actualizar su cuenta
    When Ingresa "<clave>" y "<confirmacion>"
    Then La cuenta "<final>" es actualizada

  Examples:
    | clave | confirmacion | final |
    | 12345abc | abc12345 | no |
    | 12345abc | 12345abc | si |


  Scenario Outline: El correo electrónico debe de cumplir los estándares RFC
    Given Un usuario quiere actualizar su cuenta
    When Ingresa su "<correo>"
    Then La cuenta "<final>" es actualizada

  Examples:
    | correo | final |
    | ama19020@uvg.edu.gt | si |
    | correonovalido@.com | no |


  Scenario Outline: La residencia no puede ser vacía
    Given Un usuario quiere actualizar su cuenta
    When Ingresa residencia "<residencia>"
    Then La cuenta "<final>" es actualizada

  Examples:
    | residencia | final |
    | Guatemala | si |
    | 0 | no |
