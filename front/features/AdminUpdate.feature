Feature: Actualizar la información de un usuario
	Un administrador puede aceptar los cambios de información del usuario.

  Scenario Outline: Puede rechazar o aceptar el cambio
    Given Un usuario ha actualizado la cuenta
    When El administrador "<accion>" el cambio
    Then La cuenta "<final>" es actualizada

  Examples:
    | accion | final |
    | acepta | si |
    | rechaza | no |


  Scenario Outline: La categoría no se puede quedar vacía
    Given Un usuario ha actualizado la cuenta
    When Modifica para tener <categorias> categorias
    Then La cuenta "<final>" es actualizada

  Examples:
    | categorias | final |
    | 0 | no |
    | 5 | si |
