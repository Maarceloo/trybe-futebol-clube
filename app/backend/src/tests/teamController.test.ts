import * as sinon from "sinon";
import * as chai from "chai";

// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import teamsMock from '../tests/mocks/teams.mock'

import { Response } from "superagent";
import { iRegexp } from "sequelize/types/lib/operators";
import teams from "../database/models/teams";

chai.use(chaiHttp);

const { expect } = chai;

describe("testes que cubrem o arquivo de /teams", () => {
  beforeEach(async () => {
    sinon.stub(teams, "findAll").resolves(teamsMock as teams[]);
    sinon.stub(teams, "findByPk").resolves(teamsMock[0] as teams);
  });

  afterEach(() => {
    (teams.findAll as sinon.SinonStub).restore();
    (teams.findByPk as sinon.SinonStub).restore();
  });

  it("testando team getAll", async () => {
    const result = await chai.request(app).get("/teams");

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(teamsMock);
  });

  it("testando team getID", async () => {
    const result = await chai.request(app).get("/teams/1");

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(teamsMock[0]);
  });

});
