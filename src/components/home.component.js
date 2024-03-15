import React, { Component } from "react";
//import Header from "/components/header/Header";       <Header />
//import Carousel from "../../src/components/carousel/Carousel";
import "./Home.css";
import { Link } from "react-router-dom";
//import DocumentMeta from "react-document-meta";
//import Header from "../../components/header/Header";
//import Footer from "../../components/footer/Footer";
//import CookieConsent from "react-cookie-consent";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import Axios from "axios";
import { useNavigate } from "react-router-dom";
//import EffectCard from "../../components/swiper-js/EffectCard/EffectCard";
import { useState, useEffect } from "react";

import UserService from "../services/user.service";
AOS.init();

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <html>
        <head>
          <meta
            name="viewport"
            content="width=device-width"
            initial-scale="1.00"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
            crossorigin="anonymous"
          ></link>

          <link
            rel="canonical"
            href="https://getbootstrap.com/docs/4.0/examples/jumbotron/"
          />

          <link href="../../dist/css/bootstrap.min.css" rel="stylesheet" />

          <link href="jumbotron.css" rel="stylesheet" />
          <link
            href="https://unpkg.com/aos@2.3.1/dist/aos.css"
            rel="stylesheet"
          />
        </head>
        <body>
          <div className="main-container">
            <div class="container-up">
              <h1 class="display-3" data-aos="fade-up-left">
                ADU Connect'e Hoş Geldin !
              </h1>
              <p className="home-p" data-aos="fade-up-left">
                ADU Connect öğrenci kulübü sosyal medya platformu, ADU'daki
                çeşitli öğrenci kulüpleri arasında bağlantı kurmayı, etkileşimi
                teşvik etmeyi ve işbirliğini desteklemeyi amaçlar. Bu platform,
                öğrencilerin kulüp etkinlikleri, etkinlikler ve katılım
                fırsatları hakkında güncel bilgilere erişmelerini sağlar ve
                canlı ve etkileşimli bir çevrimiçi topluluk oluşturur.
              </p>
              <p>
                <div className="button-and-counter">
                  <Link to="/about">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className=""
                    >
                      <a class="btn btn-primary btn-lg" role="button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-diamond-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"
                          />
                        </svg>{" "}
                        &nbsp; Daha fazla bilgi için tıkla !
                      </a>
                    </motion.div>
                  </Link>
                  <div className="counter">
                    <CountUp
                      start={0}
                      end={50.999}
                      duration={3.9}
                      separator=" "
                      decimals={3}
                      decimal="."
                      prefix="Toplam Öğrenci Sayısı: "
                      suffix=" öğrenci."
                      onEnd={() => console.log("Ended! 👏")}
                      onStart={() => console.log("Started! 💨")}
                    >
                      {/* 
                    {({ countUpRef, start }) => (
                        <div>
                          <span ref={countUpRef} />
                          <button onClick={start}>Start</button>
                        </div>
                      )}
                    */}
                    </CountUp>
                  </div>
                </div>
              </p>
            </div>

            <div className="home-section">
              <h5 className="home-h5" data-aos="fade-up-right">
                Kampüs artık sana çok daha yakın !
              </h5>
              <p className="home-p" data-aos="fade-up-bottom">
                ADU Connect, Adnan Menderes Üniversitesi öğrenci kulüplerinin
                sosyal medya platformudur. Bu platform, öğrencileri bir araya
                getirerek etkileşimi ve iletişimi artırmayı hedefler. ADU
                Connect, öğrencilerin çeşitli kulüplerle bağlantı kurmasını
                sağlar ve ortak ilgi alanlarına sahip insanları bir araya
                getirir. Bu sayede öğrenciler, kulüplerin etkinliklerini takip
                edebilir, projelerde birlikte çalışabilir ve sosyal etkileşimde
                bulunabilirler. ADU Connect, öğrencilerin üniversite yaşamını
                daha zengin ve aktif hale getirerek, yeni arkadaşlıklar
                kurmalarına ve sosyal ağlarını genişletmelerine yardımcı olur.
              </p>
            </div>
            {/* <div className="home-section-two"></div>
              
              <div className="home-section-three-left" data-aos="fade-up">
                <EffectCard className={"home-effect-card"} />
              </div>
              
              */}
            <div className="home-section-three">
              <div className="home-section-three-right">
                <h5
                  className="home-h5"
                  style={{
                    fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                  }}
                  data-aos="fade-up-left"
                >
                  Sen de hemen katıl !
                </h5>
                <p className="home-p" data-aos="fade-up">
                  ADU Connect, Adnan Menderes Üniversitesi öğrencilerinin sosyal
                  medya platformudur. Bu platform, öğrencilerin etkileşimini
                  artırmayı ve bir araya gelmelerini sağlamayı amaçlar. ADU
                  Connect, öğrencilerin ortak ilgi alanlarına dayalı olarak
                  bağlantı kurmalarını kolaylaştırır. Öğrenciler, kulüp
                  etkinliklerini takip edebilir, projelerde işbirliği yapabilir
                  ve diğer öğrencilerle sosyal etkileşimlerde bulunabilir. Bu
                  platform, öğrencilerin yeni arkadaşlıklar kurmasını ve sosyal
                  ağlarını genişletmelerini destekler. ADU Connect, Adnan
                  Menderes Üniversitesi öğrencileri arasında güçlü bir sosyal
                  medya topluluğu oluşturmayı hedefler.
                </p>
              </div>
            </div>
          </div>
          {/*<Footer />*/}
          <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
          <script>AOS.init();</script>
        </body>
      </html>
    );
  }
}
