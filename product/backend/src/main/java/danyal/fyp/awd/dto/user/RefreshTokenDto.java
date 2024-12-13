package danyal.fyp.awd.dto.user;

import java.util.UUID;

/**
 * A DTO representing a refresh token.
 *
 * @param refreshToken the UUID of the refresh token used for renewing access tokens.
 * @author Danyal Shah
 */
public record RefreshTokenDto(UUID refreshToken) {
}
