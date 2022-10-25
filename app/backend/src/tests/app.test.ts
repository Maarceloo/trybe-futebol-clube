import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rotas basicas', () => {

  it('requisicao feita com sucesso',async () => {
    const httpResponse = await chai.request(app).get('/')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal({ ok: true })
  });

//   it('testa se esta online',async () => {
//     const PORT = 3001
//     const httpResponse = await chai
//     expect(httpResponse).to.be.equal(`Running on port ${PORT}`);
//   });
});
