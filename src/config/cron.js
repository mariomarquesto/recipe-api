import cron from "cron";
import { Http2ServerRequest } from "http2";
import hattps from "https";


const job = new cron.CronJob("*/14 * * * *", function (){
    https 
    .get(process.envv.API_URL,(res) => {
        if(res.statusCode ===200) console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => console.log ("Error whhile sending request", e));
})

export default job;


// CRON JOB EXPLANATION:
//Cron jobs are tasks that run periodically at fixed intervals
//We want to send 1 GET request for every 14 minutes so that our never gets inactive on Render.com
// ho to define a "Schedule
// You define a schedule using a cron expression, which consist of 5 fields representing:
