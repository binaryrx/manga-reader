import "@babel/polyfill";

import knex from "#root/db/connection"
import "#root/server/startServer";

console.log("something");

(async () => {
    // const [data] = await knex.select().table('manga');
    // console.log(data)
})();
