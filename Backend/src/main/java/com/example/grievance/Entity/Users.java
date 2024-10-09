package com.example.grievance.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username")
})
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    @Column(nullable = false, unique = true)
    private String username;
    private String password;
    private String role;
    private String department;


}
