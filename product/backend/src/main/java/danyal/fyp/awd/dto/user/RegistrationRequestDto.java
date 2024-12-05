package danyal.fyp.awd.dto.user;

public record RegistrationRequestDto(
        String username,
        String email,
        String password,
        String qualification
) {
}
