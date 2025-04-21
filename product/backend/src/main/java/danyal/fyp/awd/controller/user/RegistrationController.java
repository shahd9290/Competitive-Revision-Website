package danyal.fyp.awd.controller.user;

import danyal.fyp.awd.dto.user.auth.RegistrationRequestDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.service.user.UserRegistrationService;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handles REST API endpoints for user registration.
 * Accepts registration data and delegates validation and persistence to the registration service.
 *
 * @author Danyal Shah
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class RegistrationController {

    private final UserRegistrationService userRegistrationService;

    /**
     * Registers a new user with the provided registration details.
     *
     * @param registrationDTO the registration data for the user
     * @return a success message or an error message if validation fails
     */
    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody final RegistrationRequestDto registrationDTO) {
        try {
            userRegistrationService.registerUser(registrationDTO);
            return ResponseEntity.ok("User Registered Successfully");
        } catch (ValidationException | QualificationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
