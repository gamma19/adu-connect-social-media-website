import React from "react";
import "./About.css";
//import Header from "../components/header/Header";
//import Footer from "../components/footer/Footer";
import Biocard from "../components/card/biocard/Biocard";
//import EffectCard from "../components/swiper-js/EffectCard/EffectCard";
import Aboutcard from "../components/about-card/Aboutcard";

const About = () => {
  return (
    <>
      <html>
        <head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
            crossorigin="anonymous"
          ></link>
          <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js"></script>
          <title>
            ADU Connect - Üniversitemizin klüplerarası sosyal medya uygulaması.
          </title>
        </head>
        <body>
          <div className="container-about">
            <div className="about-content">
              <div className="about-creators-container">
                <div className="about-creators-bio">
                  <h5
                    className="title-font-size"
                    style={{ fontFamily: "serif" }}
                    data-aos="zoom-in"
                  >
                    Developerlar ve Biz Kimiz?
                  </h5>
                  <p
                    className="about-text"
                    style={{ fontFamily: "monospace" }}
                    data-aos="zoom-in"
                  >
                    Bizler ADÜ Bilgisayar mühendisliği son sınıf öğrencileriyiz.
                    Üniversitemiz klüpleri adına sizlere bu son derece samimi
                    olan klüplerarası sosyal uygulamamızı sunmaktayız.
                    Kullandığımız teknolojiler ise sektörde oldukça popülerdir.
                    Bizler ADÜ Bilgisayar mühendisliği son sınıf öğrencileriyiz.
                    Üniversitemiz klüpleri adına sizlere bu son derece samimi
                    olan klüplerarası sosyal uygulamamızı sunmaktayız.
                    Kullandığımız teknolojiler ise sektörde oldukça popülerdir.
                    Bizler ADÜ Bilgisayar mühendisliği son sınıf öğrencileriyiz.
                    Üniversitemiz klüpleri adına sizlere bu son derece samimi
                    olan klüplerarası sosyal uygulamamızı sunmaktayız.
                    Kullandığımız teknolojiler ise sektörde oldukça popüler.
                  </p>
                </div>
                <div className="about-creators-avatars">
                  <img
                    className="avatar-img"
                    src={require("../assets/utku.png")}
                    alt=""
                    data-aos="zoom-in"
                  ></img>
                  <img
                    className="avatar-img"
                    src={require("../assets/salihcan.jpeg")}
                    alt=""
                    data-aos="zoom-in"
                  ></img>
                </div>
              </div>

              <div className="about-cards-section">
                <Aboutcard
                  src={require("../assets/about-avatar.png")}
                  paragraph={
                    "Merhaba! Okul kulübümüzün resmi sosyal medya hesabına hoş geldiniz. Biz, [okul adı] öğrencileri olarak [kulüp adı] kulübünü temsil etmekten gurur duyuyoruz. Amacımız, [kulüp amacı] doğrultusunda [kulüp etkinlikleri] gibi etkinlikler düzenleyerek öğrenciler arasında birlik ve dayanışma sağlamaktır. Sosyal medya hesabımızda, kulüp etkinlikleri, başarılarımız, projelerimiz ve daha fazlası hakkında güncel bilgileri paylaşacağız. Siz de kulübümüzü desteklemek ve bizimle etkileşimde bulunmak için hesabımızı takip edebilirsiniz. Birlikte daha güçlüyüz, birlikte daha başarılıyız! #BirlikteKulüpAdı"
                  }
                />

                <Aboutcard
                  src={require("../assets/about-star.png")}
                  paragraph={
                    "Merhaba! Okul kulübümüzün resmi sosyal medya hesabına hoş geldiniz. Biz, [okul adı] öğrencileri olarak [kulüp adı] kulübünü temsil etmekten gurur duyuyoruz. Amacımız, [kulüp amacı] doğrultusunda [kulüp etkinlikleri] gibi etkinlikler düzenleyerek öğrenciler arasında birlik ve dayanışma sağlamaktır. Sosyal medya hesabımızda, kulüp etkinlikleri, başarılarımız, projelerimiz ve daha fazlası hakkında güncel bilgileri paylaşacağız. Siz de kulübümüzü desteklemek ve bizimle etkileşimde bulunmak için hesabımızı takip edebilirsiniz. Birlikte daha güçlüyüz, birlikte daha başarılıyız! #BirlikteKulüpAdı"
                  }
                />
                <Aboutcard
                  src={require("../assets/about-phone.jpg")}
                  paragraph={
                    "Merhaba! Okul kulübümüzün resmi sosyal medya hesabına hoş geldiniz. Biz, [okul adı] öğrencileri olarak [kulüp adı] kulübünü temsil etmekten gurur duyuyoruz. Amacımız, [kulüp amacı] doğrultusunda [kulüp etkinlikleri] gibi etkinlikler düzenleyerek öğrenciler arasında birlik ve dayanışma sağlamaktır. Sosyal medya hesabımızda, kulüp etkinlikleri, başarılarımız, projelerimiz ve daha fazlası hakkında güncel bilgileri paylaşacağız. Siz de kulübümüzü desteklemek ve bizimle etkileşimde bulunmak için hesabımızı takip edebilirsiniz. Birlikte daha güçlüyüz, birlikte daha başarılıyız! #BirlikteKulüpAdı"
                  }
                />
              </div>
            </div>
          </div>
        </body>
      </html>
    </>
  );
};

export default About;
