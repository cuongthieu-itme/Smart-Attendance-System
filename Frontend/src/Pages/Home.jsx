import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <section className="home-section">
      <div className="container">
        <main>
          <div className="section-login">
            <div className="grid grid-two-cols">
              <div className="home-content">
                <h1 className="font-bold text-5xl text-white mb-12 ">
                  Chào mừng đến với Hệ thống Điểm danh Thông minh!
                </h1>
                <p className="text-white text-3xl mb-10">
                  Hệ thống này tận dụng sức mạnh của thị giác máy tính và học máy
                  để tự động hóa quy trình điểm danh. Bằng cách sử dụng webcam
                  để chụp ảnh sinh viên, hệ thống có thể nhận diện khuôn mặt
                  và tự động điểm danh.
                </p>
                <p className="text-white text-2xl">
                  Điều này không chỉ tiết kiệm thời gian mà còn giảm thiểu sai sót
                  và đảm bảo ghi chép chính xác.
                </p>
              </div>
              <div className="login-image">
                <img
                  src="/images/design.png"
                  width="400"
                  height="500"
                  alt="Login"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Home;
