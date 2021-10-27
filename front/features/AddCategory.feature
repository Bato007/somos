Feature: Agregar una categoria
  Un usuario de somos desea agregar una categoria a su cuenta

  Scenario Outline: La categoria se vuelve un titulo al ingresarse
    Given El usuario de somos esta agregando una categoria
    When Ingresa la categoria "<categorianueva>"
    Then La categoria fue "<final>"

  Examples:
    | categorianueva | final |
    | prOdigIos | agregada |

  Scenario Outline: Las categorias repetidas se eliminan
    Given El usuario de somos esta agregando una categoria
    When Ingresa la categoria "<categorianueva>"
    Then La categoria se agrega "<agrega>"

  Examples:
      | categorianueva | agrega |
      | prOdigIos  | once |