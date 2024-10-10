package com.example.grievance.Entity;

import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Grievance {

    @Id

    @Column(unique = true, nullable = false)
    private String ticketNumber;



    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String reason;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String address;



    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDate createdAt;

    @Column(nullable = false)
    private LocalDate updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDate.now();
        updatedAt = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDate.now();
    }

    @ManyToOne
    @JoinColumn(name = "assignee_id", referencedColumnName = "id")
    public Users assignee;

    public void setAssigneeId(String assigneeId) {
    }

    public String getAssigneeId() {
        return this.assignee != null ? this.assignee.getId().toString() : null;
    }









}

