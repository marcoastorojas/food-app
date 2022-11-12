const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    describe('Validators', () => {
        beforeEach(() => Recipe.sync({ force: true }));
        describe('name', () => {
            it('should throw an error if name is null', async () => {
                try {
                    await Recipe.create({ overview: "overview" })

                } catch (error) {

                }
                const recipes = await Recipe.findAll({})
                expect(recipes).to.have.lengthOf(0)


            });
            it('should work when its a valid name', async () => {
                try {
                    await Recipe.create({ name: 'Milanesa a la napolitana', overview: "overview" });
                } catch (error) {

                }
                const recipes = await Recipe.findAll({})
                expect(recipes).to.have.lengthOf(1)

            });
        });
        describe('overview', () => {
            it('should throw an error if overview is null', async () => {
                try {
                    await Recipe.create({ name: "Milanesa a la napolitana" })

                } catch (error) {

                }
                const recipes = await Recipe.findAll({})
                expect(recipes).to.have.lengthOf(0)


            });
            it('should work when its a valid overview', async () => {
                try {
                    await Recipe.create({ name: 'Milanesa a la napolitana', overview: "overview" });
                } catch (error) {

                }
                const recipes = await Recipe.findAll({})
                expect(recipes).to.have.lengthOf(1)

            });
        });
    });
});

