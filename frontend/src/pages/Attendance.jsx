function Attendance() {
  const attendanceRecords = [
    {
      date: "22 Aug 2026",
      day: "Friday",
      checkIn: "09:02 AM",
      checkOut: "Not checked out",
      hours: "8h 24m",
      status: "Present",
    },
    {
      date: "21 Aug 2026",
      day: "Thursday",
      checkIn: "08:57 AM",
      checkOut: "05:31 PM",
      hours: "8h 34m",
      status: "Present",
    },
    {
      date: "20 Aug 2026",
      day: "Wednesday",
      checkIn: "09:11 AM",
      checkOut: "05:42 PM",
      hours: "8h 31m",
      status: "Present",
    },
    {
      date: "19 Aug 2026",
      day: "Tuesday",
      checkIn: "09:05 AM",
      checkOut: "05:20 PM",
      hours: "8h 15m",
      status: "Present",
    },
    {
      date: "18 Aug 2026",
      day: "Monday",
      checkIn: "09:18 AM",
      checkOut: "05:27 PM",
      hours: "8h 09m",
      status: "Present",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 md:px-12">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Attendance
          </h1>
          <p className="mt-2 text-lg text-slate-500">
            Track your daily attendance and working hours.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white px-5 py-3">
          <p className="text-sm text-slate-500">Current month</p>
          <p className="font-semibold text-slate-900">August 2026</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Present Days</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">18</p>
          <p className="mt-1 text-sm text-slate-400">This month</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Absent Days</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">1</p>
          <p className="mt-1 text-sm text-slate-400">This month</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Average Hours</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            8h 22m
          </p>
          <p className="mt-1 text-sm text-slate-400">Per working day</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-sm text-slate-500">Attendance Rate</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">94.7%</p>
          <p className="mt-1 text-sm text-slate-400">This month</p>
        </div>
      </div>

      {/* Today's Attendance */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Today's Attendance
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Friday, 22 August 2026
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm text-slate-500">Check-in</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              09:02 AM
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Check-out</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              Not checked out
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Working Hours</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              8h 24m
            </p>
          </div>

          <div className="flex items-end">
            <button className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700">
              Check Out
            </button>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Attendance History
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Your recent attendance records.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Day
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Check-in
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Check-out
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Hours
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {attendanceRecords.map((record) => (
                <tr
                  key={record.date}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {record.date}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {record.day}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {record.checkIn}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {record.checkOut}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {record.hours}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {record.status}
                    </span>
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

export default Attendance;