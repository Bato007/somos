Feature: Proveer servicios
  Brindar servicios a personas con necesidades

  Scenario Outline: El correo electrónico debe de cumplir los estándares de RFC
    Given Se crea la cuenta de un brindador de servicios
    When Se asigna el correo "<correo>"
    Then El correo fue "<resultado>"

  Examples:
    | correo | resultado |
    | ama19020@uvg.edu.gt | aceptado |
    | juanpaco@hotmai | denegado |

  Scenario Outline: Se deben ingresar todos los datos
    Given Hay cinco campos en el formulario
    When Se completan <cantidad> campos
    Then La solicitud fue "<resultado>" 

  Examples:
    | cantidad | resultado |
    | 5 | enviada |
    | 1 | rechazada |
    | 3 | rechazada |

  Scenario Outline: El mismo correo puede enviar una solicitud cada 24 horas
    Given La ultima solicitud fue <dia> <hora> <minuto>
    When Se envia la solicitud a las <hora2> <minuto2> del <dia2>
    Then La solicitud fue "<resultado>"

  Examples:
    | dia | hora | minuto | hora2 | minuto2 | dia2 | resultado |
    | 20 | 19 | 25 | 20 | 25 | 20 | rechazada |
    | 20 | 19 | 25 | 20 | 25 | 25 | enviada |

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