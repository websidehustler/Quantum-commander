import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Mock API for Analytics
  app.get("/api/analytics", (req, res) => {
    // Generate some mock history data
    const history = Array.from({ length: 24 }, (_, i) => ({
      name: `${i}:00`,
      views: Math.floor(Math.random() * 5000) + 1000,
      scans: Math.floor(Math.random() * 500) + 100,
    }));

    res.json({
      views: 124582,
      ctr: 4.8,
      scans: 8920,
      revenue: "54,290.00",
      history: history,
      funnel: [
        { name: "Discovery", value: 100, fill: "#00f3ff" },
        { name: "Engagement", value: 65, fill: "#39ff14" },
        { name: "Conversion", value: 35, fill: "#ff00c1" },
        { name: "Loyalty", value: 12, fill: "#ffffff" },
      ]
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
