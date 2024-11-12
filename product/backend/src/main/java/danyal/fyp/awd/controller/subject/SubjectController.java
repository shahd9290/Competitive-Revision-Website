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
        Subject subject = new Subject();
        subject.setName(subjectDto.name());

        String qualificationString = subjectDto.qualification();

        Qualification qualification = qualificationService.getQualification(qualificationString).orElse(null);
        if (qualification == null) return ResponseEntity.badRequest().body("Invalid Qualification");

        Set<Qualification> qualificationSet = new HashSet<>();
        qualificationSet.add(qualification);

        subject.setQualifications(qualificationSet);

        subjectService.saveSubject(subject);

        return ResponseEntity.ok("Subject Added Successfully");
    }

}
