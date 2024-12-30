package danyal.fyp.awd.controller.subject;

import danyal.fyp.awd.dto.subject.QualificationDto;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.service.subject.QualificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/**
 * Handles REST API endpoints for managing qualifications.
 *
 * @author Danyal Shah
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/qualification")
public class QualificationController {

    private final QualificationService qualificationService;

    /**
     * Adds a new qualification.
     *
     * @param qualificationDto the data for the qualification to add.
     * @return a success message.
     */
    @PostMapping("/add")
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
     * Retrieves all qualifications.
     *
     * @return a list of all qualifications.
     */
    @GetMapping("/get-all")
    public ResponseEntity<List<Qualification>> getAllQualifications() {
        return ResponseEntity.ok(qualificationService.getAllQualifications());
    }


}
