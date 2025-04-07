package danyal.fyp.awd.service.user;

import danyal.fyp.awd.model.user.Role;
import danyal.fyp.awd.repository.user.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;


    public Role getRole(String role) {
        return roleRepository.findByName(role).get();
    }
}
