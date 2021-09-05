Feature: Proveer Servicios
  Un administrador de somos permite a los usuarios brindar servicios

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

  Scenario Outline: Luego de aceptar un recurso deben pasar a la pestaña de aceptados
    Given Un usuario ha subido un recurso
    When El administrador "<maneja>" el anuncio
    Then El anuncio "<resultado>" se muestra en pantalla

    Examples:
      | maneja | resultado |
      | acepta | si |
      | denega | no |

  Scenario Outline: El orden de los anuncios es ascendente conforme la fecha
    Given Hay multiples anuncios aceptados
    When Hay uno con "<fecha1>" y otro con "<fecha2>"
    Then <anuncio> se muestra como primer anuncio

    Examples:
    | fecha1 | fecha2 | anuncio |
    | 2021-05-05 | 2021-09-10 | 1 |
    | 2021-05-05 | 2021-03-04 | 2 |
