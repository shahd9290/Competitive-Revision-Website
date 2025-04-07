package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.dto.admin.user.UserDeleteDto;
import danyal.fyp.awd.dto.admin.user.UserEditDto;
import danyal.fyp.awd.service.user.UserAttemptsService;
import danyal.fyp.awd.service.user.UserRegistrationService;
import danyal.fyp.awd.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserService userService;
    private final UserRegistrationService userRegistrationService;
    private final UserAttemptsService userAttemptsService;

    @GetMapping("/get")
    public ResponseEntity<Object> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteUser(@CookieValue("token") String token, @RequestBody final UserDeleteDto deleteDto) {
        userAttemptsService.deleteAttempts(deleteDto.id());
        userRegistrationService.deleteUser(deleteDto.id(), token);
        return ResponseEntity.ok("User Deleted Successfully");
    }

    @PostMapping("/edit")
    public ResponseEntity<String> editUser(@CookieValue("token") String token, @RequestBody final UserEditDto userEditDto) {
        try {
            userRegistrationService.editUser(userEditDto, token);
            return ResponseEntity.ok("User Edited Successfully");
        }
        catch (Exception e) {
            return  ResponseEntity.badRequest().body("Failed To Edit User");
        }
    }

}
