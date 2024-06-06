// const axios = require("axios");
import axios from "axios";
const sites = ["https://smartsiri.online", "https://smartsiri.online/#/generate"];

async function submitBing() {
  const url =
    "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=sampleapikeyEDECC1EA4AE341CC8B6";
  const siteUrl = "https://smartsiri.online";
  const urlList = sites;
  const data = {
    siteUrl,
    urlList,
  };
  try {
    const response = await axios.post(url, data);

    console.log(response.data.data);
  } catch (e) {
    console.log(e.response.data);
  }
}

async function main() {
  await submitBing();
}

main();
