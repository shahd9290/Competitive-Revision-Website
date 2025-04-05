package danyal.fyp.awd.dto.subject;

import danyal.fyp.awd.model.subject.Topic;

import java.util.List;

/**
 * A DTO representing a subject with its topics.
 *
 * @param id     the unique identifier of the subject.
 * @param name   the name of the subject.
 * @param topics the list of associated topics for the subject.
 * @author Danyal Shah
 */
public record SubjectAllResultDto(int id, String name, List<TopicCountDto> topics) {
}
