package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.admin.DeleteDto;
import danyal.fyp.awd.dto.admin.question.QuestionEditDto;
import danyal.fyp.awd.dto.admin.question.QuestionAddDto;
import danyal.fyp.awd.service.subject.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for managing questions in the admin panel.
 * Provides endpoints to add, edit, retrieve, and delete questions.
 *
 * @author Danyal Shah
 */
@RestController
@RequestMapping("/api/admin/questions")
@RequiredArgsConstructor
public class AdminQuestionController {

    private final QuestionService questionService;

    /**
     * Adds a new question.
     *
     * @param token the authentication token from the cookie.
     * @param questionAddDto the question data to add.
     * @return a ResponseEntity with a success or error message.
     */
    @PostMapping("/add")
    public ResponseEntity<String> addQuestion(@CookieValue("token") String token, @RequestBody QuestionAddDto questionAddDto) {
        try {
            questionService.addQuestion(questionAddDto, token);
            return ResponseEntity.ok("Question added");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Retrieves all questions for admin view.
     *
     * @return a ResponseEntity containing the list of questions.
     */
    @GetMapping("/get")
    public ResponseEntity<Object> getQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    /**
     * Edits an existing question.
     *
     * @param token the authentication token from the cookie.
     * @param questionEditDto the updated question data.
     * @return a ResponseEntity with a success or error message.
     */
    @PostMapping("/edit")
    public ResponseEntity<String> editQuestion(@CookieValue("token") String token, @RequestBody QuestionEditDto questionEditDto) {
        try {
            questionService.editQuestion(questionEditDto, token);
            return ResponseEntity.ok("Question edited");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Deletes a question based on its ID.
     *
     * @param token the authentication token from the cookie.
     * @param deleteDto the DTO containing the ID of the question to delete.
     * @return a ResponseEntity with a success or error message.
     */
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
