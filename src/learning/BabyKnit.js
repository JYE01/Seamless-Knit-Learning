import React, {useEffect, useState} from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../Firebase"

const BabyKnit = () => {
  const storage = getStorage(app);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");

  useEffect(() => {
    const storageRef = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig7-1EN.gif');
    getDownloadURL(storageRef)
    .then((url) => {
      setImageUrl(url);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef1 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingBabySweater.jpg');
    getDownloadURL(storageRef1)
    .then((url1) => {
      setImageUrl1(url1);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef2 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig7-2EN.gif');
    getDownloadURL(storageRef2)
    .then((url2) => {
      setImageUrl2(url2);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef3 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingMark.jpg');
    getDownloadURL(storageRef3)
    .then((url3) => {
      setImageUrl3(url3);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef4 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig7-3EN.gif');
    getDownloadURL(storageRef4)
    .then((url4) => {
      setImageUrl4(url4);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);


  return (
    <div className="w-full h-full overflow-y-scroll p-8 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-6">Baby Knitting Guide: A Comprehensive Learning Module</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          Knitting for babies is both fun and rewarding. This guide provides comprehensive instructions on how to knit a variety of baby garments, such as cardigans, rompers, and more, with detailed measurements and techniques tailored to each age group. Whether you are knitting for a newborn or a toddler, this module will guide you step-by-step.
        </p>
        <p className="mb-4">
          In this module, we will cover different knitting techniques, casting on, knitting patterns, how to measure, and calculate the amount of yarn needed for various projects. Additionally, you will learn how to modify patterns to suit different sizes and styles.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Measurements</h2>
        <p className="mb-4">
          Proper measurements are crucial for knitting garments that fit well. Below are the measurements needed for different age groups from 0 months to 10 years.
        </p>

        <table className="table-auto w-full mb-6">
          <thead>
            <tr>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Height (cm)</th>
              <th className="px-4 py-2">Chest Circumference (CC)</th>
              <th className="px-4 py-2">Hip Circumference (HC)</th>
              <th className="px-4 py-2">½ Neck + 1 Shoulder (NS)</th>
              <th className="px-4 py-2">Upper Arm Circumference (UA)</th>
              <th className="px-4 py-2">Back Length until Hip (BL)</th>
              <th className="px-4 py-2">Sleeve Length (SL)</th>
              <th className="px-4 py-2">Arm-hole Height (AH)</th>
              <th className="px-4 py-2">Leg Length (LL)</th>
              <th className="px-4 py-2">Foot Length</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">0-3 months</td>
              <td className="border px-4 py-2">60 cm</td>
              <td className="border px-4 py-2">45</td>
              <td className="border px-4 py-2">50</td>
              <td className="border px-4 py-2">9</td>
              <td className="border px-4 py-2">22</td>
              <td className="border px-4 py-2">24</td>
              <td className="border px-4 py-2">16</td>
              <td className="border px-4 py-2">11</td>
              <td className="border px-4 py-2">18</td>
              <td className="border px-4 py-2">9</td>
            </tr>
            {/* Additional rows for other ages from 3-6 months up to 10 years */}
            <tr>
              <td className="border px-4 py-2">3-6 months</td>
              <td className="border px-4 py-2">70 cm</td>
              <td className="border px-4 py-2">48</td>
              <td className="border px-4 py-2">54</td>
              <td className="border px-4 py-2">9.5</td>
              <td className="border px-4 py-2">23</td>
              <td className="border px-4 py-2">28</td>
              <td className="border px-4 py-2">20</td>
              <td className="border px-4 py-2">11.5</td>
              <td className="border px-4 py-2">20</td>
              <td className="border px-4 py-2">10</td>
            </tr>
            {/* Continue for all ages up to 10 years */}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Abbreviations</h2>
        <ul className="list-disc ml-8 space-y-2">
          <li><strong>CC:</strong> Chest Circumference</li>
          <li><strong>HC:</strong> Hip Circumference</li>
          <li><strong>NS:</strong> ½ Neck + 1 Shoulder</li>
          <li><strong>UA:</strong> Upper Arm Circumference</li>
          <li><strong>BL:</strong> Back Length until Hip</li>
          <li><strong>SL:</strong> Sleeve Length from Shoulder</li>
          <li><strong>AH:</strong> Arm-hole Height</li>
          <li><strong>LL:</strong> Leg Length from Crotch to Ankle</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Cardigans</h2>
        <p className="mb-4">
          Knitting cardigans for babies can be done in various styles, such as quick, one-piece cardigans or those with round yokes. This section will provide a detailed guide for each style, including instructions for knitting, shaping, and finishing.
        </p>

        <h3 className="text-2xl font-semibold mb-4">Quickly Knitted Cardigan in One Piece</h3>
        <p className="mb-4">
          Start at the bottom and cast on the measurement of the chest circumference. Knit straight up to the armholes. Divide the knitting with a contrasting colored yarn and separate the lower front parts to sew onto the upper front parts later. Continue knitting the sleeves and neckline using various shaping techniques like shortened rows and stitch increases.
        </p>
        <figure className="my-4">
          <div className="my-8 flex justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt="Firebase" className="max-w-full h-auto" />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          <figcaption className="text-center mt-2">Fig. 1: Diagram of Quickly Knitted Cardigan in One Piece</figcaption>
        </figure>

        <h3 className="text-2xl font-semibold mb-4">Cardigan with a Round Yoke</h3>
        <p className="mb-4">
          The round yoke can be knitted transversely using shortened rows. The neck circumference is calculated based on the knitting sample, and the stitches are picked up to shape the sleeves and front pieces. This method creates a seamless and beautiful rounded finish.
        </p>
        <figure className="my-4">
          <div className="my-8 flex justify-center">
            {imageUrl1 ? (
              <img src={imageUrl1} alt="Firebase" className="max-w-full h-auto" />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          <div className="my-8 flex justify-center">
            {imageUrl2 ? (
              <img src={imageUrl2} alt="Firebase" className="max-w-full h-auto" />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          <figcaption className="text-center mt-2">Fig. 2: Diagram of Cardigan with Round Yoke</figcaption>
        </figure>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Rompers</h2>
        <p className="mb-4">
          Rompers are versatile and comfortable garments for babies. You can knit rompers as two laterally reversed pieces and avoid seams in the middle by starting at the crotch. This section explains how to knit a romper, calculate gusset dimensions, and shape the piece to fit comfortably with room for a nappy.
        </p>
        <figure className="my-4">
          <div className="my-8 flex justify-center">
            {imageUrl3 ? (
              <img src={imageUrl3} alt="Firebase" className="max-w-full h-auto" />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          <div className="my-8 flex justify-center">
            {imageUrl4 ? (
              <img src={imageUrl4} alt="Firebase" className="max-w-full h-auto" />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          <figcaption className="text-center mt-2">Fig. 3: Diagram of Romper Knitting</figcaption>
        </figure>
        <p className="mb-4">
          The rompers can be designed with or without patterns, and the technique involves knitting from the middle up to the armholes, ensuring the fit is adjusted by using shortened rows and proper increases or decreases in stitches. A rib or a waistband can be added for a snug fit.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Knitted Strings</h2>
        <p className="mb-4">
          Knitted strings are versatile and useful in various garments. They can serve as waistbands, ties, or decorative elements. The simplest method is to cast on 2-3 stitches and knit until the desired length is reached. The string naturally curls to give a polished, rolled edge.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Additional Tips</h2>
        <ul className="list-disc ml-8 space-y-2">
          <li>Always check your gauge before starting a new project to ensure accurate sizing.</li>
          <li>Use soft, washable yarns suitable for baby garments to ensure comfort and practicality.</li>
          <li>Consider adding buttonholes or ties for closures on cardigans for easy wearability.</li>
          <li>Experiment with patterns and colorwork to create unique, personalized items.</li>
        </ul>
      </section>
    </div>
  );
};

export default BabyKnit;
