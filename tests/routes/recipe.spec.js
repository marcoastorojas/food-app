/* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipes = [
  { name: 'Chupe de Camarones', overview: "overview" },
  { name: 'Soltero de Queso', overview: "overview" },
  { name: 'Rocoto Relleno', overview: "overview" }
];
describe('GET /recipe', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(async () => {
    await Recipe.sync({ force: true })
    await Recipe.create(recipes[0])
    await Recipe.create(recipes[1])
    await Recipe.create(recipes[2])

  })

  it('should get 200', async () => {
    await agent
      .get("/recipe")
      .expect(200)
  })
  it('should have property call data which is an array', async () => {
    const response = await agent.get("/recipe")
    expect(response.body)
      .is.an("object")
      .has.a.property("data")
      .which.is.an("array")
  })
  it('should have three object in the array data', async () => {
    const response = await agent.get("/recipe")
    expect(response.body.data)
      .to.have.lengthOf(3)
  })
  it('should show 1 results for the name Soltero', async () => {
    const response = await agent.get("/recipe/?name=Soltero")
    expect(response.body.data)
      .to.have.lengthOf(1)
    expect(response.body.data[0])
      .has.a.property("name")
      .which.is.an("string")
      .to.equal(recipes[1].name)
  })
  it('should show 2 results for the name de', async () => {
    const response = await agent.get("/recipe/?name=de")
    expect(response.body.data)
      .to.have.lengthOf(2)
  })
})

describe('POST /recipe', () => {
  beforeEach(async () => {
    await Recipe.sync({ force: true })
  })
  it('should add recipe if the data is correct', async () => {
    const response = await agent.post('/recipe').send({
      name: "Rocoto",
      healthScore: 20,
      overview: "plato tipico de arequipa",
      steps: "rocoto, cocinar"
    })
    const resp = await agent.get('/recipe')

    expect(response.statusCode).to.equal(201)
    expect(resp.body.data).to.have.lengthOf(1)

  })
  it('should get 400 if no name', async () => {
    const response = await agent.post('/recipe').send({
      healthScore: 20,
      overview: "plato tipico de arequipa",
      steps: "1.,2,"
    })
    expect(response.statusCode).to.equal(400)
  })
  it('should get 400 if healtScore is not a number', async () => {
    const response = await agent.post('/recipe').send({
      name: "Rocoto",
      healthScore: "20",
      overview: "plato tipico de arequipa",
      steps: "1.,2,"
    })
    expect(response.statusCode).to.equal(400)
  })
  it('should get 400 if name exceed 35 characters', async () => {
    const response = await agent.post('/recipe').send({
      name: "Rocoto Relleno plato tipico de Arequipa",
      healthScore: 20,
      overview: "plato tipico de arequipa",
      steps: "rocoto, cocinar"
    })
    expect(response.statusCode).to.equal(400)

  })
  it('should get 400 if healthScore exceed to 100', async () => {
    const response = await agent.post('/recipe').send({
      name: "Rocoto Relleno de queso",
      healthScore: 120,
      overview: "plato tipico de arequipa",
      steps: "rocoto, cocinar"
    })
    expect(response.statusCode).to.equal(400)

  })
})

describe('GET /recipe/:id', () => {
  const recipes = [
    {
      name: "Papa Rellena",
      healthScore: 10,
      overview: "plato tipico de arequipa",
      steps: "alistar, cocinar"
    },
    {
      name: "soltero de queso",
      healthScore: 20,
      overview: "plato tipico de arequipa",
      steps: "alistar, cocinar"
    },
    {
      name: "Chupe de camaron",
      healthScore: 30,
      overview: "plato tipico de arequipa",
      steps: "alistar, cocinar"
    }
  ]
  before(async () => {
    await Recipe.sync({ force: true })
    await Promise.all(recipes.map(recipe=>agent.post('/recipe').send(recipe)))
  })

  it('should get a Récipe if it exists', async () => {
    const allRecipes = await agent.get(`/recipe`)
    const recipe = allRecipes.body.data[1]
    const response = await agent.get(`/recipe/${recipe.id}`)
    expect(response.statusCode).to.equal(200)
    expect(response.body)
      .to.be.a('object')
      .has.a.property("name")
      .to.be.equal(recipe.name)
  })
  it('should get 404 if id does no exist', async () => {
    const id = 20
    const response = await agent.get(`/recipe/${id}`)
    expect(response.statusCode).to.equal(404)
  })
  it('should get 400 if id is not a number', async () => {
    const id = "hey"
    const response = await agent.get(`/recipe/${id}`)
    expect(response.statusCode).to.equal(400)
  })
})
