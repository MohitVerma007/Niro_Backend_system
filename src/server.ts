
import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

/**
 * Server ko start karne ke liye function
 */


function startServer() {
  try {
    const PORT = env.PORT || 5000;

    app.listen(PORT, () => {
      logger.info(`=============================================`);
      logger.info(`🚀 SERVER RUNNING IN [${process.env.NODE_ENV || 'development'}] MODE`);
      logger.info(`🔗 Localhost: http://localhost:${PORT}`);
      logger.info(`🏥 Health Check: http://localhost:${PORT}/health`);
      logger.info(`=============================================`);
    });
    
  } catch (error) {
    logger.error({ message: "❌ ERROR IN SERVER STARTUP:", error });
    process.exit(1); // Agar server start na ho paye, to process ko close kar do
  }
}

// Server ko fire (execute) karna
startServer();