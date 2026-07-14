import { Kafka, logLevel } from 'kafkajs';
import {logger} from '../utils/logger.js'; // Import a logger utility for logging messages

// Initialize Kafka client
export const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'], // kafka broker work as centralized (warehouse) message broker and deliver messages to consumers
    logLevel: logLevel.ERROR, // Set the log level to ERROR for better visibility of events
})

// single instances for sharing across the application
export const kafkaProducer = kafka.producer(); // Producer instance for sending messages to Kafka topics
export const kafkaConsumer = kafka.consumer({ groupId: 'my-group' });  // Consumer instance for receiving messages from Kafka topics, with a specified group ID for load balancing and fault tolerance because group ID is team name of workers that are consuming messages from the same topic.

export async function connectKafka(): Promise<void> {
    try {
        await kafkaProducer.connect(); // Connect the producer to the Kafka broker
        logger.info('Kafka producer connected successfully.');
        await kafkaConsumer.connect(); // Connect the consumer to the Kafka broker
        logger.info('Kafka consumer connected successfully.');
    } catch (error) {
        logger.error('❌ Failed to connect to Kafka', error);
    }
}