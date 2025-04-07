package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.admin.qualification.QualificationEditDto;
import danyal.fyp.awd.dto.admin.qualification.QualificationDto;
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
    public ResponseEntity<String> addQualification(@CookieValue("token") String token, @RequestBody final QualificationDto qualificationDto) {
        try {
            qualificationService.saveQualification(qualificationDto, token);
            return ResponseEntity.ok("Qualification Added Successfully");
        }
        catch (Exception e) {
            return  ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get")
    public ResponseEntity<Object> getUsers() {
        return ResponseEntity.ok(qualificationService.getAllQualificationsAdmin());
    }

    @PostMapping("/edit")
    public ResponseEntity<String> editQualification(@CookieValue("token") String token, @RequestBody final QualificationEditDto qualificationEditDto) {
        try {
            qualificationService.editQualification(qualificationEditDto, token);
            return ResponseEntity.ok("Qualification Edited Successfully");
        }
        catch (Exception e) {
            return  ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteQualification(@CookieValue("token") String token, @RequestBody final QualificationDto qualificationDto) {
        try {
            qualificationService.delete(qualificationDto.qualification(), token);
            return ResponseEntity.ok("Qualification Deleted Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed To Delete Qualification");
        }
    }

}
