package com.example.grievance.Entity;

import java.time.LocalDateTime;

public class Grievance {
    private int ticketNo;
    private String name;
    private String email;
    private String reason;
    private String description;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters and Setters
    public int getTicketNo() {
        return ticketNo;
    }

    public void setTicketNo(int ticketNo) {
        this.ticketNo = ticketNo;
    }

    // Other getters and setters remain the same
}
