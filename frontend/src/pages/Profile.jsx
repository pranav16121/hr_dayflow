function Profile() {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>My Profile</h1>
          <p>View and manage your employee information.</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-card profile-main">
          <div className="profile-avatar">
            EM
          </div>

          <h2>Employee Name</h2>
          <p className="profile-role">Software Developer</p>

          <div className="profile-status">
            Active
          </div>
        </div>

        <div className="profile-card">
          <h2>Personal Information</h2>

          <div className="info-grid">
            <div className="info-item">
              <span>Full Name</span>
              <strong>Employee Name</strong>
            </div>

            <div className="info-item">
              <span>Employee ID</span>
              <strong>EMP001</strong>
            </div>

            <div className="info-item">
              <span>Email</span>
              <strong>employee@dayflow.com</strong>
            </div>

            <div className="info-item">
              <span>Phone</span>
              <strong>+91 98765 43210</strong>
            </div>

            <div className="info-item">
              <span>Department</span>
              <strong>Engineering</strong>
            </div>

            <div className="info-item">
              <span>Designation</span>
              <strong>Software Developer</strong>
            </div>

            <div className="info-item">
              <span>Joining Date</span>
              <strong>01 January 2026</strong>
            </div>

            <div className="info-item">
              <span>Manager</span>
              <strong>Manager Name</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;