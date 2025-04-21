package danyal.fyp.awd.dto.subject;

import danyal.fyp.awd.model.subject.Question;

import java.util.List;

/**
 * A DTO for returning a list of questions along with their total marks.
 * Includes the questions and the total marks for all the questions combined.
 *
 * @param questions the list of questions retrieved
 * @param totalMarks the total marks for all the questions combined
 * @author Danyal Shah
 */
public record QuestionGetDto(List<Question> questions, int totalMarks) {
}
