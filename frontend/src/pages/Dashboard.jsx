function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Good morning, Employee</h1>
          <p>Here’s what’s happening with your work today.</p>
        </div>

        <div className="date">
          Friday, 22 August 2026
        </div>
      </div>

      <div className="dashboard-cards">

        <div className="card">
          <h3>Attendance</h3>
          <p className="card-value">Present</p>
          <span>Today</span>
        </div>

        <div className="card">
          <h3>Working Hours</h3>
          <p className="card-value">8h 24m</p>
          <span>Today</span>
        </div>

        <div className="card">
          <h3>Leave Balance</h3>
          <p className="card-value">12 Days</p>
          <span>Remaining</span>
        </div>

        <div className="card">
          <h3>Next Payroll</h3>
          <p className="card-value">7 Days</p>
          <span>Until payment</span>
        </div>

      </div>

      <div className="dashboard-section">

        <div className="section-card">
          <h2>Today's Attendance</h2>

          <div className="attendance-row">
            <div>
              <strong>Check-in</strong>
              <p>09:02 AM</p>
            </div>

            <div>
              <strong>Check-out</strong>
              <p>Not checked out</p>
            </div>

            <button>Check Out</button>
          </div>
        </div>

        <div className="section-card">
          <h2>Quick Actions</h2>

          <div className="quick-actions">
            <button>Apply Leave</button>
            <button>View Attendance</button>
            <button>View Payroll</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;