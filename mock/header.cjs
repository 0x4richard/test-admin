module.exports = (_req, res, next) => {
  res.header('X-Total-Count', 100)
  next()
}
