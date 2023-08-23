import { addDays, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Helmet } from "react-helmet";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Meal from "../Components/Meal";
import mdms from "../img/mdms_logo.svg";
import useLunchQuery from "../Hooks/useLunchQuery";
import axios from "axios";

const Lunch = () => {
  const [lunchDate, setLunchDate] = useState(new Date());
  const { data: lunchList } = useLunchQuery(lunchDate);

  useEffect(() => {
    axios.get(
      "https://mdmsback.anys.kro.kr/hits/meal",
    );
  }, []);

  const postNextLunch = () => {
    setLunchDate(addDays(lunchDate, 1));
  };

  const postPrevLunch = () => {
    setLunchDate(subDays(lunchDate, 1));
  };

  console.log(lunchDate.getMonth() + 1, lunchDate.getDate());

  return (
    <>
      <Helmet>
        <link rel="icon" href={mdms} />
        <meta title="만덕중 급식표"></meta>
        <meta
          name="description"
          content="만덕중학교 급식표를 확인할 수 있습니다."
        />
        <meta
          name="keywords"
          content="급식표, 만덕중학교, 만덕중학교 급식표, 만중 급식표, 만덕중 급식표, 만덕중"
        />
        <meta name="author" content="An Ye Seong" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Subject" content="시간표" />
        <meta http-equiv="Generator" content="Visual Studio Code" />
        <meta http-equiv="Reply-To" content="anyeseong34@gmail.com" />
        <meta http-equiv="Email" content="anyeseong34@gmail.com" />
        <meta
          name="google-site-verification"
          content="9uyD9o32V55EODSQUiQcY-pi4YOjA7VG6M6sPg-lsp8"
        />
        <meta name="og:site_name" content="만덕중 급식표" />
        <meta name="og:title" content="만덕중 급식표" />
        <meta
          name="og:description"
          content="만덕중학교 급식표를 확인할 수 있습니다."
        />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://mdms.anys.kro.kr/lunch" />
        <meta name="og:image" content={mdms} />
      </Helmet>

      <Header />
      <div className="lunchBox-container">
        <FiChevronLeft size={70} onClick={postPrevLunch} />
        <Meal meal={lunchList?.[0]} />
        <Meal meal={lunchList?.[2]} />
        <Meal meal={lunchList?.[1]} />
        <FiChevronRight size={70} onClick={postNextLunch} />
      </div>
      <Footer />
    </>
  );
};

export default Lunch;
