import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import com.example.grievance.entity.AssigneeGrievance;

@Repository
public interface AssigneeGrievanceRepository extends JpaRepository<AssigneeGrievance, Long> {

    // Find all grievances assigned to a specific assignee by assigneeId
    List<AssigneeGrievance> findByAssigneeId(Long assigneeId);

    // Find a grievance by its ticket number
    Optional<AssigneeGrievance> findByTicketNumber(String ticketNumber);
}
