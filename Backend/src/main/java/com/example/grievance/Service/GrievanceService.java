package com.example.grievance.Service;

import com.example.grievance.Entity.Grievance;
import com.example.grievance.Repository.GrievanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GrievanceService {

    @Autowired
    private GrievanceRepository grievanceRepository;

    // Create a new grievance
    public Grievance createGrievance(Grievance grievance) {
        return grievanceRepository.save(grievance);
    }

    // Retrieve all grievances
    public List<Grievance> getAllGrievances() {
        return grievanceRepository.findAll();
    }

    // Retrieve grievance by ticket_no
    public Optional<Grievance> getGrievanceByTicketNo(String ticketNo) {
        return grievanceRepository.findByTicketNo(ticketNo);
    }

    // Update an existing grievance
    public Grievance updateGrievance(String ticketNo, Grievance grievanceDetails) {
        Optional<Grievance> grievanceOptional = grievanceRepository.findByTicketNo(ticketNo);
        if (grievanceOptional.isPresent()) {
            Grievance grievance = grievanceOptional.get();
            grievance.setName(grievanceDetails.getName());
            grievance.setEmail(grievanceDetails.getEmail());
            grievance.setReason(grievanceDetails.getReason());
            grievance.setDescription(grievanceDetails.getDescription());
            grievance.setStatus(grievanceDetails.getStatus());
            grievance.setUpdatedAt(grievanceDetails.getUpdatedAt());
            return grievanceRepository.save(grievance);
        }
        throw new RuntimeException("Grievance with ticket_no: " + ticketNo + " not found");
    }

    // Delete grievance by ticket_no
    public void deleteGrievance(String ticketNo) {
        Optional<Grievance> grievanceOptional = grievanceRepository.findByTicketNo(ticketNo);
        grievanceOptional.ifPresent(grievanceRepository::delete);
    }
}
