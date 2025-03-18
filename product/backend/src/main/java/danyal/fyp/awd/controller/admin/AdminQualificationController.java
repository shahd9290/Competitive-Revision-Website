package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.subject.QualificationDto;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.service.subject.QualificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/qualifications")
@RequiredArgsConstructor
public class AdminQualificationController {

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

    @GetMapping("/get")
    public ResponseEntity<Object> getUsers() {
        try {
            return ResponseEntity.ok(qualificationService.getAllQualificationsAdmin());
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body("An error occurred when fetching data");
        }
    }

}
