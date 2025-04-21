package danyal.fyp.awd.service.user;

import danyal.fyp.awd.model.user.Role;
import danyal.fyp.awd.repository.user.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

/**
 * Service class for managing roles in the system.
 * This service provides methods for retrieving roles by their name from the database.
 *
 * @author Danyal Shah
 */
@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    /**
     * Retrieves a {@link Role} entity by its name.
     * If the role does not exist in the database, an {@link NoSuchElementException} will be thrown.
     *
     * @param role the name of the role to retrieve.
     * @return the {@link Role} corresponding to the specified role name.
     */
    public Role getRole(String role) {
        return roleRepository.findByName(role).get();
    }
}
