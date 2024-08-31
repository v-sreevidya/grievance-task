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

    public Grievance createGrievance(Grievance grievance) {
        grievance.setCreatedAt(LocalDateTime.now());
        grievance.setUpdatedAt(LocalDateTime.now());
        grievance.setStatus("Closed");
        return repository.save(grievance);
    }

    public List<Grievance> getAllGrievances() {
        return repository.findAll();
    }

    public Optional<Grievance> getGrievanceById(int id) {
        return repository.findById(id);
    }

    public Grievance updateGrievance(int id, Grievance grievanceDetails) {
        Grievance grievance = repository.findById(id).orElseThrow(() -> new RuntimeException("Grievance not found"));

        grievance.setTitle(grievanceDetails.getTitle());


        grievance.setDescription(grievanceDetails.getDescription());
        grievance.setStatus(grievanceDetails.getStatus());
        grievance.setUpdatedAt(LocalDateTime.now());

        return repository.save(grievance);
    }

    public void deleteGrievance(int id) {
        repository.deleteById(id);
    }
}

