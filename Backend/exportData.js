import "./config/env.js";
import mongoose from "mongoose";
import { Project } from "./models/Project.js";
import { Skill } from "./models/Skill.js";
import { AITool } from "./models/AITool.js";
import { Service } from "./models/Service.js";
import { PortfolioProfile } from "./models/PortfolioProfile.js";
import fs from "fs";
import path from "path";

async function exportAllData() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      console.error("No MONGO_URL configured in .env");
      process.exit(1);
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUrl);
    console.log("Connected successfully!");

    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    const skills = await Skill.find().sort({ createdAt: 1 }).lean();
    const aiTools = await AITool.find().sort({ createdAt: 1 }).lean();
    const services = await Service.find().sort({ createdAt: 1 }).lean();
    const profile = await PortfolioProfile.findOne().lean();

    const fullExport = {
      exportedAt: new Date().toISOString(),
      counts: {
        projectsCount: projects.length,
        skillsCount: skills.length,
        aiToolsCount: aiTools.length,
        servicesCount: services.length,
      },
      profile,
      projects,
      skills,
      aiTools,
      services,
    };

    const outputPath = path.join(process.cwd(), "portfolio_full_export.json");
    fs.writeFileSync(outputPath, JSON.stringify(fullExport, null, 2), "utf-8");

    console.log(`\nEXPORT COMPLETE! Saved ${projects.length} projects to ${outputPath}`);
    process.exit(0);
  } catch (error) {
    console.error("Export Error:", error);
    process.exit(1);
  }
}

exportAllData();
