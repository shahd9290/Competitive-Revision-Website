package danyal.fyp.awd.dto;

import java.util.UUID;

public record AuthenticationResponseDto(String accessToken, UUID refreshToken) {
}
