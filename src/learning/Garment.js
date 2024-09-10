import React, {useEffect, useState} from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../Firebase"

const Garment = () => {
  const storage = getStorage(app);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const [imageUrl5, setImageUrl5] = useState("");
  const [imageUrl6, setImageUrl6] = useState("");
  const [imageUrl7, setImageUrl7] = useState("");
  const [imageUrl8, setImageUrl8] = useState("");
  const [imageUrl9, setImageUrl9] = useState("");

  useEffect(() => {
    const storageRef = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig4-1EN.gif');
    getDownloadURL(storageRef)
    .then((url) => {
      setImageUrl(url);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef1 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig4-2cEN.gif');
    getDownloadURL(storageRef1)
    .then((url1) => {
      setImageUrl1(url1);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef2 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig4-4.gif');
    getDownloadURL(storageRef2)
    .then((url2) => {
      setImageUrl2(url2);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef3 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig4-4EN.gif');
    getDownloadURL(storageRef3)
    .then((url3) => {
      setImageUrl3(url3);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef4 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnitting-4-raglan-hole.jpg');
    getDownloadURL(storageRef4)
    .then((url4) => {
      setImageUrl4(url4);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef5 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig4-h1.gif');
    getDownloadURL(storageRef5)
    .then((url5) => {
      setImageUrl5(url5);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef6 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig4-skirt.gif');
    getDownloadURL(storageRef6)
    .then((url6) => {
      setImageUrl6(url6);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef7 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig4-skirt2.gif');
    getDownloadURL(storageRef7)
    .then((url7) => {
      setImageUrl7(url7);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef8 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig4-skirt3.gif');
    getDownloadURL(storageRef8)
    .then((url8) => {
      setImageUrl8(url8);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef9 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig4-skirt4.gif');
    getDownloadURL(storageRef9)
    .then((url9) => {
      setImageUrl9(url9);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll p-8 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-6">Fitting Methods and Garment Construction</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Fitting Methods</h2>
        <p className="mb-4">
          When knitting, you can shape garments without cutting or making tucks, unlike in sewing. Horizontal tucks, such as breast tucks, 
          can be made using shortened rows by resting some needles. Vertical tucks require moving stitches using a transfer tool, though 
          this method requires more time. Alternatively, vertical tucks can be transferred to horizontal tucks for easier execution.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Basic Patterns</h2>
        <div className="my-8 flex justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          Basic patterns can be designed based on knitting to measure, and are essential for shaping garments. You can add tucks and 
          adjust measurements to fit body curves. The chest, shoulder, and armhole measurements are especially important for ensuring 
          proper fit and comfort.
        </p>
        <p className="mb-4">
          Use chequered paper to draw out the pattern, and calculate how many needles you need to rest or decrease in specific areas for 
          shaping.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">How to Move Tucks</h2>
        <div className="my-8 flex justify-center">
          {imageUrl1 ? (
            <img src={imageUrl1} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          Tucks can be moved depending on where you want the shaping to occur. For example, breast tucks can be shifted to the shoulder 
          seam if knitting sideways. Using a transparent paper pattern, you can mark where the new tuck should be placed and adjust the 
          original tuck’s position accordingly.
        </p>
        <div className="my-8 flex justify-center">
          {imageUrl2 ? (
            <img src={imageUrl2} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Raglan</h2>
        <div className="my-8 flex justify-center">
          {imageUrl3 ? (
            <img src={imageUrl3} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          Raglan sleeves are typically knitted at a 35° angle to the vertical, which can be achieved by decreasing one stitch at the 
          beginning of each row. The sleeve pattern is drawn to match the body shape, with the sleeve starting just below the armhole 
          and extending to the neck.
        </p>
        <div className="my-8 flex justify-center">
          {imageUrl4 ? (
            <img src={imageUrl4} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          You can also create raglan sleeves with holes by using shortened rows, pushing needles into resting position at each end of the 
          row to create a hole effect.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Sleeves</h2>
        <p className="mb-4">
          The sleeves are knitted by picking up stitches from both the front and back pieces and supplementing with extra stitches. After 
          casting on the extra stitches in the middle, use shortened rows to raise the sleeve height at the back, making sure the sleeve 
          length fits well with the shoulder rounding.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Skirts</h2>
        <p className="mb-4">
          Skirts can be knitted in various ways, from straight pieces to circular designs. For example, a skirt made in four pieces can be 
          rounded in the waist for a fuller shape. Alternatively, a half-circle skirt can be knit with shortened rows to add width.
        </p>
        <div className="my-8 flex justify-center">
          {imageUrl5 ? (
            <img src={imageUrl5} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <div className="my-8 flex justify-center">
          {imageUrl6 ? (
            <img src={imageUrl6} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <div className="my-8 flex justify-center">
          {imageUrl7 ? (
            <img src={imageUrl7} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          You can also knit skirts sideways with shortened rows to achieve a fuller shape or create pleats by using different stitch sizes 
          and spaces between the needles. Always calculate the amount of yarn needed by measuring the area of the skirt.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Basic Pattern for Skirts</h2>
        <p className="mb-4">
          To create a fitted skirt, measure the waist and hip circumference, adding extra space for tucks. The waistline often bows 
          upward slightly, so it’s important to add shortened rows before making the waistband.
        </p>
        <div className="my-8 flex justify-center">
          {imageUrl8 ? (
            <img src={imageUrl8} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <div className="my-8 flex justify-center">
          {imageUrl9 ? (
            <img src={imageUrl9} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          Once the basic pattern is designed, you can create different styles by folding or adjusting the pieces. For example, adding 
          extra width at the tuck can create a more flared skirt. You can also knit skirts in one piece for a seamless look.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Skirt Pleats</h2>
        <p className="mb-4">
          Skirts can also feature pleats by manipulating stitches and using different spacing on the needles. Shift every ninth needle out 
          of function to create a pleated effect, experimenting with stitch sizes and spacing to suit your chosen yarn.
        </p>
      </section>
    </div>
  );
};

export default Garment;
