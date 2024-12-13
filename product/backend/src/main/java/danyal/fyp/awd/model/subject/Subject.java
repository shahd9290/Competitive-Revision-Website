package danyal.fyp.awd.model.subject;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.HashSet;
import java.util.Set;

/**
 * Represents a subject entity in the system.
 *
 * @author Danyal Shah
 */
@Entity
@Table(name="subjects")
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Subject {

    /**
     * The unique identifier for the subject.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * The name of the subject.
     */
    @Column(nullable = false)
    private String name;

    /**
     * The qualifications associated with the subject.
     */
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="subject_qualification", joinColumns = @JoinColumn(name="subject_id"),
    inverseJoinColumns = @JoinColumn(name="qualification_id"))
    @JsonManagedReference
    private Set<Qualification> qualifications;

    /**
     * The topics associated with the subject.
     */
    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Topic> topics;

    /**
     * Adds a qualification to the subject.
     *
     * @param qualification the qualification to add.
     */
    public void addQualification(Qualification qualification) {
        qualifications.add(qualification);
    }

}
