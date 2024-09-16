package com.example.grievance.Service;

import com.example.grievance.Entity.Notification;
import com.example.grievance.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // Method to send a notification to the supervisor
    public void sendNotificationToSupervisor(String message) {
        // Assuming the supervisor is a fixed recipient or identified by ID/email
        String supervisor = "supervisor@grwmstore.com";  // Or dynamically fetch supervisor info

        Notification notification = new Notification(message, supervisor);
        notificationRepository.save(notification);

        // Additional logic for sending actual notification (e.g., email, push notification, etc.)
    }
}
