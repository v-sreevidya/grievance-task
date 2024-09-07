package com.example.grievance.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class GrievanceDTO {

//    private int id;
    private String ticketNumber;  // Added ticketNumber field
    private String name;
    private String email;
    private String reason;
    private String description;
    //private String phoneNumber;
    private String status;
    private LocalDate createdAt;
    private LocalDateTime updatedAt;

    // Getters and Setters

//    public int getId() {
//        return id;
//    }
//
//    public void setId(int id) {
//        this.id = id;
//    }

    public String getTicketNumber() {  // Getter for ticketNumber
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {  // Setter for ticketNumber
        this.ticketNumber = ticketNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }





    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
