import express, { Request, Response } from "express";
import csv from "csvtojson";

const app = express();

app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Conrol-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": ["GET"]
  });
  if (req.method === "OPTIONS") return res.end("");
  next();
});

app.get(`/resources`, async (req: Request, res: Response) => {
  try {
    const data = await csv().fromFile(`./data.csv`);
    return res.json(data);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: `Error finding or parsing file` });
  }
});

const port = process.env.$PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port`, port);
});
