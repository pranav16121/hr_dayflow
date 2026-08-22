function Payroll() {
  return (
    <div className="page">

      <div className="page-header">
        <div>
          <h1>Payroll</h1>
          <p>View your salary and payroll information.</p>
        </div>

        <div className="month-card">
          <span>Current month</span>
          <strong>August 2026</strong>
        </div>
      </div>

      {/* Salary Summary */}
      <div className="stats-grid">

        <div className="card">
          <p className="card-label">Net Salary</p>
          <h2>₹58,500</h2>
          <p className="card-subtext">This month</p>
        </div>

        <div className="card">
          <p className="card-label">Gross Salary</p>
          <h2>₹65,000</h2>
          <p className="card-subtext">Before deductions</p>
        </div>

        <div className="card">
          <p className="card-label">Deductions</p>
          <h2>₹6,500</h2>
          <p className="card-subtext">This month</p>
        </div>

        <div className="card">
          <p className="card-label">Next Payroll</p>
          <h2>7 Days</h2>
          <p className="card-subtext">Until payment</p>
        </div>

      </div>

      {/* Current Payslip */}
      <div className="card">

        <div className="section-header">
          <div>
            <h2>August 2026 Payslip</h2>
            <p>Your salary breakdown for this month.</p>
          </div>

          <button className="primary-button">
            Download Payslip
          </button>
        </div>

        <div className="payroll-details">

          <div className="payroll-column">
            <h3>Earnings</h3>

            <div className="payroll-row">
              <span>Basic Salary</span>
              <strong>₹40,000</strong>
            </div>

            <div className="payroll-row">
              <span>House Rent Allowance</span>
              <strong>₹15,000</strong>
            </div>

            <div className="payroll-row">
              <span>Special Allowance</span>
              <strong>₹10,000</strong>
            </div>

            <div className="payroll-row total">
              <span>Gross Salary</span>
              <strong>₹65,000</strong>
            </div>
          </div>

          <div className="payroll-column">
            <h3>Deductions</h3>

            <div className="payroll-row">
              <span>Provident Fund</span>
              <strong>₹4,800</strong>
            </div>

            <div className="payroll-row">
              <span>Professional Tax</span>
              <strong>₹200</strong>
            </div>

            <div className="payroll-row">
              <span>Other Deductions</span>
              <strong>₹1,500</strong>
            </div>

            <div className="payroll-row total">
              <span>Total Deductions</span>
              <strong>₹6,500</strong>
            </div>
          </div>

        </div>

        <div className="net-salary">
          <span>Net Salary</span>
          <strong>₹58,500</strong>
        </div>

      </div>

      {/* Payroll History */}
      <div className="card">

        <div className="section-header">
          <div>
            <h2>Payroll History</h2>
            <p>Your recent salary payments.</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table>

            <thead>
              <tr>
                <th>Month</th>
                <th>Gross Salary</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>August 2026</td>
                <td>₹65,000</td>
                <td>₹6,500</td>
                <td>₹58,500</td>
                <td>
                  <span className="status approved">
                    Processing
                  </span>
                </td>
              </tr>

              <tr>
                <td>July 2026</td>
                <td>₹65,000</td>
                <td>₹6,500</td>
                <td>₹58,500</td>
                <td>
                  <span className="status approved">
                    Paid
                  </span>
                </td>
              </tr>

              <tr>
                <td>June 2026</td>
                <td>₹65,000</td>
                <td>₹6,500</td>
                <td>₹58,500</td>
                <td>
                  <span className="status approved">
                    Paid
                  </span>
                </td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}

export default Payroll;