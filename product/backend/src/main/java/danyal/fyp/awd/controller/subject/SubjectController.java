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

import java.util.HashSet;
import java.util.Set;

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

        Subject subject;

        // REVERSE THIS

        if ((subject=subjectService.getSubject(subjectName).orElse(null)) != null){
            Qualification qualification;
            if ((qualification = qualificationService.getQualification(subjectQual).orElse(null)) != null) {
                return ResponseEntity.badRequest().body("Subject Already Exists");
            }
            else {
                // Update subject with new qualification
                Set<Qualification> updatedQuals = newQual(subject.getQualifications(), subjectQual);
            }
        }
        else {
            subject = new Subject();
            subject.setName(subjectName);
            subject.setQualifications();
        }
    }

    private Set<Qualification> newQual (Set<Qualification> quals, String subjectQual) {
        Qualification qualification = new Qualification();
        qualification.setName(subjectQual);
        qualificationService.saveQualification(qualification);
        quals.add(qualification);
    }

}
