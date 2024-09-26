package com.example.grievance.DTO;

public class AssigneeDTO {
    private int assigneeId;
    private String name;
    private String email;
    private String ticketNumber;

    
    public int getAssigneeId() {
        return assigneeId;
    }

   
    public void setAssigneeId(int assigneeId) {
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
