package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.admin.DeleteDto;
import danyal.fyp.awd.dto.admin.QuestionEditDto;
import danyal.fyp.awd.dto.subject.QuestionAddDto;
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
    public ResponseEntity<String> addQuestion(@RequestBody QuestionAddDto questionAddDto) {
        try {
            questionService.addQuestion(questionAddDto.question(), questionAddDto.answer(), questionAddDto.marks(), questionAddDto.topic(), questionAddDto.qualification());
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
    public ResponseEntity<String> editQuestion(@RequestBody QuestionEditDto questionEditDto) {
        try {
            questionService.editQuestion(questionEditDto.id(), questionEditDto.question(), questionEditDto.answer(), questionEditDto.marks());
            return ResponseEntity.ok("Question added");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteQuestion(@RequestBody DeleteDto deleteDto) {
        try {
            questionService.deleteQuestion(deleteDto.id());
            return ResponseEntity.ok("Question Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed To Delete Question");
        }
    }

}
