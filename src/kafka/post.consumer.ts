import {kafkaConsumer} from '../config/kafka.js'; // Import the Kafka Consumer for listening to events
import {logger} from '../utils/logger.js'; // Import a logger utility for logging messages
const TOPIC_NAME = 'post-events';

export async function runPostConsumer(): Promise<void> {
  try {
    // Topic ko subscribe karo
    await kafkaConsumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

    // Messages read/consume karna shuru karo
    await kafkaConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (!message.value) return;

        const rawData = message.value.toString();
        const event = JSON.parse(rawData);

        console.log(`📥 [Kafka Consumer] Received event from topic [${topic}]:`);
        console.log(`✨ Event Type: ${event.eventType}`);
        
        // Simulating heavy background workload (like sending emails or notification)
        if (event.eventType === 'POST_CREATED') {
          const post = event.payload;
          console.log(`➡️ [Worker Job] Triggering notifications for new post: "${post.title}" (Author ID: ${post.userId})`);
          // Kal ko notificationService.send() yahan aaram se call ho sakta hai.
        }
      },
    });
  } catch (error) {
    console.error('❌ Kafka Consumer Runtime Error:', error);
  }
}