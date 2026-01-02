import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/AttendanceDetailspage.css";

const AttendanceDetailspage = () => {
  const { id, date } = useParams();
  const [attendanceReport, setAttendanceReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceReport = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/user/getspecificreport",
          {
            classid: id,
            date,
          }
        );

        setAttendanceReport(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance report:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAttendanceReport();
  }, [id, date]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error.message}</div>;

  return (
    <div className="container">
      <div className=" attendance-details-page text-white">
        <h1 className="text-4xl">
          Báo cáo điểm danh ngày {new Date(date).toLocaleDateString()}
        </h1>
        {attendanceReport.map((sessionReport) => (
          <div key={sessionReport._id} className="session-report">
            <h2 className="text-2xl mt-6">Phiên {sessionReport.session}</h2>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Mã số sinh viên</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {sessionReport.attendance.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.roll_number}</td>
                    <td>{student.status ? "Có mặt" : "Vắng mặt"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceDetailspage;
