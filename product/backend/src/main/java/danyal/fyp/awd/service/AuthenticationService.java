package danyal.fyp.awd.service;

import danyal.fyp.awd.dto.AuthenticationRequestDto;
import danyal.fyp.awd.dto.AuthenticationResponseDto;
import danyal.fyp.awd.model.RefreshToken;
import danyal.fyp.awd.repository.RefreshTokenRepository;
import danyal.fyp.awd.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RefreshTokenService refreshTokenService;

    public AuthenticationResponseDto authenticate(final AuthenticationRequestDto request) {
        final var authToken = UsernamePasswordAuthenticationToken.unauthenticated(request.username(), request.password());
        final var authentication = authenticationManager.authenticate(authToken);

        final var accessToken = jwtService.generateToken(request.username());

        final var user = userRepository.findByUsername(request.username())
                .orElseThrow(() ->
                        new UsernameNotFoundException("User with username [%s] not found".formatted(request.username())));

        // Check if valid refresh token is in database.
        // If not (expired or non-existent) then create one
        // Otherwise ignore and continue
        if (refreshTokenService.hasInvalidRefreshToken(user)) {
             refreshTokenService.createToken(user);
        }

        return new AuthenticationResponseDto(accessToken);
    }

}
