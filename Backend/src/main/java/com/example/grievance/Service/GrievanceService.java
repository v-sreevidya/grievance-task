package com.example.grievance.Service;

import com.example.grievance.Entity.Grievance;
import com.example.grievance.Entity.Users;  
import com.example.grievance.repository.GrievanceRepository;
import com.example.grievance.repository.UserRepository;
import jakarta.transaction.Transactional;
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
    private UserRepository userRepository;  

    // Save  grievance
    public Grievance saveGrievance(Grievance grievance) {
        return grievanceRepository.save(grievance);
    }

    // Create new grievance with specific status and ticket number
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

   
    public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAll();
    }

   
    public Optional<Grievance> getGrievanceByTicketNumber(String ticketNumber) {
        return grievanceRepository.findByTicketNumber(ticketNumber);
    }

    
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




    public Grievance assignGrievance(String ticketNumber, UUID assigneeId) {
        Grievance grievance = grievanceRepository.findByTicketNumber(ticketNumber)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        Users assignee = userRepository.findById(assigneeId)
                .orElseThrow(() -> new RuntimeException("Assignee not found"));

        grievance.setAssignee(assignee);  
        grievance.setUpdatedAt(LocalDateTime.now());
        return grievanceRepository.save(grievance);
    }
    //Assigns grievance to an assignee
    public Grievance assignGrievance(String ticketNumber, String assigneeId) {
        Optional<Grievance> grievanceOpt = grievanceRepository.findByTicketNumber(ticketNumber);
        if (grievanceOpt.isPresent()) {
            Grievance grievance = grievanceOpt.get();
            grievance.setAssigneeId(assigneeId);
            grievance.setStatus("INPROGRESS");  
            return grievanceRepository.save(grievance); 
        }
        return null;
    }


    @Transactional
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
