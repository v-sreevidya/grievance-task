package com.example.grievance.controller;

import com.example.grievance.DTO.AssigneeDTO;
import com.example.grievance.DTO.GrievanceDTO;
import com.example.grievance.Entity.Grievance;
import com.example.grievance.Service.GrievanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@CrossOrigin(origins = "http://localhost:3000")
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
    @PostMapping("/add")
    public ResponseEntity<Grievance> addGrievance(@RequestBody Grievance grievance) {
        Grievance savedGrievance = grievanceService.save(grievance);
        return new ResponseEntity<>(savedGrievance, HttpStatus.CREATED);
    }

    @PostMapping("/{ticketNumber}/assign")
    public ResponseEntity<String> assignGrievance(@PathVariable String ticketNumber, @RequestBody AssigneeDTO assigneeDTO) {
        // Logic to assign grievance
        return ResponseEntity.ok("Assignee updated successfully");
    }



    @GetMapping
    public List<GrievanceDTO> getAllGrievances() {
        List<Grievance> grievances = grievanceService.getAllGrievances();
        return grievances.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @GetMapping("/{ticketNumber}")
    public ResponseEntity<GrievanceDTO> getGrievanceByTicketNumber(@PathVariable String ticketNumber) {
        Optional<Grievance> grievance = grievanceService.getGrievanceByTicketNumber(ticketNumber);
        return grievance.map(g -> ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(convertToDTO(g)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @PutMapping("/{ticketNumber}")
    public ResponseEntity<GrievanceDTO> updateGrievance(@PathVariable String ticketNumber, @RequestBody GrievanceDTO grievanceDTO) {
        Grievance grievanceDetails = convertToEntity(grievanceDTO);
        Grievance updatedGrievance = grievanceService.updateGrievance(ticketNumber, grievanceDetails);
        GrievanceDTO updatedGrievanceDTO = convertToDTO(updatedGrievance);
        return ResponseEntity.ok(updatedGrievanceDTO);
    }

    @DeleteMapping("/{ticketNumber}")
    public ResponseEntity<Void> deleteGrievance(@PathVariable String ticketNumber) {
        grievanceService.deleteGrievance(ticketNumber);
        return ResponseEntity.noContent().build();
    }

    // Conversion methods between DTO and Entity

    private Grievance convertToEntity(GrievanceDTO grievanceDTO) {
        Grievance grievance = new Grievance();
        grievance.setTicketNumber(grievanceDTO.getTicketNumber());
        grievance.setTicketNumber(grievanceDTO.getTicketNumber());  // Added ticketNumber conversion
        grievance.setName(grievanceDTO.getName());
        grievance.setEmail(grievanceDTO.getEmail());
        grievance.setReason(grievanceDTO.getReason());
        grievance.setDescription(grievanceDTO.getDescription());
        grievance.setPhoneNumber(grievanceDTO.getPhoneNumber());
        grievance.setAddress(grievanceDTO.getAddress());

        grievance.setStatus(grievanceDTO.getStatus());
        grievance.setCreatedAt(grievanceDTO.getCreatedAt());
        grievance.setUpdatedAt(grievanceDTO.getUpdatedAt());
        return grievance;
    }

    private GrievanceDTO convertToDTO(Grievance grievance) {
        GrievanceDTO grievanceDTO = new GrievanceDTO();
        grievanceDTO.setTicketNumber(grievance.getTicketNumber());
        grievanceDTO.setTicketNumber(grievance.getTicketNumber());  // Added ticketNumber conversion
        grievanceDTO.setName(grievance.getName());
        grievanceDTO.setEmail(grievance.getEmail());
        grievanceDTO.setReason(grievance.getReason());
        grievanceDTO.setDescription(grievance.getDescription());
        grievanceDTO.setPhoneNumber(grievance.getPhoneNumber());
        grievanceDTO.setAddress(grievance.getAddress());

        grievanceDTO.setStatus(grievance.getStatus());
        grievanceDTO.setCreatedAt(grievance.getCreatedAt());
        grievanceDTO.setUpdatedAt(grievance.getUpdatedAt());
        return grievanceDTO;
    }
}
