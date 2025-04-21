package danyal.fyp.awd.dto.admin.topic;

/**
 * A DTO for editing an existing topic.
 * Contains the updated topic name, subject, and qualification.
 *
 * @param id the unique identifier of the topic to be edited
 * @param topic the updated name of the topic
 * @param subject the subject associated with the topic
 * @param qualification the qualification level associated with the topic
 * @author Danyal Shah
 */
public record TopicEditDto(int id, String topic, String subject, String qualification) {
}
