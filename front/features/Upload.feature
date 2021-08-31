Feature: Subir un recurso
	Un administrador de somos permite subir un recurso

  Scenario Outline: La fecha ingresada debe ser mayor o igual a 7 días
    Given El documento se subió 28 de 8 del 2021
    When Se ingresa la fecha <dia> <mes> <año>
    Then Se "<resultado>" la solicitud

  Examples:
    | dia | mes | año | resultado |
    | 30 | 8 | 2021 | denega |
    | 5 | 9 | 2021 | acepta |

  Scenario Outline: El recurso debe de estar dirigido al menos a un usuario o categoría
    Given Se esta subiendo un recurso
    When La longitud de a quién se dirige es <length>
    Then Se "<resultado>" la solicitud

  Examples:
    | length | resultado |
    | 0 | denega |
    | 3  | acepta |

  Scenario Outline: El recurso debe tener título y descripción
    Given Se esta subiendo un recurso
    When El "<titulo>" y la "<descripcion>" no estan vacias
    Then Se "<resultado>" la solicitud

  Examples:
    | titulo | descripcion | resultado |
    |  |  | denega |
    | Archivo 1 |  | denega |
    |  | Presentacion importante | denega |
    | Archivo 2 | PDF importante | acepta |

  Scenario Outline: El recurso debe tener al menos una etiqueta.
    Given Se esta subiendo un recurso
    When La longitud de etiquetas es <length>
    Then Se "<resultado>" la solicitud

  Examples:
    | length | resultado |
    | 0 | denega |
    | 1  | acepta |
