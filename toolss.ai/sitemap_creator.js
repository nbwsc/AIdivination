import axios from "axios";
import fs from "fs";
async function getJSON() {
  return await axios.get("https://www.toolss.ai/tools.json");
}
const date = new Date().toISOString().split("T")[0];
async function main() {
  const json = await getJSON();

  const items = json.data.map((tool) => {
    return `<url>
    <loc>https://www.toolss.ai/tools/${tool.name}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
</url>`;
  });
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.toolss.ai/</loc>
        <lastmod>${date}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
    </url>
${items.join("\n")}
</urlset>`;
  fs.writeFileSync("./public/sitemap.xml", sitemap);
}
// <?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//     <url>
//         <loc>https://www.toolss.ai/</loc>
//         <lastmod>2024-04-16</lastmod>
//     </url>
// </urlset>
main();
