import React, {useEffect, useState} from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../Firebase"
import { Link } from 'react-router-dom';

const KnitToMeasure = () => {
  const storage = getStorage(app);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");

  useEffect(() => {
    const storageRef = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingMeasureGirlEN.gif');
    getDownloadURL(storageRef)
    .then((url) => {
      setImageUrl(url);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef1 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig2_2EN.gif');
    getDownloadURL(storageRef1)
    .then((url1) => {
      setImageUrl1(url1);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef2 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig2_3EN.gif');
    getDownloadURL(storageRef2)
    .then((url2) => {
      setImageUrl2(url2);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef3 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig2_4.gif');
    getDownloadURL(storageRef3)
    .then((url3) => {
      setImageUrl3(url3);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);
  
  return (
    <div className="w-full h-full overflow-y-scroll p-8 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-6">Knitting to Measure: A Comprehensive Guide</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          Knitting to measure is simple if you’re knitting a basic, straight-up-and-down sweater. In this case, you only need two length measurements and two width measurements. However, knitting more complex garments requires a deeper understanding of how to take accurate measurements and adjust for armholes, necklines, and sleeves.
        </p>
        <p className="mb-4">
          This guide covers the essential measurements, how to draw your knitting sloper (pattern), and the easiest methods to create garments that fit perfectly. By following these instructions, you can ensure that your hand-knit or machine-knit garments meet your expectations in terms of size and fit.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Abbreviations of Measurements</h2>
        <div className="my-8 flex justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <ul className="list-disc ml-8 space-y-2">
          <li><strong>BL</strong>: Back Length</li>
          <li><strong>SL</strong>: Sleeve Length</li>
          <li><strong>CC</strong>: Chest Circumference (across the breast)</li>
          <li><strong>UC</strong>: Upper Chest Circumference (above the breast)</li>
          <li><strong>NS</strong>: ½ Neck + 1 Shoulder</li>
          <li><strong>AH</strong>: Armhole Height</li>
          <li><strong>UA</strong>: Upper Arm Circumference</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Length Measurements</h2>
        <p className="mb-4">
          The **Back Length (BL)** is measured from the nape of the neck to as far down as you want the sweater to go.
        </p>
        <p className="mb-4">
          The **Sleeve Length (SL)** is measured from the middle of the shoulder rounding to the underside of the wrist bones. It's important to measure this carefully to ensure a good fit.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Width Measurements</h2>
        <p className="mb-4">
          The **Chest Circumference (CC)** is measured around the chest, without tightening. You may add more or less depending on how loose or tight you want the sweater to be.
        </p>
        <p className="mb-4">
          The **Neck and Shoulder (NS)** measurement is crucial for determining how far you need to decrease for the armhole. Even if the sleeve is attached straight without a sleeve cap, you still need this measurement to calculate the correct sleeve length.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Drawing the Knitting Sloper</h2>
        <p className="mb-4">
          Before drawing your knitting pattern (sloper), you need to decide how much to add to the measurements. This depends on whether the sweater is to be worn over other clothes or close to the body. Knitted work is elastic, so knitting exactly to the measurements will usually work, but adding extra for comfort is recommended.
        </p>
        <div className="my-8 flex justify-center">
          {imageUrl1 ? (
            <img src={imageUrl1} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          For example, adding 6-7 cm to the chest circumference (CC) will give you some free space around the body. If you are knitting without rounding the armhole, you should add at least 14-16 cm to the CC to ensure a good fit.
        </p>
        <div className="my-8 flex justify-center">
          {imageUrl2 ? (
            <img src={imageUrl2} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          A rule of thumb for armhole height is to use 2/9 of (CC + additions). If you don’t have the NS measurement, you can also use 2/9 of UC without additions. Additionally, 3 × (2/9 of CC) can be used as the length of the sweater until the hips.
        </p>
        <div className="my-8 flex justify-center">
          {imageUrl3 ? (
            <img src={imageUrl3} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          To begin, mark out the back length (BL) along a vertical line and 1/4 of the chest circumference perpendicular to the back line at its bottom end. This forms a rectangle, which becomes the basic structure of your sloper.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Adjusting for Armholes and Sleeves</h2>
        <p className="mb-4">
          If you are knitting a basic sweater without rounding the armhole, make sure to add enough width to accommodate the sleeve. Normally, the upper sleeve circumference is 2 × AH, and the circumference at the wrist is equal to AH. However, these measurements can vary based on personal preference.
        </p>
        <p className="mb-4">
          For a more tailored fit, you can draw a rounded armhole and slant the shoulder. In ladies' sweaters, you may also want to adjust for the bust by measuring both the CC and UC and adding the difference between these measurements to the front of the sweater. This gives the garment a better fit around the chest.
        </p>
        <p className="mb-4">
          When knitting a sweater, it’s important to mark the deepest point of the armhole with a strand of yarn while knitting, even if you don’t decrease for the armhole. This makes attaching the sleeve much easier.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Knitting a Sweater: Step-by-Step</h2>
        <p className="mb-4">
          For a simple sweater, you only need four measurements:
        </p>
        <ul className="list-disc ml-8 space-y-2">
          <li>Back Length (BL)</li>
          <li>Sleeve Length (SL)</li>
          <li>Chest Circumference (CC)</li>
          <li>Neck and Shoulder (NS)</li>
        </ul>
        <p className="mb-4">
          Once you’ve decided how much extra width to add, cast on with your chosen method. When you reach the armhole, decrease the number of stitches. The simplest way is to bind off half of the stitches at once and then decrease the remaining stitches at the beginning of each row. However, for a smoother armhole, you can gradually bind off a few stitches at a time.
        </p>
        <p className="mb-4">
          If knitting the back of the sweater, continue knitting up to the shoulder. You can cast off the stitches or shape the neck and shoulder using a gradual decrease, ensuring that you finish the neck and shoulder shaping simultaneously on both sides.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Knitting the Sleeves</h2>
        <p className="mb-4">
          The easiest way to knit sleeves is to pick up stitches from the armhole and knit from the top down. The height of the sleeve cap is typically 7/12 of the armhole height, and this measurement ensures the sleeve fits properly into the armhole.
        </p>
        <p className="mb-4">
          Start by sewing the shoulder seams together and picking up stitches along the armhole. You will need to calculate how many stitches to use based on the upper sleeve circumference. Once you’ve picked up the necessary stitches, set the row counter and begin knitting. The sleeve cap is shaped by decreasing stitches gradually at the top, followed by consistent knitting down to the wrist.
        </p>
        <p className="mb-4">
          If you haven’t rounded the armholes, simply pick up stitches between the strands where the armholes are marked and knit the sleeves from there. Adjust the sleeve length to subtract the amount the shoulder seam drops down the arm.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Finishing Touches</h2>
        <p className="mb-4">
          Once the sleeves and body are completed, you can add ribbed cuffs or borders as desired. A neckband can also be knitted once the front and back of the sweater are assembled. If you prefer not to have a neckband, ensure that the neck opening is adjusted accordingly during the shaping process.
        </p>
        <p className="mb-4">
          Always double-check your row counter and make careful notes as you knit. This will help ensure that both sides of the garment match perfectly when assembling the final product.
        </p>
      </section>
      <div className="flex justify-between mt-6">
          <Link to="/Main/KnitSample">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Back</button>
          </Link>
          <Link to="/Main/Edges">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Next</button>
          </Link>
      </div>
    </div>
  );
};

export default KnitToMeasure;
