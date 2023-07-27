module.exports = {
  db: `mongodb+srv://${process.env.USER_LOGIN}:${process.env.USER_PASSWORD}@cluster36998.cuipj9e.mongodb.net/${process.env.TABLE_NAME}?retryWrites=true&w=majority`,
  keySession: ['YOUR_KEY'],
  maxAgeSession: 24 * 60 * 60 * 1000,
}