package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.admin.qualification.QualificationEditDto;
import danyal.fyp.awd.dto.admin.qualification.QualificationDto;
import danyal.fyp.awd.model.subject.Qualification;
import danyal.fyp.awd.service.subject.QualificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for managing qualifications in the admin panel.
 * Provides endpoints to add, edit, fetch, and delete qualifications.
 *
 * @author Danyal Shah
 */
@RestController
@RequestMapping("/api/admin/qualifications")
@RequiredArgsConstructor
public class AdminQualificationController {

    private final QualificationService qualificationService;

    /**
     * Adds a new qualification.
     *
     * @param token the authentication token from the cookie.
     * @param qualificationDto the data for the qualification to add.
     * @return a ResponseEntity with a success message or an error message.
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

    /**
     * Retrieves all qualifications for the admin view.
     *
     * @return a ResponseEntity containing the list of qualifications.
     */
    @GetMapping("/get")
    public ResponseEntity<Object> getQualifications() {
        return ResponseEntity.ok(qualificationService.getAllQualificationsAdmin());
    }

    /**
     * Edits an existing qualification.
     *
     * @param token the authentication token from the cookie.
     * @param qualificationEditDto the updated data for the qualification.
     * @return a ResponseEntity with a success message or an error message.
     */
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

    /**
     * Deletes a qualification.
     *
     * @param token the authentication token from the cookie.
     * @param qualificationDto the qualification to delete.
     * @return a ResponseEntity with a success message or an error message.
     */
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
