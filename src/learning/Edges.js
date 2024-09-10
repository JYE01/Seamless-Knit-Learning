import React, {useEffect, useState} from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../Firebase"

const Edges = () => {
  const storage = getStorage(app);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const storageRef = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFigMasks.gif');
    getDownloadURL(storageRef)
    .then((url) => {
      setImageUrl(url);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  return (
    <div className="w-full h-screen overflow-y-scroll p-8 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-6">Casting On and Edges for Knitting Machines</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Cast On Edges Without Ribbing</h2>
        <p className="mb-4">
          You can make a finished edge by twisting the yarn once around the needles. Be careful not to make the loops too tight. This method is not used often as most knitting starts with a hem.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Cast On with Weaving Brushes</h2>
        <p className="mb-4">
          Set the weaving pattern levers and bring every other needle into the knitting position, while the rest stay in the resting position to be taken down on the next row. Thread the yarn, lay it over the resting needles, and fasten it by twisting around the first and last needle. Hold the yarn end during the first row and make a few more rows before releasing the weaving brushes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Casting On with a Thread Through Open Loops</h2>
        <p className="mb-4">
          Bring the needles into knitting position, setting every other needle in the resting position. Use a nylon thread or smooth thread inside the gate and set the tension dial to 0. Hold both ends of the nylon thread as you knit the first row. Adjust the tension dial to the required number and knit a few more rows before pulling out the nylon thread.
        </p>
        <p className="mb-4">
          This method is useful when knitting a rib by hand, as it holds the loops and allows the rib to stretch to the required needle number.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Cast On Beginning with a Hem</h2>
        <p className="mb-4">
          Begin by bringing the needles into knitting position and every other needle into resting position. Hang a casting-on comb on the gate pegs and set the idle button. Knit the first row with the tension dial set to 0, then release the comb and pull it down. Adjust the tension dial to a lower setting for the garment and knit twice as many rows as required for the hem height.
        </p>
        <p className="mb-4">
          This hem may roll, but adjusting the tension dial during the knitting process can help prevent this.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Fake Rib Hem</h2>
        <p className="mb-4">
          For a fake rib, make a hem using every other needle and a half tension dial setting for the entire hem. After the hem is completed, add the remaining needles and hang the loops on the opposite needles. Adjust the tension dial accordingly, making sure the hem isn’t too small.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Casting On with Fine Yarn</h2>
        <p className="mb-4">
          If you are using very fine yarn, it may be preferable to sew a hem after finishing the garment. You can secure the open loops with tape or zigzag stitching before hemming. Begin with a high tension setting and use all needles. Knit one row, then set the tension dial to the lowest setting and knit a few rows to secure the first row before adjusting to the required tension.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Casting On with the Ribber</h2>
        <div className="my-8 flex justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          You can either cast on with two rounds of circular knitting or rack the needles for an elastic border, useful for items like socks. Bring the needles up for 1/1 knitting and adjust the racking grip handle based on the outermost needles' position. Hang the comb and weights, then shift back to the original setting and continue knitting.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Casting On for 2/2 Knitting</h2>
        <p className="mb-4">
          To cast on for 2/2 knitting (2 knit, 2 purl), bring the needles into position and adjust the racking grip slightly. After knitting one row, hang the comb and weights, knit two rows of circular knitting, then shift the grip back.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Knitting with Every Other Needle</h2>
        <p className="mb-4">
          Cast on using every other needle with a larger stitch size. When transferring stitches to the single bed, place them on needles with existing stitches. Alternatively, you can use every third needle on both beds. After finishing the garment, knit the ribber.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Casting On by Hand</h2>
        <p className="mb-4">
          For a hand-knitted look, cast on at the single bed, knit one row, and transfer every other stitch to the ribber. Let down the ribber halfway and place the comb carefully between the stitches. Push up the ribber, hang weights, and continue knitting.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Racking</h2>
        <p className="mb-4">
          If you want a non-elastic border, cast on in 1/1 rib, knit two rounds of circular knitting, then set the row counter. Shift the racking grip one number and continue knitting with alternating rows. This method is particularly nice for the front border and can be applied to the rib as well.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Neckbands for Single Bed Machines</h2>
        <p className="mb-4">
          You can either make the neckband after the neckline or leave it for later to avoid side seams. Begin with the same stitch size as the jumper, gradually reducing the stitch size with each row until you reach size 1 or 0, then knit one row at size 10. Increase the stitch size back to the original setting and knit the final row with a larger size for easier seaming.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Neckbands with the Ribber</h2>
        <p className="mb-4">
          When using a ribber for neckbands, start with the same stitch size as the ribber used for the jumper. Gradually reduce the stitch size and knit the last row with a larger size for easier seaming. Be careful when ironing not to stretch the neckband as it can make the stitches smaller and harder to work with.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Tapering Necks and Armholes</h2>
        <p className="mb-4">
          When tapering necklines, decrease one stitch at the start of every third row to achieve a 25° angle. The neckband can be knitted at the same time as the back neck or made as a separate piece. For armholes, you can add extra width if needed and calculate the necessary stitches per cm.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Selvedges</h2>
        <p className="mb-4">
          For cardigans or garments with front pieces, you can pick up stitches one row from the edge to create a selvedge. Alternatively, create the selvedge separately and use circular knitting for a clean edge.
        </p>
        <p className="mb-4">
          When making buttonholes, move stitches to neighboring needles and knit one row before continuing. Sew the buttonholes carefully and finish the selvedge by ironing with steam or a wet cloth.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Rib Knitted Collars</h2>
        <p className="mb-4">
          For rib knitted collars, cast on half the number of stitches required for the neck, knitting straight up until the collar reaches the desired width. You can transfer stitches to the back needle bed and use a lace carriage or manually adjust them. Knit one or two rows before casting off.
        </p>
      </section>
    </div>
  );
};

export default Edges;
