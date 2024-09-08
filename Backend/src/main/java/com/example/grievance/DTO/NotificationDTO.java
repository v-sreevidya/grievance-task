public class NotificationDTO {
    
    private String ticketNumber;
    private String message;
    private String recipient;
    private LocalDateTime sentAt;
    
    // Constructor
    public NotificationDTO(String ticketNumber, String message, String recipient, LocalDateTime sentAt) {
        this.ticketNumber = ticketNumber;
        this.message = message;
        this.recipient = recipient;
        this.sentAt = sentAt;
    }
    
    // Getters and Setters
}

