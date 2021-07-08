import React, { useState, useEffect } from "react";
// import requests from './requests';
import axios from "axios";
import style from "./css/banner.module.css";
import { API } from "../Backend";
import { useHistory } from "react-router-dom";
import Preloader from "./utils/Preloader";

function Banner() {
  const [video, setvideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    console.log("useEffect");
    async function fetchData() {
      const request = await axios.get(`${API}video/video-list/`);
      // console.log('DATA', request.data);
      var len = request.data.length;
      // console.log(len);

      setvideo(request.data[Math.floor(Math.random() * len)]);
      setLoading(false);
      return request;
    }
    fetchData();
  }, []);
  // console.log(video);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handlePlay = () => {
    history.push(`../preplay/${video.id}`);
  };

  return loading ? (
    <div style={{ width: "100vw", height: "25vh" }}>
      <Preloader />
    </div>
  ) : (
    <section
      className={style.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
			            ${video?.thumbnail}
			        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className={style.banner_container}>
        <h1 className={style.banner_title}>
          {video?.title || video?.name || video?.orginial_name}
        </h1>
        <div className={style.banner_btns}>
          <button className={style.banner_btn} onClick={handlePlay}>
            Play
          </button>
          {/* <button className={style.banner_btn}>My List</button> */}
        </div>
        <h1 className={style.banner_description}>
          {truncate(video?.description, 150)}
        </h1>
      </div>
      <div className={style.banner_fadeBottom}></div>
    </section>
  );
}

export default Banner;
