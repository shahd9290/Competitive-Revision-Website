package danyal.fyp.awd.dto.subject;

import danyal.fyp.awd.model.subject.Question;

import java.util.List;

public record QuestionGetDto(List<Question> questions, int totalMarks) {
}
