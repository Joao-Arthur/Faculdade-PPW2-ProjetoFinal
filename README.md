# Projeto Final PPW2

## Sobre o projeto

Trabalho final da disciplina de programação para web 2 do curso de ciências da computação em 2021, desenvolvido em _Node JS_, _TS_ e _MongoDB_, utilizando a plataforma _Heroku_ para hospedagem em nuvem.
Link do projeto no Heroku: https://projeto-final-ppw2.herokuapp.com

## Documentação da API

### /healthcheck

retorno: status code 200.

### /band

#### get

retorno: Lista das bandas cadastradas.

##### queryparams

-   name: Nome da banda;
-   foundation: Ano de fundação da banda;
-   dissolution: Ano de dissolução da banda;

#### post

Salva uma nova banda
retorno: Objeto da banda criada.

#### delete

Deleta uma banda
retorno: Objeto da banda deletada

### /album

#### get

Lista dos álbuns cadastrados.

##### queryparams

-   title: Nome do álbum;
-   band: Nome da banda;
-   release: Ano de lançamento;

#### post

Salva um nova album

#### delete

Deleta um album

### Demais rotas

Retorna a listagem das rotas disponíveis, e de informações da API e do autor.
