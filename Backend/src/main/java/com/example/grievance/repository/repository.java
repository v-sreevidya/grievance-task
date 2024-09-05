package com.example.grievance.Repository;

import com.example.grievance.Entity.Grievance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievance, String> {

    // Custom method to find grievance by ticket_no
    Optional<Grievance> findByTicketNo(String ticketNo);
}
