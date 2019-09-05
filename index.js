require("dotenv").config();
const server = require("./server");

const port = process.env.PORT || 5000;
console.log(process.env.PORT);

server.listen(port, () => console.log(`\n** API on port ${port} **\n`));
