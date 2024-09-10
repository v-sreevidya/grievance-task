import javax.persistence.*;

@Entity
@Table(name = "assignee_grievances")
public class AssigneeGrievance {

    @Column(name = "ticket_number", nullable = false, unique = true)
    private String ticketNumber;

    @ManyToOne
    @JoinColumn(name = "grievance_id", nullable = false)
    private Grievance grievance;

    @Column(name = "assignee_id", nullable = false)
    private Long assigneeId;  // Replace Assignee object with assigneeId

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private GrievanceStatus status;

    @Column(name = "resolution_feedback", length = 500)
    private String resolutionFeedback;

    @Enumerated(EnumType.STRING)
    @Column(name = "assignee_type", nullable = false)
    private AssigneeType assigneeType;  // New field for assignee type

    // Getters and Setters

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public Grievance getGrievance() {
        return grievance;
    }

    public void setGrievance(Grievance grievance) {
        this.grievance = grievance;
    }

    public Long getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(Long assigneeId) {
        this.assigneeId = assigneeId;
    }

    public GrievanceStatus getStatus() {
        return status;
    }

    public void setStatus(GrievanceStatus status) {
        this.status = status;
    }

    public String getResolutionFeedback() {
        return resolutionFeedback;
    }

    public void setResolutionFeedback(String resolutionFeedback) {
        this.resolutionFeedback = resolutionFeedback;
    }

    public AssigneeType getAssigneeType() {
        return assigneeType;
    }

    public void setAssigneeType(AssigneeType assigneeType) {
        this.assigneeType = assigneeType;
    }
}
