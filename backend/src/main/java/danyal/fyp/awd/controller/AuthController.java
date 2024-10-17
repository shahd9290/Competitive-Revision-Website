package danyal.fyp.awd.controller;

import danyal.fyp.awd.dto.AuthenticationRequestDto;
import danyal.fyp.awd.dto.AuthenticationResponseDto;
import danyal.fyp.awd.dto.RefreshTokenDto;
import danyal.fyp.awd.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDto> authenticate(@RequestBody final AuthenticationRequestDto authenticationRequestDto) {
        AuthenticationResponseDto response = authenticationService.authenticate(authenticationRequestDto);

        ResponseCookie cookie = ResponseCookie.from("token", response.accessToken())
                .httpOnly(true)
                .sameSite("Strict")
                .secure(true)
                .path("/")
                .maxAge(900)
                .build();

//        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("User logged in successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponseDto> refreshToken(@RequestBody RefreshTokenDto rT) {
        return ResponseEntity.ok(authenticationService.refreshToken(rT.refreshToken()));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> revokeToken(@RequestBody RefreshTokenDto rT) {
        authenticationService.revokeRefreshToken(rT.refreshToken());
        return ResponseEntity.noContent().build();
    }

}
