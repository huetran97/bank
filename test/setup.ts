import * as mongoose from 'mongoose';

before(() => {

});

after(async () => {
    await mongoose.connection.dropDatabase();
});