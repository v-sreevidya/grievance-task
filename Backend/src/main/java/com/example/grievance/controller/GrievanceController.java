package com.example.grievance.controller;

import com.example.grievance.Entity.Grievance;
import com.example.grievance.Service.GrievanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/grievances")
public class GrievanceController {

    @Autowired
    private GrievanceService grievanceService;

    @PostMapping
    public Grievance createGrievance(@RequestBody Grievance grievance) {
        return grievanceService.createGrievance(grievance);
    }

    @GetMapping
    public List<Grievance> getAllGrievances() {
        return grievanceService.getAllGrievances();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Grievance> getGrievanceById(@PathVariable int id) {
        Optional<Grievance> grievance = grievanceService.getGrievanceById(id);
        return grievance.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Grievance> updateGrievance(@PathVariable int id, @RequestBody Grievance grievanceDetails) {
        Grievance updatedGrievance = grievanceService.updateGrievance(id, grievanceDetails);
        return ResponseEntity.ok(updatedGrievance);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrievance(@PathVariable int id) {
        grievanceService.deleteGrievance(id);
        return ResponseEntity.noContent().build();
    }
}
