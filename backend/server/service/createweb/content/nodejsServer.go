package content

func NodejsServer() string {
	return `const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running");
});
`
}
