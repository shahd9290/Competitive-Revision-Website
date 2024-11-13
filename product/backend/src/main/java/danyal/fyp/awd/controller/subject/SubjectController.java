package danyal.fyp.awd.controller.subject;

import danyal.fyp.awd.dto.subject.SubjectDto;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.model.subject.Subject;
import danyal.fyp.awd.service.subject.QualificationService;
import danyal.fyp.awd.service.subject.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subject")
public class SubjectController {

    private final SubjectService subjectService;
    private final QualificationService qualificationService;

    @PostMapping("/add")
    public ResponseEntity<String> addSubject(@RequestBody final SubjectDto subjectDto) {


        String subjectName = subjectDto.name();
        String subjectQual = subjectDto.qualification();

        /*
        * Check both tables
        * If subject exists with the qualification already, great do nothing
        * If subject exists without the qualification & qualification exists, need to update qualifications set to include it.
        * If subject does not exist but qualification does, new subject and add qualification to it.
        * If qualification does not exist, return error. Needs to exist beforehand.
        * */

        // Check if Qualification exists?
        Qualification qualification;
        if ((qualification = qualificationService.getQualification(subjectQual).orElse(null))== null) {
            return ResponseEntity.badRequest().body("Qualification Does Not Exist.");
        }
        // Check if subject exists now.
        Subject subject;
        if ((subject = subjectService.getSubject(subjectName).orElse(null))!= null) {
            // Subject exists, does it already have the qualification?
            if (subject.getQualifications().contains(qualification)) {
                return ResponseEntity.badRequest().body("Subject already exists with this qualification!");
            }
            // It doesn't, needs to be updated.
            else {
                subjectService.addQualification(subject, qualification);
                return ResponseEntity.ok("Updated Existing Subject with new qualification");
            }
        }
        // Subject does not exist. Qualification does so we can create a new one with it.
        else {
            subjectService.addSubject(subjectName, qualification);
            return ResponseEntity.ok("Created new subject");
        }
    }

}
