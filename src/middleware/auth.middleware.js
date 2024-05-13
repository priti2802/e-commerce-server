const loggerMiddleware = (req, res, next) => {
  const startTime = new Date().getTime();
  const url = req.url;
  const method = req.method;

  console.log(
    `====================== ${startTime} ======  ${method} ============ ${url} ==========================`
  );

  next();

  const timeTakenForExecution = new Date().getTime() - startTime;
  console.log(
    `========================== ${timeTakenForExecution} ms ${method} ${url} ==========================`
  );
};

module.exports = {
  loggerMiddleware,
};
