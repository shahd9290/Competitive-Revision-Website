package danyal.fyp.awd.controller.subject;

import danyal.fyp.awd.dto.subject.QuestionGetDto;
import danyal.fyp.awd.service.subject.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for retrieving questions based on topic.
 * Provides an endpoint for users to fetch questions associated with a specific topic.
 *
 * @author Danyal Shah
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
public class QuestionController {

    private final QuestionService questionService;

    /**
     * Retrieves questions associated with a given topic ID.
     *
     * @param topicId the ID of the topic whose questions are to be fetched.
     * @return a ResponseEntity containing the list of questions or an error message.
     */
    @GetMapping("/get")
    public ResponseEntity<Object> getQuestionByTopic(@RequestParam final int topicId) {
        try {
            QuestionGetDto questions = questionService.getQuestions(topicId);
            return ResponseEntity.ok(questions);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
