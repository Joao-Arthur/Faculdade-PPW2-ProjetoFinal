# Projeto Final PPW2

TODO

-   fazer os cruds em 2 apis diferentes
-   criar validação de token (JWT)
-   limitar os acessos do mongo
-   hospedar na heroku
-   documentar

## Sobre o projeto

Trabalho final da disciplina de programação para web 2 do curso de ciências da computação em 2021, desenvolvido em _Node JS_ e _TS_, utilizando a plataforma _Heroku_ para hospedagem em nuvem.
Link do projeto no Heroku: https://projeto-ppw.herokuapp.com

## Documentação da API

### /healthcheck

retorna status code 200.

### /band

#### get

Lista das bandas cadastradas.

##### queryparams

-   name: Nome da banda;
-   activeAt: Ano em que a banda esteja em atividade (entre a fundação e dissolução);
-   foundation: Ano de fundação da banda;
-   dissolution: Ano de dissolução da banda;
-   album: Nome de um dos albuns da banda;
-   song: Ano em que a banda esteja em atividade (entre a fundação e dissolução);

#### post

Salva uma nova banda

#### delete

Deleta uma banda

### /album

#### get

Lista dos álbuns cadastrados.

##### queryparams

-   title: Nome do álbum;
-   band: Nome da banda;
-   song: Nome de alguma música incluída no álbum;
-   release: Ano de lançamento;

#### post

Salva um nova album

#### delete

Deleta um album

### Demais rotas

Retorna a listagem das rotas disponíveis, e de informações da API e do autor.
