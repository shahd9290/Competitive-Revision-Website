package danyal.fyp.awd.controller.subject;

import danyal.fyp.awd.dto.subject.QuestionAddDto;
import danyal.fyp.awd.dto.subject.QuestionGetDto;
import danyal.fyp.awd.model.subject.Question;
import danyal.fyp.awd.service.subject.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
public class QuestionController {
    private final QuestionService questionService;

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
