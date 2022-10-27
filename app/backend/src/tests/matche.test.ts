import * as sinon from "sinon";
import * as chai from "chai";

// import bcrypt = require('bcryptjs')
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import matches from "../database/models/matches";
import { InProgressFalse, InProgressTrue } from './mocks/matches.mocks'

import { Response } from "superagent";
import { iRegexp } from "sequelize/types/lib/operators";
import { IMatcheBoard } from "../interfaces/Matche";

chai.use(chaiHttp);

const { expect } = chai;

describe("testes que cubrem o arquivo de /Matches", () => {
  it("matches getAll", async () => {
    sinon.stub(matches, "findAll").resolves([]);
    const result = await chai
      .request(app)
      .get("/matches");

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal([]);
    (matches.findAll as sinon.SinonStub).restore();
  });

  it("matches changeMatcheInprogrees", async () => {
    sinon.stub(matches, "update").resolves();
    const result = await chai
      .request(app)
      .patch("/matches/1/finish")
      .set("params", "id");

    expect(result.status).to.equal(200);
    expect(result.body).to.be.deep.equal({ message: "Finished"});
    (matches.update as sinon.SinonStub).restore();
  });

  it("matches update:id", async () => {
    sinon.stub(matches, "update").resolves();
    const homeTeamGoals = 3;
    const awayTeamGoals = 1;
    const result = await chai
      .request(app)
      .patch("/matches/1")
      .set("params", "id")
      .send({ homeTeamGoals, awayTeamGoals });

    expect(result.status).to.be.equal(200);
    expect(result.body).to.deep.equal({
      message: "match changed successfully",
    });
    (matches.update as sinon.SinonStub).restore();
  });
});
