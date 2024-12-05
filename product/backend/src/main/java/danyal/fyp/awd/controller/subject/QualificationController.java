package danyal.fyp.awd.controller.subject;

import danyal.fyp.awd.dto.subject.QualificationDto;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.service.subject.QualificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/qualification")
public class QualificationController {

    private final QualificationService qualificationService;

    @PostMapping("/add")
    public ResponseEntity<String> addQualification(@RequestBody final QualificationDto qualificationDto) {
        Qualification qualification = new Qualification();
        qualification.setName(qualificationDto.qualification());
        qualificationService.saveQualification(qualification);
        return ResponseEntity.ok("Qualification Added Successfully");
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Qualification>> getAllQualifications() {
        return ResponseEntity.ok(qualificationService.getAllQualifications());
    }


}
