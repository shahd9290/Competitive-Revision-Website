package danyal.fyp.awd.controller;

import danyal.fyp.awd.dto.UserProfileDto;
import danyal.fyp.awd.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getUserProfile(final Authentication authentication) {
        final var user = userService.getUserByUsername(authentication.getName());

        return ResponseEntity.ok(new UserProfileDto(user.getEmail(), user.getUsername()));
    }

}
