import java.time.LocalDateTime;

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

    // Default constructor
    public NotificationDTO() {
    }

    // Getters and Setters

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }
}
