package com.example.grievance.controller;

import com.example.grievance.DTO.AssigneeDTO;
import com.example.grievance.DTO.GrievanceDTO;
import com.example.grievance.DTO.StatusUpdateRequest;
import com.example.grievance.Entity.Grievance;
import com.example.grievance.Entity.Users;
import com.example.grievance.Service.GrievanceService;
import com.example.grievance.repository.UserRepository; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/grievances")
public class GrievanceController {

    @Autowired
    private GrievanceService grievanceService;

    @Autowired
    private UserRepository userRepository;  

    @PostMapping("/create")
    public ResponseEntity<GrievanceDTO> createGrievance(@RequestBody GrievanceDTO grievanceDTO) {
        Grievance grievance = convertToEntity(grievanceDTO);
        Grievance savedGrievance = grievanceService.createGrievance(grievance);
        GrievanceDTO savedGrievanceDTO = convertToDTO(savedGrievance);
        return ResponseEntity.ok(savedGrievanceDTO);
    }

    @PostMapping("/add")
    public ResponseEntity<Grievance> addGrievance(@RequestBody Grievance grievance) {
        Grievance savedGrievance = grievanceService.saveGrievance(grievance);
        return new ResponseEntity<>(savedGrievance, HttpStatus.CREATED);
    }

//    @PostMapping("/{ticketNumber}/assign")
//    public ResponseEntity<Grievance> assignGrievance(
//            @PathVariable String ticketNumber,
//            @RequestBody AssigneeDTO request) {  // Changed to AssigneeDTO
//
//        Grievance updatedGrievance = grievanceService.assignGrievance(ticketNumber, request.getAssigneeId());
//
//        return ResponseEntity.ok(updatedGrievance);
//    }

    @PostMapping("/{ticketNumber}/assign")
    public ResponseEntity<String> assignGrievance(@PathVariable String ticketNumber, @RequestBody Map<String, Integer> request) {
        Integer assigneeId = request.get("assigneeId");
        try {
            grievanceService.assignGrievance(ticketNumber, assigneeId);
            return ResponseEntity.ok("Assignee updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update assignee");
        }
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

    @GetMapping("/assignees")
    public List<Users> getAssignees() {
        return userRepository.findAll();  
    }

    @PutMapping("/{ticketNumber}")
    public ResponseEntity<GrievanceDTO> updateGrievance(@PathVariable String ticketNumber, @RequestBody GrievanceDTO grievanceDTO) {
        Grievance grievanceDetails = convertToEntity(grievanceDTO);
        Grievance updatedGrievance = grievanceService.updateGrievance(ticketNumber, grievanceDetails);
        GrievanceDTO updatedGrievanceDTO = convertToDTO(updatedGrievance);
        return ResponseEntity.ok(updatedGrievanceDTO);
    }

    @PutMapping("/{ticketNumber}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable String ticketNumber, @RequestBody StatusUpdateRequest request) {
        grievanceService.updateGrievanceStatus(ticketNumber, request.getStatus());
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{ticketNumber}/assign")
    public ResponseEntity<GrievanceDTO> allotAssignee(
            @PathVariable String ticketNumber,
            @RequestBody AssigneeDTO request) {  

        Grievance updatedGrievance = grievanceService.assignGrievance(ticketNumber, request.getAssigneeId());

        if (updatedGrievance != null) {
            GrievanceDTO updatedGrievanceDTO = convertToDTO(updatedGrievance);
            return ResponseEntity.ok(updatedGrievanceDTO); 
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  
        }
    }


    @DeleteMapping("/{ticketNumber}")
    public ResponseEntity<Void> deleteGrievance(@PathVariable String ticketNumber) {
        grievanceService.deleteGrievance(ticketNumber);
        return ResponseEntity.noContent().build();
    }

   

    private Grievance convertToEntity(GrievanceDTO grievanceDTO) {
        Grievance grievance = new Grievance();
        grievance.setTicketNumber(grievanceDTO.getTicketNumber());
        grievance.setName(grievanceDTO.getName());
        grievance.setEmail(grievanceDTO.getEmail());
        grievance.setReason(grievanceDTO.getReason());
        grievance.setDescription(grievanceDTO.getDescription());
        grievance.setPhoneNumber(grievanceDTO.getPhoneNumber());
        grievance.setAddress(grievanceDTO.getAddress());
        grievance.setStatus(grievanceDTO.getStatus());
        grievance.setCreatedAt(grievanceDTO.getCreatedAt());  // Assuming this is a String in DTO
        grievance.setUpdatedAt(grievanceDTO.getUpdatedAt());  // Assuming this is a String in DTO
        grievance.setAssigneeId(grievanceDTO.getAssigneeId());
        return grievance;
    }

    private GrievanceDTO convertToDTO(Grievance grievance) {
        GrievanceDTO grievanceDTO = new GrievanceDTO();
        grievanceDTO.setTicketNumber(grievance.getTicketNumber());
        grievanceDTO.setName(grievance.getName());
        grievanceDTO.setEmail(grievance.getEmail());
        grievanceDTO.setReason(grievance.getReason());
        grievanceDTO.setDescription(grievance.getDescription());
        grievanceDTO.setPhoneNumber(grievance.getPhoneNumber());
        grievanceDTO.setAddress(grievance.getAddress());
        grievanceDTO.setStatus(grievance.getStatus());
        grievanceDTO.setCreatedAt(grievance.getCreatedAt());
        grievanceDTO.setUpdatedAt(grievance.getUpdatedAt());
        grievanceDTO.setAssigneeId(grievance.getAssigneeId());
        return grievanceDTO;
    }
}
