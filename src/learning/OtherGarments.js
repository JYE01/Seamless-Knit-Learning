import React, {useEffect, useState} from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../Firebase"
import { Link } from 'react-router-dom';

const OtherGarment = () => {
  const storage = getStorage(app);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const storageRef = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingCap.jpg');
    getDownloadURL(storageRef)
    .then((url) => {
      setImageUrl(url);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  return (
    <div className="w-full h-full overflow-y-scroll p-8 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-6">Knitting Other Garments: Socks, Mittens, Gloves, and Caps</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Socks</h2>
        <table class="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th class="border px-4 py-2" colspan="1">Shoe size</th>
              <th class="border px-4 py-2" colspan="4">Foot length (cm)</th>
            </tr>
            <tr>
              <th class="border px-4 py-2">European</th>
              <th class="border px-4 py-2">US male</th>
              <th class="border px-4 py-2">US female</th>
              <th class="border px-4 py-2">UK</th>
              <th class="border px-4 py-2">Foot length (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">37</td>
              <td class="border px-4 py-2">4½</td>
              <td class="border px-4 py-2">6</td>
              <td class="border px-4 py-2">3½</td>
              <td class="border px-4 py-2">23</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">40</td>
              <td class="border px-4 py-2">7½</td>
              <td class="border px-4 py-2">9</td>
              <td class="border px-4 py-2">6</td>
              <td class="border px-4 py-2">25</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">43</td>
              <td class="border px-4 py-2">10</td>
              <td class="border px-4 py-2">11½</td>
              <td class="border px-4 py-2">9</td>
              <td class="border px-4 py-2">27</td>
            </tr>
          </tbody>
        </table>


        <h3 className="text-2xl font-semibold mb-4">Knitting Sample</h3>
        <p className="mb-4">
          Cast on 40 stitches and knit 60 rows. Pull the sample lengthwise and leave it for a moment before you measure the length in the side. If you know fairly well how many stitches you have to cast on, you can begin knitting at once. If you are not sure, you must leave the sample until the next day and measure the width. If you are going to make circular knitted socks, you use twice as many rows on the foot, because the carriage passes the row counter twice at each turn.
        </p>
        <p className="mb-4">
          You can knit stockings either flat or circular. If you knit them flat, you have to sew them together afterward. Even with a ribber available, many people prefer to knit the socks flat because it goes very fast, but then you must use time for mounting afterward. However, circular knitting looks nicer because it is more like hand knitting.
        </p>

        <h3 className="text-2xl font-semibold mb-4">Circular Knitted Socks</h3>
        <p className="mb-4">
          In this example, you cast on 60 stitches for rib knitting. The rib border must not be knit too tightly because that will make it difficult to put the socks on. Use the racking method (described in the edges chapter) which is more elastic for casting on.
        </p>
        <p className="mb-4">
          Knit the desired length, say 60 - 80 rows, not less, as it then will be difficult to turn the stitches to the knitter because of the comb which must stay on the knitting. Knit the last row on a bigger stitch size. Move all the stitches from the knitter to the ribber and knit one row with the same stitch size as you will use for circular knitting.
        </p>
        <p className="mb-4">
          Knit the first 15 stitches by hand, so the thread stays in the side when you turn the stitches. Now 1/4 of the stitches (15) in each side shall be transferred to a comb with transfer tools or a knitting needle, then be turned and moved to the knitter.
        </p>

        <h3 className="text-2xl font-semibold mb-4">Heel</h3>
        <p className="mb-4">
          Release the idle buttons, let down the ribber one step, and change the yarn leader to plain knitting. Adjust the holding cam lever. Now knit at the back needle bed. Push one needle at a time into the resting position at the end of each row until there are 10 needles in the resting position in each side and 10 needles left in the middle. 
        </p>
        <p className="mb-4">
          Now push one needle at a time down in the end of each row until all needles are down again. When you have finished the heel, push up the ribber and adjust to circular knitting.
        </p>

        <h3 className="text-2xl font-semibold mb-4">Casting Off the Toe</h3>
        <p className="mb-4">
          When 30 rows remain before you reach the end of the foot, cast off one stitch in each side, both on the ribber and on the knitter (4 stitches in total) for every other turn. When you have cast off 5 stitches in each side of both the ribber and the knitter, cast off the next 5 in every turn, two rows. Now you have reached the foot length, and you have 10 stitches left on each needle bed.
        </p>
        <p className="mb-4">
          You can move the stitches from the ribber to the knitter and cast them all off, or knit in contrast colored yarn and sew the stitches together afterward for a better finish.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Mittens and Gloves</h2>

        <h3 className="text-2xl font-semibold mb-4">Mittens</h3>
        <p className="mb-4">
          You can make mittens either circular knitted or flat. If you want a pattern on the mittens, you have to knit them flat. You can make a gore for the thumb or just knit straight up. Measure around the hand just over the thumb. If the mittens are going to have a pattern, calculate a little extra because the threads on the wrong side take up space.
        </p>

        <h3 className="text-2xl font-semibold mb-4">Gloves</h3>
        <p className="mb-4">
          It is most practical to knit gloves with circular knitting; otherwise, you will have too many seams to sew afterward. Begin with a rib border. Cast on a number of stitches that can be divided by 8. The rib border must be fairly long in order to be reversed.
        </p>
        <p className="mb-4">
          When you have finished the rib border, move the stitches to the knitter, and knit one row at the stitch size you will use for circular knitting. Knit a few rows of contrast-colored yarn and take off the knitting. Iron it solid on both sides and take off the comb. Bend it in the middle and push the comb through both layers.
        </p>
        <p className="mb-4">
          Use the measurements to calculate stitches and rows for the gloves. If you don't want a gore, knit straight up to the thumb. Knit one thread of contrast-colored yarn by hand on the stitches you need for the thumb, and then go on knitting up to the fingers.
        </p>

        <h3 className="text-2xl font-semibold mb-4">Fingers</h3>
        <p className="mb-4">
          Begin with the little finger. It will have two stitches less than the other fingers. Knit a few turns on the little finger before hanging a weight on. Cast off the outermost stitches in each side until you have 4 - 6 stitches left. Cut off the yarn and pull the end through every stitch. Repeat for all other fingers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Caps</h2>
        <div className="my-8 flex justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <h3 className="text-2xl font-semibold mb-4">Quickly Knitted Cap</h3>
        <p className="mb-4">
          Cast on the circumference of the head minus 15 - 20% and begin with a rib band or a seam. Knit straight up until 10 rows before the head height, and then knit the last 10 rows on every other needle and with half stitch size. Pull the stitches together at the top, and fasten securely.
        </p>

        <h3 className="text-2xl font-semibold mb-4">Sideways Knitted Cap with Shortened Rows</h3>
        <p className="mb-4">
          Cast on the height of the head and knit shortened rows as described. Start over again when all needles are in the idle position. The edge at the bottom will roll, so a rib band is necessary. You may knit the rib separately and sew it on.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Beret</h2>
        <p className="mb-4">
          A beret can be knitted sideways. Cast on with a closed edge and push one needle at a time into idle position until all needles are in idle position. You will need to knit shortened rows in both directions to achieve the desired shape. Finally, knit in contrast-colored yarn and take off the stitches.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Balaclava</h2>
        <p className="mb-4">
          Cast on half a head width and knit 10 - 12 cm for the neck. Begin rounding the face edge with shortened rows. Then cast on new stitches for the top of the head and knit the height of the head minus 2 - 3 cm. Sew the back of the cap, and you may knit a rib border around the face opening.
        </p>
      </section>
      <div className="flex justify-between mt-6">
          <Link to="/Main/Mounting">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Back</button>
          </Link>
          <Link to="/Main/BabyKnit">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Next</button>
          </Link>
      </div>
    </div>
  );
};

export default OtherGarment;
