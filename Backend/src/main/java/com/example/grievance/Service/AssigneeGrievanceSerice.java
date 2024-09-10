import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import com.example.grievance.entity.AssigneeGrievance;
import com.example.grievance.entity.GrievanceStatus;
import com.example.grievance.entity.AssigneeType;
import com.example.grievance.exception.GrievanceNotFoundException;
import com.example.grievance.repository.AssigneeGrievanceRepository;

@Service
public class AssigneeGrievanceService {

    @Autowired
    private AssigneeGrievanceRepository repository;

    // Get all grievances assigned to a specific assignee by assigneeId
    public List<AssigneeGrievanceDTO> getAllAssignedGrievances(Long assigneeId) {
        return repository.findByAssigneeId(assigneeId).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    // Update grievance resolution and status
    public void updateGrievanceResolution(AssigneeGrievanceDTO grievanceDTO) {
        AssigneeGrievance grievance = repository.findByTicketNumber(grievanceDTO.getTicketNumber())
                .orElseThrow(() -> new GrievanceNotFoundException("Grievance not found with ticket number: " + grievanceDTO.getTicketNumber()));

        grievance.setStatus(GrievanceStatus.valueOf(grievanceDTO.getStatus()));
        grievance.setResolutionFeedback(grievanceDTO.getResolutionFeedback());
        grievance.setAssigneeType(grievanceDTO.getAssigneeType());  // Update the assignee type if needed

        repository.save(grievance);
    }

    // Convert AssigneeGrievance entity to DTO
    private AssigneeGrievanceDTO convertToDTO(AssigneeGrievance grievance) {
        AssigneeGrievanceDTO dto = new AssigneeGrievanceDTO();
        dto.setTicketNumber(grievance.getTicketNumber());  // Set ticket number instead of id
        dto.setGrievanceId(grievance.getGrievance().getId());
        dto.setAssigneeId(grievance.getAssigneeId());
        dto.setStatus(grievance.getStatus().toString());
        dto.setResolutionFeedback(grievance.getResolutionFeedback());
        dto.setAssigneeType(grievance.getAssigneeType());
        return dto;
    }
}
