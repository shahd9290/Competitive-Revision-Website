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

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class RegistrationController {

    private final UserRegistrationService userRegistrationService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(
            @Valid @RequestBody final RegistrationRequestDto registrationDTO) {
        try {

            final var registeredUser = userRegistrationService
                    .registerUser(registrationDTO);

            return ResponseEntity.ok(
                    toRegistrationResponseDto(registeredUser)
            );
        } catch (ValidationException | QualificationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private RegistrationResponseDto toRegistrationResponseDto(
            final User user) {

        return new RegistrationResponseDto(
                user.getUsername(), user.getEmail(), user.getQualificationId());
    }

}
