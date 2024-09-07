package com.example.grievance.Service;

import com.example.grievance.Entity.Grievance;
import com.example.grievance.repository.GrievanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;  // Import for generating unique ticketNumber

@Service
public class GrievanceService {

    @Autowired
    private GrievanceRepository grievanceRepository;


    public Grievance saveGrievance(Grievance grievance) {
        return grievanceRepository.save(grievance);
    }

    // Create a new grievance with a specific status and ticket number
    public Grievance createGrievance(Grievance grievance) {
        System.out.println("Creating grievance: " + grievance);
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

    // Update an existing grievance
    public Grievance updateGrievance(String ticketNumber, Grievance grievanceDetails) {
        Grievance grievance = grievanceRepository.findByTicketNumber(ticketNumber)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        grievance.setName(grievanceDetails.getName());
        grievance.setEmail(grievanceDetails.getEmail());
        grievance.setReason(grievanceDetails.getReason());
        grievance.setDescription(grievanceDetails.getDescription());
        //grievance.setPhoneNumber(grievanceDetails.getPhoneNumber());


        String status = grievanceDetails.getStatus();
        if (isValidStatus(status)) {
            grievance.setStatus(status);
        } else {
            throw new IllegalArgumentException("Invalid status: " + status);
        }

        grievance.setUpdatedAt(LocalDateTime.now());
        return grievanceRepository.save(grievance);
    }


    public void deleteGrievance(String ticketNumber) {
        grievanceRepository.deleteByTicketNumber(ticketNumber);
    }


    private boolean isValidStatus(String status) {
        return status.equals("CLOSED") ||
                status.equals("RESOLVED") ||
                status.equals("PENDING") ||
                status.equals("OPEN") ||
                status.equals("INPROGRESS");
    }


    private String generateTicketNumber() {
        return UUID.randomUUID().toString();
    }
}
