package danyal.fyp.awd.dto.subject;

import danyal.fyp.awd.model.subject.Topic;

import java.util.List;

public record SubjectAllResultDto(int id, String name, List<Topic> topics) {
}
