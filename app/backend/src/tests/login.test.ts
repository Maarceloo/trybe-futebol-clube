import * as sinon from "sinon";
import * as chai from "chai";
import * as bcrypt from "bcryptjs";

// import bcrypt = require('bcryptjs')
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import users from "../database/models/users";
import userMock from "./mocks/user.mock";

import { Response } from "superagent";
import { iRegexp } from "sequelize/types/lib/operators";

chai.use(chaiHttp);

const { expect } = chai;


describe("testes que cubrem o arquivo de /Login", () => {
  beforeEach(async () => {
    sinon.stub(users, "findOne").resolves({ ...userMock } as users);
    sinon.stub(bcrypt, "compare").resolves(true);
  });

  afterEach(() => {
    (users.findOne as sinon.SinonStub).restore();
    (bcrypt.compare as sinon.SinonStub).restore();
  });

  it("testando login Valido", async () => {
    const email = userMock.email;
    const password = userMock.password;
    const result = await chai
      .request(app)
      .post("/login")
      .send({ email, password });

    expect(result.status).to.be.equal(200);
    expect(result.body).have.property("token");
  });

  it("testando login  invalido", async () => {
    const email = "";
    const password = "";
    const result = await chai
      .request(app)
      .post("/login")
      .send({ email, password });
    
    expect(result.status).to.be.equal(400);
    expect(result.text).to.be.deep.equal('{"message":"All fields must be filled"}');
  });
});
