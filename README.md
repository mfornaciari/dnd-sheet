# Ficha de personagem - D&D 5ª Edição / Character sheet - 5th Edition D&D

[PT-BR](#índice) | [ENG](#description)

## Índice

- [Descrição](#descrição)
- [Tecnologias](#tecnologias)
- [Linguagens](#linguagens)
- [Frameworks utilizados](#frameworks-utilizados)
- [Empacotador](#empacotador)
- [Gerenciador de contêineres](#gerenciador-de-contêineres)
- [Bibliotecas/Gems](#bibliotecasgems)
- [Executando o projeto](#executando-o-projeto)
- [Executando os testes](#executando-os-testes)

## Descrição

Esta aplicação fornece uma ficha de personagem automatizada para D&D 5ª Edição.

## Tecnologias

### Linguagens

- [Ruby](https://www.ruby-lang.org/pt/)
- [Typescript](https://www.typescriptlang.org/)

### Frameworks utilizados

- [Rails](https://rubyonrails.org/)
- [React.js](https://reactjs.org/)

### Empacotador

- [Vite](https://vitejs.dev/)

### Gerenciador de contêineres

- [Docker](https://www.docker.com/)

### Bibliotecas/Gems

#### Gems do Ruby

- [factory_bot_rails](https://github.com/thoughtbot/factory_bot_rails)
- [graphql](https://graphql-ruby.org/)
- [graphiql-rails](https://github.com/rmosolgo/graphiql-rails)
- [rspec-rails](https://github.com/rspec/rspec-rails)
- [rubocop-performance](https://docs.rubocop.org/rubocop-performance/index.html)
- [rubocop-rails](https://docs.rubocop.org/rubocop-rails/)
- [rubocop-rspec](https://docs.rubocop.org/rubocop-rspec/index.html)
- [shoulda-matchers](https://matchers.shoulda.io/docs/v5.1.0/)

#### Bibliotecas JS

- [@apollo/client](https://www.apollographql.com/docs/)
- [graphql](https://github.com/graphql/graphql-js)
- [i18next](https://www.i18next.com/)
- [react-hook-form](https://react-hook-form.com/)

## Executando o projeto

- Certifique-se de ter o Docker instalado.
- Clone o repositório:

```bash
git clone git@github.com:mfornaciari/dnd-sheet.git
```

- Suba os contêineres:

```bash
docker compose up
```

- Aguarde a inicialização dos servidores.
- Acesse `localhost:3000`.
- Para usar o console GraphiQL, acesse `localhost:3001/graphiql`.

## Executando os testes

- Após clonar o projeto e subir os contêineres, entre no contêiner que deseja testar.

- _Back-end_:

```bash
docker compose exec -it back-end bash
```

- _Front-end_:

```bash
docker compose exec -it front-end bash
```

- No _back-end_, execute `rspec`; no _front-end_, `yarn test`.

---

## Index

- [Description](#description)
- [Technologies](#technologies)
- [Languages](#languages)
- [Frameworks used](#frameworks-used)
- [Bundling](#bundling)
- [Container management](#container-management)
- [Libraries/Gems](#librariesgems)
- [Running the project](#running-the-project)
- [Running tests](#running-tests)

## Description

This app provides an automated character sheet for 5th Edition D&D.

## Technologies

### Languages

- [Ruby](https://www.ruby-lang.org/pt/)
- [Typescript](https://www.typescriptlang.org/)

### Frameworks used

- [Rails](https://rubyonrails.org/)
- [React.js](https://reactjs.org/)

### Bundling

- [Vite](https://vitejs.dev/)

### Container management

- [Docker](https://www.docker.com/)

### Libraries/Gems

#### Ruby gems

- [factory_bot_rails](https://github.com/thoughtbot/factory_bot_rails)
- [graphql](https://graphql-ruby.org/)
- [graphiql-rails](https://github.com/rmosolgo/graphiql-rails)
- [rspec-rails](https://github.com/rspec/rspec-rails)
- [rubocop-performance](https://docs.rubocop.org/rubocop-performance/index.html)
- [rubocop-rails](https://docs.rubocop.org/rubocop-rails/)
- [rubocop-rspec](https://docs.rubocop.org/rubocop-rspec/index.html)
- [shoulda-matchers](https://matchers.shoulda.io/docs/v5.1.0/)

#### JS libraries

- [@apollo/client](https://www.apollographql.com/docs/)
- [graphql](https://github.com/graphql/graphql-js)
- [i18next](https://www.i18next.com/)
- [react-hook-form](https://react-hook-form.com/)

## Running the project

- Make sure you have Docker installed.
- Clone the repo:

```bash
git clone git@github.com:mfornaciari/dnd-sheet.git
```

- Run the containers:

```bash
docker compose up
```

- Wait for the servers to initialize.
- Access `localhost:3000`.
- To use the GraphiQL console, access `localhost:3001/graphiql`.

## Running tests

After cloning the project and running the containers, access the container you want to test.

_Back-end_:

```bash
docker compose exec -it back-end bash
```

_Front-end_:

```bash
docker compose exec -it front-end bash
```

On _back-end_, run `rspec`; on _front-end_, `yarn test`.
