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

