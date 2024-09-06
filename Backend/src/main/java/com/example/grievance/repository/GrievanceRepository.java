package com.example.grievance.repository;

import com.example.grievance.Entity.Grievance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievance,String> {
    Optional<Grievance> findByTicketNumber(String ticketNumber);

    void deleteByTicketNumber(String ticketNumber);
}
