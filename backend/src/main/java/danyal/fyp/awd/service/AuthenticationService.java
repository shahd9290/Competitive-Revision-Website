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

    @Value("${jwt.refresh-token-ttl}")
    private final Duration refreshTokenTtl;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final RefreshTokenRepository refreshTokenRepository;


    public AuthenticationResponseDto authenticate(final AuthenticationRequestDto request) {
        final var authToken = UsernamePasswordAuthenticationToken.unauthenticated(request.username(), request.password());
        final var authentication = authenticationManager.authenticate(authToken);

        final var accessToken = jwtService.generateToken(request.username());

        final var user = userRepository.findByUsername(request.username())
                .orElseThrow(() ->
                        new UsernameNotFoundException("User with username [%s] not found".formatted(request.username())));

        var refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setExpiresAt(Instant.now().plus(refreshTokenTtl));
        refreshTokenRepository.save(refreshToken);

        return new AuthenticationResponseDto(accessToken, refreshToken.getId());
    }

    public AuthenticationResponseDto refreshToken(UUID refreshToken) {
        final var refreshTokenEntity = refreshTokenRepository.findByIdAndExpiresAtAfter(refreshToken, Instant.now())
                .orElseThrow(() -> new BadCredentialsException("Invalid or expired refresh token"));

        final var newAccessToken = jwtService.generateToken(refreshTokenEntity.getUser().getUsername());
        return new AuthenticationResponseDto(newAccessToken, refreshToken);
    }

    public void revokeRefreshToken(UUID refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);
    }

}
