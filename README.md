# Envio e edição de Posts e Comentários

**Sobre a aplicação**

O projeto consiste em um pequeno sistema de postagens desenvolvido com ReactJS, utilizando create-react-app. O projeto basicamente consiste em um CRUD de posts e comentários, onde um usuário, que precisa se registrar na aplicação pode: criar, listar, editar e remover posts e comentários vinculados aos mesmos. A autenticação é feita utilizando contextAPI e as informações são armazenadas na FakerApi que simula o backend mantendo os dados no localstoge.

Validação de formulário utilizando react-hook-form + yup para garantir envio de informações.

Estilização utilizando tailwindcss para garantir responsividade em dispositivos desktop e mobile.

**Imagem utilizada na aplicação do autor Storyset publicada no site de bando de imgens freepik e disponibilizada de maneira free com atribuição. Link:**

[Ilustração do conceito de mensagens | Vetor Grátis](https://br.freepik.com/vetores-gratis/ilustracao-do-conceito-de-mensagens_5911276.htm#query=comentarios&position=0&from_view=search)

**Ferramentas utilizadas:**

- A aplicação foi desenvolvida utilizando reactjs e typescript.
- Estilizada com TailwindCss.
- Utilizando também as bibliotecas:
  - react-icons (kit e icones que podem ser utilizados como componentes react, facilitando o layout),
  - headlessui + heroicons (integração com componentes tailwind e garantindo acessibilidade),
  - react-hook-form + yup (para auxiliar na validação de formulários).
  - react-router-dom (para criação de rotas de SPA)
- Foi utilizado a FakerApi que fazer o CRUD dos posts e comentários usando LocalStorage do navegador

## Link do projeto

Deploy vercel e pode ser acessado:

[Crie e edite posts](https://cadastro-comentarios.vercel.app/)

## Como executar

Abra o terminal e copie o repositório

```bash
git clone https://github.com/hellzz13/cadastro-comentarios.git
```

Após copiar e acessar o diretório da aplicação, será necessário rodar o comando abaixo para instalar as dependências do projeto

```bash
npm install
```

Agora para que possa rodar o projeto será necessário rodar o comando

```bash
npm start
```

E será criado um [localhost](http://localhost) na porta 3000, que podemos acessar no link : [http://localhost:3000/](http://localhost:3000/)
