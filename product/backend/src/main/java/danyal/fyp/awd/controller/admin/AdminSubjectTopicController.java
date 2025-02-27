package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.service.subject.SubjectTopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/")
@RequiredArgsConstructor
public class AdminSubjectTopicController {

    private final SubjectTopicService subjectTopicService;

    // TODO: Add endpoint to create Admin profile

    @GetMapping("/subjects/get")
    public ResponseEntity<Object> getSubjects() {
        try {
            return ResponseEntity.ok(subjectTopicService.getAllSubjectsAdmin());
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body("An error occurred when fetching data");
        }
    }

    @GetMapping("/topics/get")
    public ResponseEntity<Object> getTopics() {
        try {
            return ResponseEntity.ok(subjectTopicService.getAllTopics());
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body("An error occurred when fetching data");
        }
    }

}
