import {kafkaProducer} from '../config/kafka.js'; // Import the Kafka producer instance from the configuration file
import {logger} from '../utils/logger.js'; // Import a logger utility for logging messages
import {type IPost} from '../interfaces/post.interface.js'; // Import the IPost interface for type checking

const TOPIC_NAME = 'post-events'; //  it is like a folder where messages are stored and organized based on their subject matter or category.

export const postProducer = {

    async emitPostCreated(postData: IPost): Promise<void> {
        try {
            const message = {
                key: postData.id.toString(), // Use the post ID as the message key like address for the message to ensure messages with the same key are sent to the same partition
                value: JSON.stringify({
                    eventType: 'POST_CREATED', // eventType indicates the type of event being sent, in this case, a post creation event
                    timestamp: new Date().toISOString(), // timestamp indicates when the event occurred, which is the current date and time in ISO format
                    payload: postData
                }), // value is the actual content of the message, which is the post object serialized to a JSON string 
            };

            await kafkaProducer.send({
                topic: TOPIC_NAME,
                messages: [message]
            });

            logger.info('✅ Post message sent to Kafka successfully.');
        } catch (error) {
            logger.error('❌ Failed to send post message to Kafka', error);
        }
    }
};


