package danyal.fyp.awd.dto.admin.topic;

/**
 * A DTO representing detailed information about a topic.
 * Includes topic name, related subject and qualification, and question count.
 *
 * @param id the unique identifier of the topic
 * @param name the name of the topic
 * @param subject the subject to which the topic belongs
 * @param qualification the qualification associated with the topic
 * @param questionCount the number of questions under this topic
 * @author Danyal Shah
 */
public record TopicDataDto (int id, String name, String subject, String qualification, int questionCount) {
}
