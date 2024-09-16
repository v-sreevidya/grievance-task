package com.example.grievance.Service;

import com.example.grievance.Entity.Grievance;
import com.example.grievance.Entity.Users;  // Ensure Users entity is imported
import com.example.grievance.repository.GrievanceRepository;
import com.example.grievance.repository.UserRepository;  // Ensure UserRepository is imported
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GrievanceService {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @Autowired
    private UserRepository userRepository;  // Inject UserRepository

    // Save a grievance
    public Grievance saveGrievance(Grievance grievance) {
        return grievanceRepository.save(grievance);
    }

    // Create a new grievance with a specific status and ticket number
    public Grievance createGrievance(Grievance grievance) {
        grievance.setCreatedAt(LocalDate.now());
        grievance.setUpdatedAt(LocalDateTime.now());

        if (grievance.getStatus() == null || grievance.getStatus().isEmpty()) {
            grievance.setStatus("PENDING");
        }

        if (grievance.getTicketNumber() == null || grievance.getTicketNumber().isEmpty()) {
            grievance.setTicketNumber(generateTicketNumber());
        }

        return grievanceRepository.save(grievance);
    }

    // Retrieve all grievances
    public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAll();
    }

    // Retrieve a grievance by its ticket number
    public Optional<Grievance> getGrievanceByTicketNumber(String ticketNumber) {
        return grievanceRepository.findByTicketNumber(ticketNumber);
    }

    // Update an existing grievance
    public Grievance updateGrievance(String ticketNumber, Grievance grievanceDetails) {
        Grievance grievance = grievanceRepository.findByTicketNumber(ticketNumber)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        grievance.setName(grievanceDetails.getName());
        grievance.setEmail(grievanceDetails.getEmail());
        grievance.setReason(grievanceDetails.getReason());
        grievance.setDescription(grievanceDetails.getDescription());
        grievance.setPhoneNumber(grievanceDetails.getPhoneNumber());
        grievance.setAddress(grievanceDetails.getAddress());

        String status = grievanceDetails.getStatus();
        if (isValidStatus(status)) {
            grievance.setStatus(status);
        } else {
            throw new IllegalArgumentException("Invalid status: " + status);
        }

        grievance.setUpdatedAt(LocalDateTime.now());
        return grievanceRepository.save(grievance);
    }

    // Update the status of a grievance
    public Grievance updateGrievanceStatus(String ticketNumber, String status) {
        Grievance grievance = grievanceRepository.findByTicketNumber(ticketNumber)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        if (isValidStatus(status)) {
            grievance.setStatus(status);
            grievance.setUpdatedAt(LocalDateTime.now());
            return grievanceRepository.save(grievance);
        } else {
            throw new IllegalArgumentException("Invalid status: " + status);
        }
    }

//    public void assignGrievance(String ticketNumber, String assigneeId) {
//        Grievance grievance = grievanceRepository.findByTicketNumber(ticketNumber);
//        if (grievance != null) {
//            grievance.setAssigneeId(Integer.parseInt(assigneeId)); // assuming assigneeId is int
//            grievanceRepository.save(grievance);
//        } else {
//            throw new EntityNotFoundException("Grievance not found");
//        }
//    }


    public Grievance assignGrievance(String ticketNumber, Integer assigneeId) {
        Grievance grievance = grievanceRepository.findByTicketNumber(ticketNumber)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        Users assignee = userRepository.findById(assigneeId)
                .orElseThrow(() -> new RuntimeException("Assignee not found"));

        grievance.setAssignee(assignee);  // Assuming `assignee` field exists in Grievance entity
        grievance.setUpdatedAt(LocalDateTime.now());
        return grievanceRepository.save(grievance);
    }
    public Grievance assignGrievance(String ticketNumber, String assigneeId) {
        Optional<Grievance> grievanceOpt = grievanceRepository.findByTicketNumber(ticketNumber);
        if (grievanceOpt.isPresent()) {
            Grievance grievance = grievanceOpt.get();
            grievance.setAssigneeId(assigneeId); // Set the new assigneeId
            grievance.setStatus("INPROGRESS");  // Update status if needed
            return grievanceRepository.save(grievance);  // Save the updated grievance
        }
        return null;
    }


    // Delete a grievance by its ticket number
    public void deleteGrievance(String ticketNumber) {
        grievanceRepository.deleteByTicketNumber(ticketNumber);
    }

    // Validate if the status is acceptable
    private boolean isValidStatus(String status) {
        return status.equals("CLOSED") ||
                status.equals("RESOLVED") ||
                status.equals("PENDING") ||
                status.equals("OPEN") ||
                status.equals("INPROGRESS");
    }

    // Generate a unique ticket number
    private String generateTicketNumber() {
        return UUID.randomUUID().toString();
    }

    public Grievance assignGrievance(String ticketNumber, String assigneeName, String department) {
        return null;
    }
}
