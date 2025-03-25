package danyal.fyp.awd.dto.user.auth;

/**
 * A DTO representing an authentication response.
 *
 * @param accessToken the access token issued upon successful authentication.
 * @author Danyal Shah
 */
public record AuthenticationResponseDto(String accessToken) {
}
