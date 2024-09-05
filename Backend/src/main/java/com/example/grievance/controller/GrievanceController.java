package com.example.grievance.controller;

import com.example.grievance.DTO.GrievanceDTO;
import com.example.grievance.Entity.Grievance;
import com.example.grievance.Service.GrievanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/grievances")
public class GrievanceController {

    @Autowired
    private GrievanceService grievanceService;

    @PostMapping("/add")
    public ResponseEntity<GrievanceDTO> createGrievance(@RequestBody GrievanceDTO grievanceDTO) {
        Grievance grievance = convertToEntity(grievanceDTO);
        Grievance savedGrievance = grievanceService.createGrievance(grievance);
        GrievanceDTO savedGrievanceDTO = convertToDTO(savedGrievance);
        return ResponseEntity.ok(savedGrievanceDTO);
    }

    @GetMapping
    public List<GrievanceDTO> getAllGrievances() {
        List<Grievance> grievances = grievanceService.getAllGrievances();
        return grievances.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrievanceDTO> getGrievanceById(@PathVariable int id) {
        Optional<Grievance> grievance = grievanceService.getGrievanceById(id);
        return grievance.map(g -> ResponseEntity.ok(convertToDTO(g)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GrievanceDTO> updateGrievance(@PathVariable int id, @RequestBody GrievanceDTO grievanceDTO) {
        Grievance grievanceDetails = convertToEntity(grievanceDTO);
        Grievance updatedGrievance = grievanceService.updateGrievance(id, grievanceDetails);
        GrievanceDTO updatedGrievanceDTO = convertToDTO(updatedGrievance);
        return ResponseEntity.ok(updatedGrievanceDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrievance(@PathVariable int id) {
        grievanceService.deleteGrievance(id);
        return ResponseEntity.noContent().build();
    }

    // Conversion methods between DTO and Entity

    private Grievance convertToEntity(GrievanceDTO grievanceDTO) {
        Grievance grievance = new Grievance();
        grievance.setId(grievanceDTO.getId());
        grievance.setName(grievanceDTO.getName());
        grievance.setEmail(grievanceDTO.getEmail());
        grievance.setReason(grievanceDTO.getReason());
        grievance.setDescription(grievanceDTO.getDescription());
        
        grievance.setStatus(grievanceDTO.getStatus());
        grievance.setCreatedAt(grievanceDTO.getCreatedAt());
        grievance.setUpdatedAt(grievanceDTO.getUpdatedAt());
        return grievance;
    }

    private GrievanceDTO convertToDTO(Grievance grievance) {
        GrievanceDTO grievanceDTO = new GrievanceDTO();
        grievanceDTO.setId(grievance.getId());
        grievanceDTO.setName(grievance.getName());
        grievanceDTO.setEmail(grievance.getEmail());
        grievanceDTO.setReason(grievance.getReason());
        grievanceDTO.setDescription(grievance.getDescription());

        grievanceDTO.setStatus(grievance.getStatus());
        grievanceDTO.setCreatedAt(grievance.getCreatedAt());
        grievanceDTO.setUpdatedAt(grievance.getUpdatedAt());
        return grievanceDTO;
    }
}
