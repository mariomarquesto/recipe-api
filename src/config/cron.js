import cron from "cron";
import https from "https";

export const job = new cron.CronJob("*/14 * * * *", function () {

    const url = process.env.API_URL;

    if (!url) {
        console.log("❌ ERROR: API_URL no está definida en Render");
        return;
    }

    https.get(url, (res) => {
        console.log("Ping enviado ➜ Status:", res.statusCode);
    }).on("error", (e) => {
        console.log("❌ Error while sending request:", e);
    });

});
