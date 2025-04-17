package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.admin.DeleteDto;
import danyal.fyp.awd.dto.admin.subject.SubjectDeleteDto;
import danyal.fyp.awd.dto.admin.subject.SubjectDto;
import danyal.fyp.awd.dto.admin.subject.SubjectEditDto;
import danyal.fyp.awd.dto.admin.topic.TopicDto;
import danyal.fyp.awd.dto.admin.topic.TopicEditDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Subject;
import danyal.fyp.awd.service.subject.QualificationService;
import danyal.fyp.awd.service.subject.SubjectTopicService;
import danyal.fyp.awd.service.user.UserAttemptsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/")
@RequiredArgsConstructor
public class AdminSubjectTopicController {

    private final SubjectTopicService subjectTopicService;
    private final UserAttemptsService userAttemptsService;
     /**
     * Adds a subject or updates an existing subject with a new qualification.
     *
     * @param subjectDto the subject data to add or update.
     * @return a success or error message.
     * @throws QualificationException if the qualification is invalid.
     */
    @PostMapping("/subjects/add")
    public ResponseEntity<String> addSubject(@CookieValue("token") String token, @RequestBody final SubjectDto subjectDto) {
        try {
            return ResponseEntity.ok(subjectTopicService.newSubject(subjectDto.name(), subjectDto.qualification(), token));
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/subjects/get")
    public ResponseEntity<Object> getSubjects() {
        return ResponseEntity.ok(subjectTopicService.getAllSubjectsAdmin());
    }

    @DeleteMapping("/subjects/delete")
    public ResponseEntity<Object> deleteSubject(@CookieValue("token") String token, @RequestBody final SubjectDeleteDto deleteDto) {
        try {
            subjectTopicService.deleteSubject(deleteDto, token);
            return ResponseEntity.ok("Subject Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed To Delete Subject");
        }
    }

    @PostMapping("/subjects/edit")
    public ResponseEntity<Object> editSubject (@CookieValue("token") String token, @RequestBody final SubjectEditDto subjectEditDto) {
         try {
            subjectTopicService.editSubject(subjectEditDto, token);
            return ResponseEntity.ok("Subject Edited Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed To Edit Subject");
        }
    }

    /**
     * Adds a topic for a subject.
     *
     * @param topicDto the topic data to add.
     * @return a success or error message.
     */
    @PostMapping("/topics/add")
    public ResponseEntity<String> addTopic(@CookieValue("token") String token, @RequestBody final TopicDto topicDto) {
        try {
            subjectTopicService.saveTopic(topicDto, token);
            return ResponseEntity.ok("Topic saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/topics/get")
    public ResponseEntity<Object> getTopics() {
        return ResponseEntity.ok(subjectTopicService.getAllTopicsAdmin());
    }

    @DeleteMapping("/topics/delete")
    public ResponseEntity<Object> deleteTopic(@CookieValue("token") String token, @RequestBody final DeleteDto deleteDto) {
        try {
            userAttemptsService.deleteAttempts(deleteDto.id());
            subjectTopicService.deleteTopic(deleteDto.id(), token);
            return ResponseEntity.ok("Topic Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed To Delete Topic");
        }
    }

    @PostMapping("/topics/edit")
    public ResponseEntity<Object> editTopic(@CookieValue("token") String token, @RequestBody final TopicEditDto topicEditDto) {
        try {
            subjectTopicService.editTopic(topicEditDto, token);
            return ResponseEntity.ok("Topic Edited Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed To Edit Topic");
        }
    }
}
