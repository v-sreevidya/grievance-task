package com.example.grievance.DTO;

import java.util.UUID;

public class AssigneeDTO {
    private UUID assigneeId;
    private String name;
    private String email;
    private String ticketNumber;

    
    public UUID getAssigneeId() {
        return assigneeId;
    }

   
    public void setAssigneeId(UUID assigneeId) {
        this.assigneeId = assigneeId;
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

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }
}
