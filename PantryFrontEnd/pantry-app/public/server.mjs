import fallback from "express-history-api-fallback";
import express from "express";
import path from "path";

const app = express();
const root = `${path.resolve()}`;

app.use(express.static(root));
app.use(fallback("index.html", { root }));

// app.get("/*", (req, res) => {
//   res.send();
// });

app.listen(8080, () => console.log("Listening on 8080"));
