package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.admin.DeleteDto;
import danyal.fyp.awd.dto.admin.subject.SubjectDeleteDto;
import danyal.fyp.awd.dto.admin.subject.SubjectDto;
import danyal.fyp.awd.dto.admin.subject.SubjectEditDto;
import danyal.fyp.awd.dto.admin.topic.TopicDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Subject;
import danyal.fyp.awd.service.subject.QualificationService;
import danyal.fyp.awd.service.subject.SubjectTopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/")
@RequiredArgsConstructor
public class AdminSubjectTopicController {

    private final SubjectTopicService subjectTopicService;
    private final QualificationService qualificationService;

     /**
     * Adds a subject or updates an existing subject with a new qualification.
     *
     * @param subjectDto the subject data to add or update.
     * @return a success or error message.
     * @throws QualificationException if the qualification is invalid.
     */
    @PostMapping("/subjects/add")
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

    @GetMapping("/subjects/get")
    public ResponseEntity<Object> getSubjects() {
        try {
            return ResponseEntity.ok(subjectTopicService.getAllSubjectsAdmin());
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body("An error occurred when fetching data");
        }
    }

    @DeleteMapping("/subjects/delete")
    public ResponseEntity<Object> deleteSubject(@RequestBody final SubjectDeleteDto deleteDto) {
        try {
            subjectTopicService.deleteSubject(deleteDto.id(), deleteDto.qualification());
            return ResponseEntity.ok("Subject Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed To Delete Subject");
        }
    }

    @PostMapping("/subjects/edit")
    public ResponseEntity<Object> editSubject (@RequestBody final SubjectEditDto subjectEditDto) {
         try {
            subjectTopicService.editSubject(subjectEditDto.id(), subjectEditDto.subject(), subjectEditDto.qualification());
            return ResponseEntity.ok("Subject Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed To Delete Subject");
        }
    }

    /**
     * Adds a topic for a subject.
     *
     * @param topicDto the topic data to add.
     * @return a success or error message.
     */
    @PostMapping("/topics/add")
    public ResponseEntity<String> addTopic(@RequestBody final TopicDto topicDto) {
        try {
            subjectTopicService.saveTopic(topicDto);
            return ResponseEntity.ok("Topic saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/topics/get")
    public ResponseEntity<Object> getTopics() {
        try {
            return ResponseEntity.ok(subjectTopicService.getAllTopicsAdmin());
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body("An error occurred when fetching data");
        }
    }

    @DeleteMapping("/topics/delete")
    public ResponseEntity<Object> deleteTopic(@RequestBody final DeleteDto deleteDto) {
        try {
            subjectTopicService.deleteTopic(deleteDto.id());
            return ResponseEntity.ok("Topic Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed To Delete Topic");
        }
    }
}
