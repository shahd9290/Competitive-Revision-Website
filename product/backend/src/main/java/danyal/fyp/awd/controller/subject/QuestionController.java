package danyal.fyp.awd.controller.subject;

import danyal.fyp.awd.dto.subject.QuestionAddDto;
import danyal.fyp.awd.service.subject.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
public class QuestionController {
    private final QuestionService questionService;

    @PostMapping("/add")
    public ResponseEntity<String> addQuestion(@RequestBody QuestionAddDto questionAddDto) {
        try {
            questionService.addQuestion(questionAddDto.question(), questionAddDto.answer(), questionAddDto.marks(), questionAddDto.topic(), questionAddDto.qualification());
            return ResponseEntity.ok("Question added");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
