package danyal.fyp.awd.controller.user;

import danyal.fyp.awd.dto.user.RegistrationRequestDto;
import danyal.fyp.awd.dto.user.RegistrationResponseDto;
import danyal.fyp.awd.exception.QualificationException;
import danyal.fyp.awd.model.user.User;
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
     * @param registrationDTO the registration data for the user.
     * @return the registered user details or an error message if validation fails.
     */
    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody final RegistrationRequestDto registrationDTO) {
        try {
            final var registeredUser = userRegistrationService.registerUser(registrationDTO);
            return ResponseEntity.ok(toRegistrationResponseDto(registeredUser));
        } catch (ValidationException | QualificationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Converts a {@link User} object to a {@link RegistrationResponseDto}.
     *
     * @param user the registered user entity.
     * @return the registration response DTO.
     */
    private RegistrationResponseDto toRegistrationResponseDto(final User user) {
        return new RegistrationResponseDto(user.getUsername(), user.getEmail(), user.getQualificationId());
    }

}
