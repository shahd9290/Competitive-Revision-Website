package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.subject.QualificationDto;
import danyal.fyp.awd.dto.subject.QuestionAddDto;
import danyal.fyp.awd.dto.subject.SubjectDto;
import danyal.fyp.awd.dto.subject.TopicDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Subject;
import danyal.fyp.awd.service.subject.QualificationService;
import danyal.fyp.awd.service.subject.QuestionService;
import danyal.fyp.awd.service.subject.SubjectTopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final QualificationService qualificationService;
    private final QuestionService questionService;
    private final SubjectTopicService subjectTopicService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Hello Admin");
    }

    /**
     * Adds a new qualification.
     *
     * @param qualificationDto the data for the qualification to add.
     * @return a success message.
     */
    @PostMapping("/qualification/add")
    public ResponseEntity<String> addQualification(@RequestBody final QualificationDto qualificationDto) {
        Qualification qualification = new Qualification();
        qualification.setName(qualificationDto.qualification());
        try {
            qualificationService.saveQualification(qualification);
            return ResponseEntity.ok("Qualification Added Successfully");
        }
        catch (Exception e) {
            return  ResponseEntity.badRequest().body(e.getMessage());
        }
    }

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

    @PostMapping("/question/add")
    public ResponseEntity<String> addQuestion(@RequestBody QuestionAddDto questionAddDto) {
        try {
            questionService.addQuestion(questionAddDto.question(), questionAddDto.answer(), questionAddDto.marks(), questionAddDto.topic(), questionAddDto.qualification());
            return ResponseEntity.ok("Question added");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
