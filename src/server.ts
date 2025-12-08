import app from "./app";
import config from "./config";

app.listen(config.Port, () => {
  console.log("Server is running");
});