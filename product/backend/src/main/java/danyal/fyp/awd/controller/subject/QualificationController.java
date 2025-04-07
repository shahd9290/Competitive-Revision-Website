package danyal.fyp.awd.controller.subject;

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
     * Retrieves all qualifications.
     *
     * @return a list of all qualifications.
     */
    @GetMapping("/get-all")
    public ResponseEntity<List<Qualification>> getAllQualifications() {
        return ResponseEntity.ok(qualificationService.getAllQualifications());
    }



}
