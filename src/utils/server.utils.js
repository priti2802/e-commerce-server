
// Normalize a port into a number, string, or false.
const normalizePort = (val) => {
    const port = parseInt(val, 10);
  
    // named pipe
    if (isNaN(port)) {
      return val;
    }
  
    // port number
    if (port >= 0) {
      return port;
    }
  
    return false;
  };
  
  // Event listener for HTTP server "error" event.
  const onError = (error, port) => {
    if (error.syscall !== "listen") {
      throw error;
    }
  
    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
      default:
        throw error;
    }
  };
  
  const onListening = (server) => {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    // debug("Listening on " + bind);
  };
  
  module.exports = {
    normalizePort,
    onError,
    onListening,
  }