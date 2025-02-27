package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.service.subject.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/questions")
@RequiredArgsConstructor
public class AdminQuestionController {

    private final QuestionService questionService;

    // TODO: Add endpoint to create Admin profile

    @GetMapping("/get")
    public ResponseEntity<Object> getUsers() {
        try {
            return ResponseEntity.ok(questionService.getAllQuestions());
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body("An error occurred when fetching data");
        }
    }

}
