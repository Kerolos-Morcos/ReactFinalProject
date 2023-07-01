import React, { useState, useEffect } from 'react';
import StatStyle from './statistics.module.css';
import axios from 'axios';

function Counter({ start, end, duration }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < end) {
      const increment = Math.ceil((end - start) / (duration * 60)); // Calculate increment based on duration
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount + increment);
      }, 100); // 60 frames per second

      return () => {
        clearInterval(timer);
      };
    }
  }, [count, end, duration]);

  return <span className="count">{count}</span>;
}

function Statistics() {
  const [isVisible, setIsVisible] = useState(false);
  const [statics, setStatics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3500/patient/homeroute');
        setStatics(response.data.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleScroll = () => {
      const element = document.querySelector(`.${StatStyle.counters}`);
      if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.75) {
        setIsVisible(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    fetchData();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!statics) {
    // Render a loading state or return null if the data is not yet available
    return null;
  }

  return (
    <>
      {/* Start Statistics */}
      <section className={StatStyle.counters} data-stellar-background-ratio="0.5">
        <div className={StatStyle.overlay}>
          <div className="container">
            <ul className="row">
              {/*======= PROPOSALS SENT =========*/}
              <li className="col-sm-3">
                <i className={`fa fa-user-md ${StatStyle.fa_smile_o}`} />
                {isVisible && <Counter start={0} end={statics.numOfNurses} duration={1} />} {/* Use the Counter component */}
                <p>عدد الممرضين</p>
              </li>
              {/*======= PROPOSALS SENT =========*/}
              <li className="col-sm-3">
                <i className="fa fa-bed" />
                {isVisible && <Counter start={0} end={statics.numOfPatients} duration={1} />} {/* Use the Counter component */}
                <p>عدد المرضى</p>
              </li>
              {/*======= AWARDS WON =========*/}
              <li className="col-sm-3">
                <i className="fa fa-pump-medical" />
                {isVisible && <Counter start={0} end={statics.numOfDevices} duration={1} />} {/* Use the Counter component */}
                <p>عدد الأجهزة</p>
              </li>
              <li className="col-sm-3">
                <i className="fa fa-business-time" />
                {isVisible && <Counter start={0} end={statics.numOfBookingNurses} duration={1} />} {/* Use the Counter component */}
                <p>عدد مرات الحجز</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* End Statistics */}
    </>
  );
}

export default Statistics;
