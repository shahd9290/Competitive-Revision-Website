package danyal.fyp.awd.controller.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Hello Admin");
    }

}
