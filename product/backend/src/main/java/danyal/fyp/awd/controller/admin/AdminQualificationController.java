package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.service.subject.QualificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/qualification")
@RequiredArgsConstructor
public class AdminQualificationController {

    private final QualificationService qualificationService;

    // TODO: Add endpoint to create Admin profile

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
