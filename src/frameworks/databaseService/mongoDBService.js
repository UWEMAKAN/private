// import mongodb from 'mongodb';

const service = (mongoClient) => {
  const operations = {
    insertOne: 'insertOne',
    insertMany: 'insertMany',
    findOne: 'findOne',
    findById: 'findById',
    find: 'find',
    updateOne: 'updateOne',
    deleteOne: 'deleteOne',
    deleteMany: 'deleteMany'
  };

  async function execute(collection, operation, docs = null, update = null) {
    try {
      const client = await mongoClient.connect(
        process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true }
      );
      const db = client.db(process.env.MONGODB_NAME);
      let returnValue = null;
      const document = await db.collection(collection);
      switch (operation) {
        case 'insertOne': {
          returnValue = await document.insertOne(docs);
          break;
        }
        case 'insertMany': {
          returnValue = await document.insertMany(docs);
          break;
        }
        case 'findOne': {
          returnValue = await document.findOne(docs);
          break;
        }
        case 'findById': {
          returnValue = await document.findById(docs);
          break;
        }
        case 'find': {
          returnValue = await document.find(docs).toArray();
          break;
        }
        case 'updateOne': {
          returnValue = await document.updateOne(docs, { $set: { ...update } });
          break;
        }
        case 'deleteOne': {
          returnValue = await document.deleteOne(docs);
          break;
        }
        case 'deleteMany': {
          returnValue = await document.deleteMany(docs);
          break;
        }
        default:
          break;
      }
      client.close();
      return returnValue;
    } catch (err) {
      throw new Error('database operation failed');
    }
  }

  return {
    operations,
    execute
  };
};

export default service;
