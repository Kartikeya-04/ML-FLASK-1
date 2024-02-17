import React, { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import './App.css';
function App() {
  const shakeAnimation = {
    hover: {
      rotate: [-10, 10, -10],
      transition: { duration: 1.3, repeat: Infinity },
    },
  };
  const [height, setheight] = useState('');
  const [all, setall] = useState([]);

  const handledata = (e) => {
    setheight(e.target.value);
  };

  const sendAll = async () => {
    try {
      console.log('Data sent:', { height });
      const response = await fetch('http://127.0.0.1:4000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ height: parseFloat(height) }),
      });
      const datah = await response.json();
      console.log(datah.prediction[0]);
      setall(datah.prediction[0]);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col h-screen w-screen justify-center items-center bg-blue-500 gap-10">
        <motion.div whileHover="hover" variants={shakeAnimation}>
          <h1 className="text-white title">Predict The Weight</h1>
        </motion.div>
        <div>
          <input
            type="number"
            onChange={handledata}
            placeholder="Height in cm"
          />
        </div>
        <motion.div whileTap={{ scale: [1, 1.5, 5] }}>
          <button
            onClick={sendAll}
            className=" font-bold text-black bg-white p-7 w-full border-spacing-1 rounded-3xl mb-6"
          >
            Submit
          </button>
        </motion.div>
        <div className="ans text-yellow-300 font-extrabold text-4xl">
          {all.map((p, item) => {
            return (
              <div>
                <h3 key={item}>Your weight is {Math.round(p)} kg only!</h3>
              </div>
            );
          })}
        </div>
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default App;
