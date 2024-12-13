package danyal.fyp.awd.controller.subject;

import danyal.fyp.awd.dto.subject.SubjectAllResultDto;
import danyal.fyp.awd.dto.subject.SubjectDto;
import danyal.fyp.awd.dto.subject.TopicDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Subject;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.service.subject.QualificationService;
import danyal.fyp.awd.service.subject.SubjectTopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Handles REST API endpoints for managing subjects and topics.
 *
 * @author Danyal Shah
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
public class SubjectTopicController {

    private final SubjectTopicService subjectTopicService;
    private final QualificationService qualificationService;

    /**
     * Adds a subject or updates an existing subject with a new qualification.
     *
     * @param subjectDto the subject data to add or update.
     * @return a success or error message.
     * @throws QualificationException if the qualification is invalid.
     */
    @PostMapping("/subject/add")
    public ResponseEntity<String> addSubject(@RequestBody final SubjectDto subjectDto) throws QualificationException {


        String subjectName = subjectDto.name();
        String subjectQual = subjectDto.qualification();

        // Check if Qualification exists?
        try {
            Qualification qualification = qualificationService.getQualification(subjectQual);
            // Check if subject exists now.
            Subject subject;
            if ((subject = subjectTopicService.getSubject(subjectName).orElse(null)) != null) {
                // Subject exists, does it already have the qualification?
                if (subject.getQualifications().contains(qualification)) {
                    return ResponseEntity.badRequest().body("Subject already exists with this qualification!");
                }
                // It doesn't, needs to be updated.
                else {
                    subjectTopicService.addQualification(subject, qualification);
                    return ResponseEntity.ok("Updated Existing Subject with new qualification");
                }
            }
            // Subject does not exist. Qualification does so we can create a new one with it.
            else {
                subjectTopicService.addSubject(subjectName, qualification);
                return ResponseEntity.ok("Created new subject");
            }
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Retrieves all subjects for a given qualification.
     *
     * @param qualification the qualification to filter subjects by.
     * @return a list of subjects or an error message.
     */
    @GetMapping("/subject/get-all")
    public ResponseEntity<Object> getAllSubjects(@RequestParam String qualification) {
        try {
            List<SubjectAllResultDto> subjects = subjectTopicService.getAllSubjects(qualification);
            return ResponseEntity.ok(subjects);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Adds a topic for a subject.
     *
     * @param topicDto the topic data to add.
     * @return a success or error message.
     */
    @PostMapping("/topic/add")
    public ResponseEntity<String> addTopic(@RequestBody final TopicDto topicDto) {
        try {
            subjectTopicService.saveTopic(topicDto);
            return ResponseEntity.ok("Topic saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    /**
     * Retrieves all topics for a given subject and qualification.
     *
     * @param qualification the qualification to filter topics by.
     * @param subject       the subject to filter topics by.
     * @return a list of topics or an error message.
     */
    @GetMapping("/topic/get-all")
    public ResponseEntity<Object> getAllTopics(@RequestParam String qualification, @RequestParam String subject) {
        try {
            List<Topic> topics = subjectTopicService.getAllForSubQual(qualification, subject);
            return ResponseEntity.ok(topics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
