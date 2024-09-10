import React, {useEffect, useState} from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../Firebase"
import { Link } from 'react-router-dom';

const Mounting = () => {
  const storage = getStorage(app);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const [imageUrl5, setImageUrl5] = useState("");

  useEffect(() => {
    const storageRef = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig5-1.gif');
    getDownloadURL(storageRef)
    .then((url) => {
      setImageUrl(url);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef1 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig5-2.gif');
    getDownloadURL(storageRef1)
    .then((url1) => {
      setImageUrl1(url1);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef2 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig5-3.gif');
    getDownloadURL(storageRef2)
    .then((url2) => {
      setImageUrl2(url2);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef3 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig5-4.gif');
    getDownloadURL(storageRef3)
    .then((url3) => {
      setImageUrl3(url3);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef4 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig5-5.gif');
    getDownloadURL(storageRef4)
    .then((url4) => {
      setImageUrl4(url4);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);

  useEffect(() => {
    const storageRef5 = ref(storage, 'gs://seamless-knitting.appspot.com/Module/MachineKnittingFig5-6.gif');
    getDownloadURL(storageRef5)
    .then((url5) => {
      setImageUrl5(url5);
    })
    .catch((error) => {
      console.error("Cannot get image from firebase storage", error);
    })
  }, []);


  return (
    <div className="w-full h-full overflow-y-scroll p-8 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-6">Mounting and Sewing Techniques for Knitted Garments</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Sewing Together by Machine</h2>
        <p className="mb-4">
          It is easier if you iron the edges before you sew them together; but if the yarn cannot be ironed, the edges can still be sewed together.
          If you have picked up stitches in the sleeve holes and knitted the sleeves downwards, you can sew the sleeve and the side at once. Start pinning the pieces together and place the pins at a right angle to the edge.
          You put one pin under the arm and then one pin at each end. Spread the pins levelly. If there are stripes or pattern you put a pin in each stripe or pattern, to make sure they lie over each other.
          When you sew the edges together it is important that you do not pull the seams so that they will bulge. You can use a large needle and push the knitting under the pressure foot and at the same time smooth the edges to prevent them from rolling. Be sure to sew both layers.
          You may prefer to tack the seams together before you sew them on the machine. You can sew with a zigzag at stitch width 1 and normal stitch length. Then the seam will be a little bit elastic without bulging. If you have cast off the shoulder seams, be sure to sew them together behind the casting-off edge, otherwise this will show upon the right side.
        </p>
        <p className="mb-4">
          If you did not pick up the stitches in the sleeve holes but started the sleeves beneath, then you must sew the side seams and the sleeve seams separately. Afterwards you pin the sleeve to the sleeve hole while the person is wearing the blouse. Be careful that the sleeves are hanging straight down not turning so they make sloping folds. First you put a pin in the shoulder seam, and then at each side of the sleeve. You may want some extra width, preferably a little in front of the shoulder seam where the shoulder blades curve forward. It is not important that the sleeve seam lies on top of the side seam; it may overlap the side seam a little.
        </p>
        <p className="mb-4">
          When you have pinned the sleeve, you sew three marks across the seam, one opposite the shoulder and one at each side underneath the extra width, and make another mark opposite them on the armhole. When you have pinned the sleeve so that it fits in the armhole, you can take out the pins, and transfer the marks to the other sleeve. You turn one sleeve inside out and put it into the other sleeve so that the seams lie over each other and pin them together. You put a pin in each mark and sew another mark at the other sleeve without sewing through both layers. You pin the sleeve holes together too, so that the shoulder seams and the side seams lie over each other, and transfer the marks in the same way. Now you can tack the sleeves and see if they fit exactly so that you can sew them by machine.
        </p>
        <p className="mb-4">
          Rib bands are not so easy to sew by machine. It is difficult to make the stitches so that the rows of purl and plain stitches go straight. I suggest that you sew them by hand. You take a half knit stitch from each side, so that it looks like a whole stitch. Then you can start and end with a knit stitch when you cast on and do the same when you make the neckband and the wrist.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Sewing Together by Hand</h2>
        <div className="my-8 flex justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          Side seams: Place the pieces beside each other with the knit side up. Prick down half a stitch from the edge on the one piece and up again in the stitch above it. Prick down on the other piece half a stitch from the edge in the opposite stitch and up again in the stitch over it. Prick down in the first piece in the same hole where you pricked up the first time and up again in the stitch above it. Go back to the other piece and prick down in the stitch you pricked up before, and so on. When you pull the thread together, the two half stitches will make a whole stitch and the seam will not be seen. It may be a little clumsy if you use the knitting yarn, so you can use sewing thread in the same color. It will not show.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Assembling or Seaming Open Stitches</h2>
        <p className="mb-4">
          To sew stitches together on the right side: I am assuming that the yarn you are using can be ironed. Use a needle without a point. The two pieces have not been cast off but end in a contrasting color. Iron the two pieces each, using steam or pressing them with a damp cloth. Place the pieces so that the open stitches are facing one another. You may have left a thread hanging which you can use to seam the pieces together. Otherwise, you can take another and stitch it on.
        </p>
        <div className="my-8 flex justify-center">
          {imageUrl1 ? (
            <img src={imageUrl1} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          Prick from below and up in the stitch that is connected with the thread. Prick from above and down in the opposite stitch on the other piece. Prick from below and down in the stitch beside it. Prick from above and down in the stitch you started at on the first piece. Prick from below up in the stitch beside it. Prick from above and down in the stitch on the upper piece which you pricked up from last time. Prick from below and up in the stitch beside it, etc. In other words, you must prick two times into each stitch, once from above and once from below. In this way you make a whole stitch. Pull the stitches together just as tightly as the knitted stitches so they cannot be seen at all. This method can be used for shoulder seams, stockings, etc.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">To Sew Stitches Together from the Wrong Side</h2>
        <p className="mb-4">
          If the yarn cannot be ironed you can leave the contrasting color and sew from the wrong side. On the first contrasting row, there is half a row of contrasting color, then half a row of the basic yarn, and that is the row you are going to sew in.
        </p>
        <div className="my-8 flex justify-center">
          {imageUrl2 ? (
            <img src={imageUrl2} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          Sew from below and up through the lower half stitch. Sew from below and up through the half stitch on the upper piece. Sew from above and down through the next stitch in the upper piece. Sew from above and down through the half stitch on the lower piece, the same stitch you came from last time. Sew from below and up through the stitch beside it. Sew from below and up through the half stitch on the upper piece in the same stitch you came from last time. So you still sew twice in each stitch. You pull it together just as tightly as the rest of the knitting. When you have finished the sewing you can ravel the contrast colored yarn off.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">To Sew the Open Loops Down</h2>
        <p className="mb-4">
          You can use this method for neckbands, wrists, etc. You knit twice as many rows as you are going to use. Then you bend them and sew the open loops onto the purl side. The knitting will then be more elastic than if you had cast the edge off.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Neckband in Rib</h2>
        <p className="mb-4">
          As described in the edges chapter you begin with a large stitch size, and gradually go down to the smallest stitch size. Knit one row at stitch size 10, and gradually go up again to the biggest stitch size. Now it is easy to see where the edge is going to be bent. Leave a long thread for the sewing before you knit the contrast colored yarn. You cannot leave the contrast colored yarn because it will stay inside the seam. Iron the edge firmly before you sew the stitches down. If the yarn cannot be ironed, you must be careful not to press that part of the seam which is seen on the right side and only iron the outermost rows.
        </p>
        <div className="my-8 flex justify-center">
          {imageUrl3 ? (
            <img src={imageUrl3} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          Use a needle without a point and proceed in this way: Make a stitch with the thread you left up through the first stitch in the neckband. Sew down in a loop on the blouse underneath the neckband. Prick down in that stitch on the neckband, where you pricked up last time. Prick up in the next stitch on the neckband. Sew down in the next loop on the blouse. Prick down in the same stitch on the neckband where you came up last time. Prick up in the next stitch on the neckband. Sew down in next loop on the blouse, etc. If you take a whole stitch on the blouse instead of taking a loop, it will be seen on the right side. Don't sew twice in the loops on the blouse, but sew twice in each stitch on the neckband, once from below and one time from above.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Rib-Knitted Neckband</h2>
        <p className="mb-4">
          Make an extra knit stitch in the side where the last stitch is a purl stitch, in order to sew the neckband neatly. Do it in the same way as the stocking knitted neckband, but as rib knitting uses a smaller stitch size, you only decrease it by 1/3 stitch size at a time, say every second to every fourth row. You may go down to stitch size 1 or 0, but you do not make a row on stitch size 10, just go up again and end with a stitch size bigger than the first, so the stitches are easier to sew down. Knit contrast colored yarn and release the knitting. Then iron the edge firmly with steam or a wet cloth, but be careful not to stretch it when you iron it, because then the stitches will be smaller and more difficult to find, when you sew them down.
        </p>
        <div className="my-8 flex justify-center">
          {imageUrl4 ? (
            <img src={imageUrl4} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          Be careful so that the seam does not shift out of place. You can avoid that if each time you catch the loop you take the one just underneath the stitch. When you go from a knit stitch you catch the loop under a purl stitch on the neckband, because the neckband is bent over, and a knit stitch is a purl stitch on the other side. When you go from a purl stitch you catch a loop underneath a knit stitch.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Cut Neck</h2>
        <p className="mb-4">
          If you have knitted a pattern and it is difficult to shape the neck, you can knit straight up, and afterwards cut the neck shape and perhaps the shape of the shoulder. You can do this in the following way: Take a piece of wrapping paper and fold it together into half. Draw half the pattern of the neck and shoulder, so that the fold is the middle of the neck. Design it big enough to leave space for the neckband. Under the neck you must leave a plenty of space before you cut the pattern out. Unfold it so you have both sides of the pattern and draw a line in the fold. Fold the blouse along the middle and tack a line on the fold. Place the pattern on the blouse and pin the middle line on the middle line of the blouse. Pin it all the way round. Now you sew a zigzag seam on stitch width 1 on the machine along the edge of neck and shoulders. The stitch length can be 1 or 1½. Cut very close to the stitches, but be very careful not to cut in the knitted stitches. Take the pattern off and sew once more over the seam with stitch width 2, not wider, because then you cannot knit a row when you have picked up the stitches behind the seam.
        </p>
        <p className="mb-4">
          Turn the purl side out and pick up the stitches. First you place the middle on the two 1 needles. If you are not sure where to place the last needles, calculate which needle number you should have had if you had knitted the neck as usual, and add some extra needles for the straight piece on the side of the neck. Make one row before you move the stitches for rib knitting, and do as described in the edges chapter. When you sew the stitches down, you take the loops underneath the zigzag edge, so you cover it. Do the back in the same way, but without leaving a piece for the side of the neck. You may store the paper pattern and use it several times.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">If a Stitch Has Been Dropped</h2>
        <p className="mb-4">
          Put a safety pin into the stitch, until the piece is finished. Then crochet up the stitch with the casting-on needle, but leave out the last loop, because otherwise there will be one stitch too much. You may fasten the starting thread firmly by making it penetrate the thread used for sewing. If there is a pattern, then look somewhere else in the knitting and find out what color the loop that you take must have, in order that the pattern is made to fit.
        </p>
        <div className="my-8 flex justify-center">
          {imageUrl5 ? (
            <img src={imageUrl5} alt="Firebase" className="max-w-full h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <p className="mb-4">
          If several stitches next to each other have been dropped, then it is more difficult to get a nice result. When you crochet up the first stitch, then put a safety pin into the other stitches. Usually, the loops will have small curves of thread if they have been knit and have been dropped afterwards. Use only what corresponds to the length of such a curve for every stitch, then the yarn will become distributed evenly. If you have not yet come very far in the knitting, you may pay better off to discard the knitting and start anew.
        </p>
      </section>
      <div className="flex justify-between mt-6">
          <Link to="/Main/Garment">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Back</button>
          </Link>
          <Link to="/Main/OtherGarments">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Next</button>
          </Link>
      </div>
    </div>
  );
};

export default Mounting;
