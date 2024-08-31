package com.example.grievance.Service;

import com.example.grievance.Entity.Grievance;
import com.example.grievance.repository.repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class GrievanceService {

    @Autowired
    private repository repository;

    // Create a new grievance with a specific status
    public Grievance createGrievance(Grievance grievance) {
        grievance.setCreatedAt(LocalDateTime.now());
        grievance.setUpdatedAt(LocalDateTime.now());
        if (grievance.getStatus() == null || grievance.getStatus().isEmpty()) {
            grievance.setStatus("Pending"); // Default status if not provided
        }
        return repository.save(grievance);
    }

    // Retrieve all grievances
    public List<Grievance> getAllGrievances() {
        return repository.findAll();
    }

    // Retrieve a grievance by its ID
    public Optional<Grievance> getGrievanceById(int id) {
        return repository.findById(id);
    }

    // Update an existing grievance
    public Grievance updateGrievance(int id, Grievance grievanceDetails) {
        Grievance grievance = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        grievance.setTitle(grievanceDetails.getTitle());
        grievance.setDescription(grievanceDetails.getDescription());

        // Update the status only if it's one of the allowed statuses
        String status = grievanceDetails.getStatus();
        if (isValidStatus(status)) {
            grievance.setStatus(status);
        } else {
            throw new IllegalArgumentException("Invalid status: " + status);
        }

        grievance.setUpdatedAt(LocalDateTime.now());
        return repository.save(grievance);
    }

    // Delete a grievance by its ID
    public void deleteGrievance(int id) {
        repository.deleteById(id);
    }

    // Helper method to validate grievance status
    private boolean isValidStatus(String status) {
        return status.equals("Closed") || 
               status.equals("Resolved") || 
               status.equals("Pending") || 
               status.equals("Open") || 
               status.equals("InProgress");
    }
}


