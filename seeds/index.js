const seedUser = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComment = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize,sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUser();
    console.log('\n----- USER SEEDED -----\n');
    
    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');
    
    await seedComment();
    console.log('\n----- COMMENT SEEDED -----\n');

    process.exit(0);

};

seedAll();