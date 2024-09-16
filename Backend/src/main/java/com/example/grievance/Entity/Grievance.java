package com.example.grievance.Entity;

import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Grievance {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
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
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDate.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "assignee_id", referencedColumnName = "id")
    public Users assignee;

    public void setAssigneeId(String assigneeId) {
    }

    public String getAssigneeId() {
        return this.assignee != null ? this.assignee.getId().toString() : null;
    }


//    @Column(name = "assignee_id")
//    private String assigneeId;






}

