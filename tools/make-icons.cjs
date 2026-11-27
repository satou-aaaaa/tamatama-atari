// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、止まった時計と「？」（たまたま当たった？）。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <circle cx="46" cy="52" r="30" fill="#fffdf7"/><circle cx="46" cy="52" r="30" fill="none" stroke="#8fb8de" stroke-width="4"/>
      <path d="M46 52 V32 M46 52 L60 58" stroke="#123554" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="46" cy="52" r="3.5" fill="#b23a24"/>
      <circle cx="78" cy="24" r="15" fill="#f2a43a"/><text x="78" y="31" text-anchor="middle" font-size="22" font-weight="900" font-family="sans-serif" fill="#123554">?</text></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
