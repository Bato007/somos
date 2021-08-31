Feature: Categorizar usuario
	Un administrador de somos categoriza a los usuarios creados

  Scenario Outline: La categoría no puede contar con caracteres especiales
    Given Se esta categorizando al usuario
    When Se selecciona la categoria "<categoria>"
    Then La categoria es "<validez>"

  Examples:
    | categoria | validez |
    | admin | valida |
    | iglesia | valida |
    | !gles!a | invalida |

  Scenario Outline: Debe de tener una longitud mínima de 3 caracteres
    Given Se esta categorizando al usuario
    When Se crea la categoria "<categoria>"
    Then La categoria es "<validez>"

  Examples:
    | categoria | validez |
    | abc| valida |
    | iglesia | valida |
    | ad | invalida |

  Scenario Outline: El usuario no se puede quedar sin categorías
    Given Se esta categorizando al usuario
    When La longitud de categorias del usuario es <length>
    Then La solicitud es "<resultado>"

  Examples:
    | length | resultado |
    | 0 | denegada |
    | 1 | aceptada |
    | 5 | aceptada |
