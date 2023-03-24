import styles from "../styles/about.module.scss";
import Image from "next/image";
import TeamCard from "@/components/about/teamCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, FreeMode } from "swiper";
import FromPeopleCard from '../components/frompeopleCard'
import {frompeople} from '../pages/index'

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.about__greeting}>
        <div className={styles.container}>
          <div className={styles.about__greeting_content}>
            <h2>RFC Bakliyat ile Biz Kimiz</h2>
            <p>
              Organik meyve ve sebzelerimiz, çiftçiler tarafından kendi
              arazilerinde doğal tarım yöntemleriyle yetiştirilmektedir.
              RFC Bakliyatta organik gıdalar sentetik kimyasallar kullanılmadan
              yetiştirilir.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.about__mission}>
        <div className={styles.container}>
          <div className={styles.about__mission_left}>
            <h2>Firma İçindeki Misyonumuz</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              beatae voluptates minima numquam similique soluta libero, iste
              eius quo obcaecati amet ad atque ab eligendi dolor quasi sapiente
              quos tempore magnam saepe facilis asperiores.
            </p>{" "}
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              beatae voluptates minima numquam similique soluta libero, iste
              eius quo obcaecati amet ad atque ab eligendi dolor quasi sapiente
              quos tempore magnam saepe facilis asperiores. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Corporis exercitationem
              alias placeat beatae laudantium ipsum delectus cum, saepe, harum,
              repellat nihil laborum sunt?
            </p>
            <button className={styles.primary_button}> Daha Fazlası</button>
            <div className={styles.about__mission_left_bottom}>
              <div className={styles.about__mission_left_l}>
                <Image
                  src={"/images/aboutPage/24.png"}
                  height="83"
                  width={162}
                  alt="24"
                />
              </div>
              <div className={styles.about__mission_left_r}>
                <h4>Üretimdeki Yılımız</h4>
                <p>
                  Organik meyve ve sebzelerimiz, kendi topraklarında sadece
                  doğal gübre kullanan çiftçiler tarafından yetiştirilmektedir.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.about__mission_right}>
            <Image
              src={"/images/aboutPage/tractor.jpg"}
              width="610"
              height={610}
              alt="traktör resmi"
            />
          </div>
        </div>
      </div>
      <div className={styles.about__team}>
        <div className={styles.container}>
          <div className={styles.about__team_title}>
            <h2>İşimizin Arkasındaki Kahramanlar</h2>
          </div>
          <div className={styles.about__team_body}>
            {team.map((person, i) => (
              <TeamCard key={i} person={person} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.about__partners}>
        <div className={styles.container}>

        <div className={styles.about__partners_title}>
          <h2>İş Ortaklarımız</h2>
        </div>
        <div className={styles.about__partners_swiper}>
          <Swiper
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            breakpoints={{
                200 : {
                    slidesPerView: 1,
                    spaceBetween : 20
                },
                500 : {
                    slidesPerView: 2,
                    spaceBetween : 20

                },
                800 : {
                    slidesPerView: 3,
                    spaceBetween : 20

                }
            }}
            className="partnerSwiper"
          >
            {partners.map((partner, i) => (
              <SwiperSlide key={i}>
                <Image src={partner} height={70} width={100} alt="partner resmi" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        </div>

      </div>
      <div className={styles.about__frompeople}>
      <div className={styles.container}>
          <div className={styles.frompeople__title}>
            <h5>Sizden Gelenler</h5>
          </div>
          <div className={styles.frompeople__titles}>
            <h5>Sizden Gelenler</h5>
          </div>
          <div className={styles.frompeople__body}>
            <Swiper
              slidesPerView={3}
              spaceBetween={2}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                200: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                400: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                500: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper"
            >
              {frompeople.map((comment, i) => (
                <SwiperSlide key={i}>
                  <FromPeopleCard comment={comment} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

const team = [
  {
    name: "Resul ÖZTÜRK",
    img: "/images/aboutPage/team1.jpg",
    job: "Farmer",
  },
  {
    name: "Fatih ÖZHAN",
    img: "/images/aboutPage/team2.jpg",
    job: "Scientist",
  },
  {
    name: "Cevher KARAMAN",
    img: "/images/aboutPage/team3.jpg",
    job: "İşportacı",
  },
  {
    name: "Hanife YÜCE",
    img: "/images/aboutPage/team4.jpg",
    job: "Müzisyen",
  },
];
const partners = [
  "/images/aboutPage/partner1.jpeg",
  "/images/aboutPage/partner2.jpeg",
  "/images/aboutPage/partner3.jpeg",
  "/images/aboutPage/partner4.jpeg",
  "/images/aboutPage/partner5.jpeg",
  "/images/aboutPage/partner6.jpeg",
  "/images/aboutPage/partner7.jpeg",
];
