import React from 'react'
import './NotificationUser.css'

function NotificationUser() {
  return (
    <div className='grievance-main-notification'>
      <div className="grievance-top-notification">
        <div className="top-section-notification">
          <div className='welcome_note'>
            <div className='note1'>Hi User,</div>
            <div className='note2'>Welcome to GRWM Store!</div>
          </div>
        </div>

        <div className='list_container'>
        <div className="title_bar_notification">
          <div className='title-notification'>Notifications</div>
        </div>
        <div class="horizontal-line-first"></div>
          <div className="notification-list">
              <div className="notificationbox">
                  <div className="notification-content">Your grievance [Ticket No: 123456] has been closed. If you have further concerns, please don't hesitate to reach out.</div>
                  <div className="notification-time">6.30pm</div>
              </div>
              <div class="horizontal-line-notification"></div>
              <div className="notificationbox">
                  <div className="notification-content">Good news! Your grievance [Ticket No: 123456] has been resolved. Please review the resolution.</div>
                  <div className="notification-time">6.30pm</div>
              </div>
              <div class="horizontal-line-notification"></div>
              <div className="notificationbox">
                  <div className="notification-content">Your grievance [Ticket No: 123456] is in progress. Our team is actively working on it</div>
                  <div className="notification-time">6.30pm</div>
              </div>
              <div class="horizontal-line-notification"></div>
              <div className="notificationbox">
                  <div className="notification-content">Your grievance [Ticket No: 123456] is now open. Our team is working on resolving your issue.</div>
                  <div className="notification-time">6.30pm</div>
              </div>
              <div class="horizontal-line-notification"></div>
              <div className="notificationbox">
                  <div className="notification-content">Your grievance [Ticket No: 123456] is now pending. Our team will start processing it soon.</div>
                  <div className="notification-time">6.30pm</div>
              </div>
              <div class="horizontal-line-notification"></div>
              <div className="notificationbox">
                  <div className="notification-content">Your grievance [Ticket No: 123456] has been successfully submitted. You can track its progress in the 'Grievances' section</div>
                  <div className="notification-time">6.30pm</div>
              </div>
          </div>
          <div class="horizontal-line-last" ></div>
        <div className="pagination">
          <button 
            className="pagination-button">
            &lt;
          </button>
          <span className="pagination-info">1 / 2</span>
          <button 
            className="pagination-button">
            &gt;
          </button>
        </div>
      </div>
    </div>
    </div>

  )
}

export default NotificationUser
