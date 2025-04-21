package danyal.fyp.awd.dto.subject;

/**
 * A DTO representing a topic along with its question count.
 * Includes the topic name and the number of associated questions.
 *
 * @param id the unique identifier of the topic
 * @param name the name of the topic
 * @param questionCount the number of questions associated with the topic
 * @author Danyal Shah
 */
public record TopicCountDto(int id, String name, int questionCount) {
}
