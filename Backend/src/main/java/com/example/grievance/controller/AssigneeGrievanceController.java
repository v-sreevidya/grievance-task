import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.grievance.dto.AssigneeGrievanceDTO;
import com.example.grievance.service.AssigneeGrievanceService;

@RestController
@RequestMapping("/api/assignee")
public class AssigneeGrievanceController {

    @Autowired
    private AssigneeGrievanceService service;

    // Endpoint to get all grievances assigned to a specific assignee
    @GetMapping("/{assigneeId}/grievances")
    public List<AssigneeGrievanceDTO> getAssignedGrievances(@PathVariable Long assigneeId) {
        return service.getAllAssignedGrievances(assigneeId);
    }

    // Endpoint to update the resolution of a grievance
    @PostMapping("/update-resolution")
    public ResponseEntity<String> updateGrievanceResolution(@RequestBody AssigneeGrievanceDTO grievanceDTO) {
        service.updateGrievanceResolution(grievanceDTO);
        return ResponseEntity.ok("Grievance status updated successfully");
    }
}
