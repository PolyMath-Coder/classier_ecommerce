const Redis = require('ioredis');
const redis = new Redis();

const cache = (req, res, next) => {
  const { id } = req.params;
  redis.get(id, (error, result) => {
    if (error) throw error;
    if (result !== null) {
      console.log(result);
      return res.json(JSON.parse(result));
    } else {
      return next();
    }
  });
};

module.exports = { cache };
