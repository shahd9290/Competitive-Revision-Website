package danyal.fyp.awd.controller.admin;

import danyal.fyp.awd.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserContoller {

    private final UserService userService;

    // TODO: Add endpoint to create Admin profile

    @GetMapping("/get")
    public ResponseEntity<Object> getUsers() {
        try {
            return ResponseEntity.ok(userService.getAllUsers());
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body("An error occured when fetching data");
        }
    }

}
