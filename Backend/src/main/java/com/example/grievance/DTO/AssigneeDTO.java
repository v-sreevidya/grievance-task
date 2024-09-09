package com.example.grievance.DTO;

public class AssigneeDTO {
    private String assigneeId;
    private String name;
    private String email;
    private String ticketNumber;

    // Getter for assigneeId
    public String getAssigneeId() {
        return assigneeId;
    }

    // Setter for assigneeId
    public void setAssigneeId(String assigneeId) {
        this.assigneeId = assigneeId;
    }

    // Getters and setters for the other fields
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
