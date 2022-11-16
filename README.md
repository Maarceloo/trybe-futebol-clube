# Trybe Futebol Clube ⚽

O TFC é um site informativo sobre partidas e classificações de futebol!

Nesse projeto, desenvolvi um back-end dockerizado utilizando modelagem de dados através do Sequelize. Respeitando as regras de negócio providas no projeto, a API é consumida por um front-end já provido nesse projeto.

Para adicionar uma partida é necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. Temos um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

## 📋 Pré-requisitos

- A aplicação necessita do `Docker` instalado localmente, execute o comando no terminal para verificar a instalação.

```
docker -v
```

- A aplicação necessita que as portas estejam disponiveis:
`Fron-End - 3000`
`Back-End - 3001`
`MySql - 3306`
- Verifique a disponibilidade de portas no terminal executando o seguinte comando:

```
docker ps -a
```

---

### 🔧 Instalação

Rodando a aplicacão.

Clone o repositorio:

```
git clone git@github.com:Maarceloo/trybe-futebol-clube.git
```

Acesse `trybe-futebol-clube`

```
cd trybe-futebol-clube
```

Instale as dependencias:

```
npm install
```

Acesse o `app/`

```
cd app
```

Suba os containers:

```
docker-compose up -d
```

Clique aqui para visualizar a aplicação:

- [Trybe-Futebol-Clube](http://localhost:3000/leaderboard)

---

## ⚙️ Executando

- Pagina de login:
Email `admin@admin.com`
Senha `secret_admin`

---

## 🛠️ Tecnologias

- [Typescript](https://www.typescriptlang.org/)
- [Node.Js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [MySql](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)
- [Dcker](https://www.docker.com/)
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [JWT(Autenticação)](https://jwt.io/)
- [Sequelize(ORM)](https://sequelize.org/)

---
⌨️ Desenvolvido por [Marcelo De Lima](https://github.com/Maarceloo) 🛠️
