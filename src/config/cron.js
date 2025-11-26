import cron from "cron";
import https from "https";  // ✔ corregido

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {  // ✔ process.env corregido
      if (res.statusCode === 200) {
        console.log("Cron ping successful:", res.statusCode);
      } else {
        console.log("Cron ping returned non-200:", res.statusCode);
      }
    })
    .on("error", (e) => console.log("Error while sending request:", e));
});

// IMPORTANT → Start the job
job.start();

export default job;
