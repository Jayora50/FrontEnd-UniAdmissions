const { faker } = require("@faker-js/faker");

const random = () => Math.ceil(Math.random() * 3);

module.exports = () => {
    const deals = [];

    const names = ['audi', 'alfa romeo', 'aston martin', 
                'bently', 'cadillac', 'chevrolet', 'ferrari'] 

    names.forEach(name => {
        for (let index = 0; index < 5; index++) {
            deals.push({
                id: faker.datatype.uuid(),
                name,
                amount: Number(faker.finance.amount()),
                stage: random(),
                created_at: faker.date.past().toLocaleDateString()
            });           
        }
    })

    return { 'Deals' : deals };
}