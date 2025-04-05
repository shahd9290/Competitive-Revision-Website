package danyal.fyp.awd.model.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import danyal.fyp.awd.model.subject.Topic;
import danyal.fyp.awd.service.user.JpaUserDetails;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Represents a user entity in the system.
 *
 * <p>This entity is mapped to the {@code users} table and includes user details,
 * qualification ID, and associated refresh tokens.</p>
 *
 * @author Danyal Shah
 */
@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class User {

    /**
     * The unique identifier for the user.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /**
     * The unique username of the user.
     */
    @Column(nullable = false, unique = true)
    private String username;

    /**
     * The unique email address of the user.
     */
    @Column(nullable = false, unique = true)
    private String email;

    /**
     * The encrypted password of the user.
     */
    @Column(nullable = false)
    private String password;

    /**
     * The number of marks the user may have.
     */
    @Column(nullable = false)
    private int marks;

    /**
     * The timestamp of when the user was created.
     */
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private Instant createdAt;

    /**
     * The timestamp of the last update to the user's information.
     */
    @Column(name = "updated_at")
    @LastModifiedDate
    private Instant updatedAt;

    /**
     * The ID of the qualification associated with the user.
     */
    @JoinColumn(name = "qualification_id", table = "qualifications", nullable = true)
    private Integer qualificationId;

    /**
     * The list of refresh tokens associated with the user.
     */
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RefreshToken> refreshTokens = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public JpaUserDetails toJpaUserDetails() {
        List<GrantedAuthority> authorities = roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
        return new JpaUserDetails(getUsername(), getPassword(), authorities);
    }

    public void setRole(Role role) {
        if (!roles.isEmpty()) { // Overwrite existing role
            roles.remove(roles.iterator().next());
        }
        roles.add(role);
    }

    public Role getRole() {
        return roles.stream().findFirst().get();
    }
}

