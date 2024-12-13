package danyal.fyp.awd.dto.subject;

/**
 * A DTO representing a topic with its associated subject and qualification.
 *
 * @param name          the name of the topic.
 * @param subject       the name of the associated subject.
 * @param qualification the name of the associated qualification.
 * @author Danyal Shah
 */
public record TopicDto(String name, String subject, String qualification) {
}
