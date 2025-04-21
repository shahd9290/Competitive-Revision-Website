package danyal.fyp.awd.controller.subject;

import danyal.fyp.awd.dto.subject.SubjectAllResultDto;
import danyal.fyp.awd.dto.subject.TopicCountDto;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.service.subject.QualificationService;
import danyal.fyp.awd.service.subject.SubjectTopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Handles REST API endpoints for managing subjects and topics.
 * Provides methods to fetch subjects and topics based on qualification and subject filters.
 *
 * @author Danyal Shah
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
public class SubjectTopicController {

    private final SubjectTopicService subjectTopicService;

    /**
     * Retrieves all subjects for a given qualification.
     *
     * @param qualification the qualification to filter subjects by (optional)
     * @return a list of matching subjects or all subjects if no filter is applied
     */
    @GetMapping("/subject/get-all")
    public ResponseEntity<Object> getAllSubjects(@RequestParam(required = false) String qualification) {
        try {
            if (qualification != null && !qualification.isEmpty()) {
                List<SubjectAllResultDto> subjects = subjectTopicService.getAllSubjects(qualification);
                return ResponseEntity.ok(subjects);
            }
            else {
                return ResponseEntity.ok(subjectTopicService.getAllSubjects());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Retrieves all topics for a given subject and qualification.
     *
     * @param qualification the qualification to filter topics by (optional)
     * @param subject the subject to filter topics by (optional)
     * @return a list of topics matching the filters, or all topics if no filter is applied
     */
    @GetMapping("/topic/get-all")
    public ResponseEntity<Object> getAllTopics(@RequestParam(required = false) String qualification, @RequestParam(required = false) String subject) {
        try {
            if (qualification != null && subject != null && !qualification.isEmpty() && !subject.isEmpty()) {
                List<TopicCountDto> topics = subjectTopicService.getAllForSubQual(qualification, subject);
                return ResponseEntity.ok(topics);
            }
            else {
                return ResponseEntity.ok(subjectTopicService.getAllTopicsAdmin());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Retrieves a specific topic by its ID.
     *
     * @param topicId the ID of the topic to retrieve
     * @return the topic details if found, or an error message
     */
    @GetMapping("/topic/get")
    public ResponseEntity<Object> getTopic(@RequestParam int topicId) {
        try {
            return ResponseEntity.ok(subjectTopicService.getTopic(topicId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
