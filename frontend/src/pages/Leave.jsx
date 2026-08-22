function Leave() {
  const leaveRecords = [
    {
      type: "Casual Leave",
      from: "12 Aug 2026",
      to: "13 Aug 2026",
      days: 2,
      reason: "Personal work",
      status: "Approved",
    },
    {
      type: "Sick Leave",
      from: "04 Aug 2026",
      to: "04 Aug 2026",
      days: 1,
      reason: "Not feeling well",
      status: "Approved",
    },
    {
      type: "Casual Leave",
      from: "28 Aug 2026",
      to: "29 Aug 2026",
      days: 2,
      reason: "Family function",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 md:px-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900">
          Leave
        </h1>
        <p className="mt-2 text-lg text-slate-500">
          Manage your leave balance and leave requests.
        </p>
      </div>

      {/* Leave Balance */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Total Leave</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            24 Days
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Annual allocation
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Used Leave</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            7 Days
          </p>
          <p className="mt-1 text-sm text-slate-400">
            This year
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Remaining</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            17 Days
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Available
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Pending Requests</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            1
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Awaiting approval
          </p>
        </div>
      </div>

      {/* Apply Leave */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Apply for Leave
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Submit a new leave request.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Leave Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Leave Type
            </label>

            <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500">
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Earned Leave</option>
            </select>
          </div>

          {/* Number of Days */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Number of Days
            </label>

            <input
              type="number"
              min="1"
              placeholder="Enter number of days"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500"
            />
          </div>

          {/* From */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              From
            </label>

            <input
              type="date"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500"
            />
          </div>

          {/* To */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              To
            </label>

            <input
              type="date"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Reason */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Reason
            </label>

            <textarea
              rows="3"
              placeholder="Enter the reason for your leave..."
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700">
              Submit Leave Request
            </button>
          </div>
        </div>
      </div>

      {/* Leave History */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Leave History
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            View your previous and pending leave requests.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Leave Type
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  From
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  To
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Days
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Reason
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {leaveRecords.map((leave, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {leave.type}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {leave.from}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {leave.to}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {leave.days}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {leave.reason}
                  </td>

                  <td className="px-6 py-4">
                    {leave.status === "Approved" ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Approved
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leave;