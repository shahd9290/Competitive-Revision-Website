package danyal.fyp.awd.controller;

import danyal.fyp.awd.dto.AuthenticationRequestDto;
import danyal.fyp.awd.dto.AuthenticationResponseDto;
import danyal.fyp.awd.service.AuthenticationService;
import danyal.fyp.awd.service.CookieService;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;
    private final CookieService cookieService;

    @PostMapping("/login")
    public ResponseEntity<String> authenticate(@RequestBody final AuthenticationRequestDto authenticationRequestDto) {
        AuthenticationResponseDto response = authenticationService.authenticate(authenticationRequestDto);
        ResponseCookie cookie = cookieService.createTokenCookie(response.accessToken());
        ResponseCookie cookieExpire = cookieService.createTimerCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString(), cookieExpire.toString()).body("User logged in successfully");
    }

}
