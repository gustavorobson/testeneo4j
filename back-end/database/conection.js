const neo4j = require('neo4j-driver');
const driver = new neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "123"));

const session = driver.session({
    database: 'neo4j'
});

module.exports = session;



