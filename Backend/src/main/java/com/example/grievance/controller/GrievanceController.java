package com.example.grievance.controller;

import com.example.grievance.DTO.AssigneeDTO;
import com.example.grievance.DTO.GrievanceDTO;
import com.example.grievance.DTO.ResponseDTO;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
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
    public ResponseEntity<Map<String, Object>> createGrievance(@RequestBody GrievanceDTO grievanceDTO) {
        Grievance grievance = convertToEntity(grievanceDTO);
        Grievance savedGrievance = grievanceService.createGrievance(grievance);
        return createResponse(convertToDTO(savedGrievance), HttpStatus.CREATED);
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addGrievance(@RequestBody Grievance grievance) {
        Grievance savedGrievance = grievanceService.saveGrievance(grievance);
        return createResponse(convertToDTO(savedGrievance), HttpStatus.CREATED);
    }

    @PostMapping("/{ticketNumber}/assign")
    public ResponseEntity<String> assignGrievance(@PathVariable String ticketNumber, @RequestBody Map<String, UUID> request) {
        UUID assigneeId = request.get("assigneeId");
        try {
            grievanceService.assignGrievance(ticketNumber, assigneeId);
            return ResponseEntity.ok("Assignee updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update assignee");
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllGrievances() {
        List<Grievance> grievances = grievanceService.getAllGrievances();
        List<GrievanceDTO> grievanceDTOs = grievances.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return createResponse(grievanceDTOs, HttpStatus.OK);
    }

    @GetMapping("/{ticketNumber}")
    public ResponseEntity<Map<String, Object>> getGrievanceByTicketNumber(@PathVariable String ticketNumber) {
        Optional<Grievance> grievance = grievanceService.getGrievanceByTicketNumber(ticketNumber);
        return grievance.map(g -> createResponse(convertToDTO(g), HttpStatus.OK))
                .orElseGet(() -> createErrorResponse("Grievance not found", HttpStatus.NOT_FOUND));
    }

    @GetMapping("/assignees")
    public ResponseEntity<Map<String, Object>> getAssignees() {
        List<Users> assignees = userRepository.findByRole("assignee");
        List<ResponseDTO> responseDTOs = assignees.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
        return createResponse(responseDTOs, HttpStatus.OK);
    }

    @PutMapping("/{ticketNumber}")
    public ResponseEntity<Map<String, Object>> updateGrievance(@PathVariable String ticketNumber, @RequestBody GrievanceDTO grievanceDTO) {
        Grievance grievanceDetails = convertToEntity(grievanceDTO);
        Grievance updatedGrievance = grievanceService.updateGrievance(ticketNumber, grievanceDetails);
        return updatedGrievance != null
                ? createResponse(convertToDTO(updatedGrievance), HttpStatus.OK)
                : createErrorResponse("Grievance not found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{ticketNumber}/status")
    public ResponseEntity<Map<String, Object>> updateStatus(@PathVariable String ticketNumber, @RequestBody StatusUpdateRequest request) {
        try {
            grievanceService.updateGrievanceStatus(ticketNumber, request.getStatus());
            return createResponse("Status updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return createErrorResponse("Failed to update status", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{ticketNumber}/assign")
    public ResponseEntity<Map<String, Object>> allotAssignee(@PathVariable String ticketNumber, @RequestBody AssigneeDTO request) {
        Grievance updatedGrievance = grievanceService.assignGrievance(ticketNumber, request.getAssigneeId());
        return updatedGrievance != null
                ? createResponse(convertToDTO(updatedGrievance), HttpStatus.OK)
                : createErrorResponse("Grievance not found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{ticketNumber}")
    public ResponseEntity<Void> deleteGrievance(@PathVariable String ticketNumber) {
        grievanceService.deleteGrievance(ticketNumber);
        return ResponseEntity.noContent().build();
    }

    private ResponseEntity<Map<String, Object>> createResponse(Object data, HttpStatus status) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status.value());
        response.put("statusMessage", status.getReasonPhrase());
        response.put("data", data);
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.status(status).body(response);
    }

    private ResponseEntity<Map<String, Object>> createErrorResponse(String message, HttpStatus status) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status.value());
        response.put("statusMessage", status.getReasonPhrase());
        response.put("message", message);
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.status(status).body(response);
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
        grievance.setCreatedAt(grievanceDTO.getCreatedAt());
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

    private ResponseDTO convertToResponseDTO(Users user) {
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setId(user.getId());
        responseDTO.setName(user.getName());
        responseDTO.setEmail(user.getEmail());
        responseDTO.setPhoneNumber(user.getPhoneNumber());
        responseDTO.setAddress(user.getAddress());
        responseDTO.setUsername(user.getUsername());
        responseDTO.setRole(user.getRole());
        responseDTO.setDepartment(user.getDepartment());
        return responseDTO;
    }
}
