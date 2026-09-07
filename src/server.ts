import "dotenv/config";
import app from "./app";
import config from "./app/config";
import { prisma } from "./app/lib/prisma";

const PORT = config.port || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connect to the database successfully.");

    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  
    process.on("unhandledRejection", (error) => {
      console.log("Unhandled Rejection detected, shutting down...", error);
      if (server) {
        server.close(() => {
          prisma.$disconnect();
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });

  } catch (error) {
    console.log("Error starting the server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();