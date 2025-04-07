package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.admin.DeleteDto;
import danyal.fyp.awd.dto.admin.question.QuestionEditDto;
import danyal.fyp.awd.dto.admin.question.QuestionAddDto;
import danyal.fyp.awd.service.subject.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/questions")
@RequiredArgsConstructor
public class AdminQuestionController {

    private final QuestionService questionService;

    @PostMapping("/add")
    public ResponseEntity<String> addQuestion(@CookieValue("token") String token, @RequestBody QuestionAddDto questionAddDto) {
        try {
            questionService.addQuestion(questionAddDto, token);
            return ResponseEntity.ok("Question added");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get")
    public ResponseEntity<Object> getQuestions() {
        try {
            return ResponseEntity.ok(questionService.getAllQuestions());
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body("An error occurred when fetching data");
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<String> editQuestion(@CookieValue("token") String token, @RequestBody QuestionEditDto questionEditDto) {
        try {
            questionService.editQuestion(questionEditDto, token);
            return ResponseEntity.ok("Question added");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteQuestion(@CookieValue("token") String token, @RequestBody DeleteDto deleteDto) {
        try {
            questionService.deleteQuestion(deleteDto.id(), token);
            return ResponseEntity.ok("Question Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed To Delete Question");
        }
    }

}
