import React from 'react';

const PatternKnit= () => {
  return (
    <div className="w-full h-full overflow-y-scroll p-8 bg-white text-gray-900">
      <h2 className="text-3xl font-bold mb-4">Patterns with Single Bed Machine</h2>
      <p className="mb-4">
        Many pattern knittings must be knitted with comb and side weights, but this makes it more
        difficult to make the knitting sample fit exactly. However, if you have some practice, you may
        not always need weights for the knitting sample. On the other hand, this does not prevent you from
        knitting the work itself with weights if things proceed easier that way.
      </p>

      <h3 className="text-2xl font-semibold mb-2">Colour Knitting</h3>
      <p className="mb-4">
        If, for example, you knit with colour pattern all over, you may omit weights, and in that case
        you may knit the sample just like you make a plainly knitted sample and measure the length along
        the edge. However, if you want to make a single pattern, e.g. in the middle of the plainly
        knitted piece, you usually have to use weights. If the pattern makes up only a small part of the
        whole, you may be guided by a plain sample, but if it makes out the main part, you may simply
        choose a random pattern for the sample, which you then knit without weights.
      </p>

      <p className="mb-4">
        One will usually start with a few rows of plain knitting until one begins to make the pattern.
        But you should not set the row counter until you begin the pattern, and only from then on should
        the length be measured. Obviously, more stitches go on colour knitting, because the threads on the
        wrong side draw the knitting together. Therefore, if you make borders of colour knitting
        alternating with plain knitting, you have to knit the colour pattern with a stitch size larger
        than that of the plain knitting.
      </p>

      <p className="mb-4">
        There is a limit to how small a stitch size you may use for colour knitting, because the threads
        on the wrong side get too long if you knit less than e.g. stitch size 5 - 6. The length of the
        threads depends on the distance between the needles, and not only on the stitch size. If only a
        single piece of pattern is involved, you may probably manage just by hanging the longest threads
        on a needle; this will not be visible on the front side. If there are many long threads, you may
        crochet them, and attach the last stitch to a needle. You have to begin with a short thread, or
        even better begin by drawing the first thread in below a stitch, whereby the crocheting becomes
        fixed in the middle. Only if you use relatively thick yarn as pattern thread will this be slightly
        visible on the front side.
      </p>

      <h3 className="text-2xl font-semibold mb-2">Imitated Jacquard</h3>
      <p className="mb-4">
        If you knit with yarn that is too thin for colour knitting, you have another option, which I call
        "imitated jacquard". Thereby I mean a type of patterns that consist of two rows of pattern
        alternating with two rows of base colour. For every colour, a few stitches are detached loose. On
        the machine, this is done by using the idle position, i.e. those stitches that are not to be
        knitted, remain in knitting position, and those that are to be knitted, are set in idle position.
        Those stitches that are not knitted will extend into the next colour and form the vertical lines
        in the pattern.
      </p>

      <h3 className="text-2xl font-semibold mb-2">Lace Knitting</h3>
      <p className="mb-4">
        In lace knitting, the garment will be looser than in plain knitting. How loose it gets, depends of
        course on how close the eyelets are positioned. If there are only a few eyelets, you can use a
        plain knitted sample as a guide. If you have a lace carriage, you will always have the lace
        carriage to the left and the ordinary carriage to the right, unless the lace carriage is built in.
        Therefore, you have to knit at least two rows between every row with eyelets. If you do that, and
        assuming that the eyelets are evenly distributed, the following rule applies: If the stitches have
        been shifted only one step, the pattern has to be knitted one number lower than in plain knitting.
      </p>

      <h3 className="text-2xl font-semibold mb-2">Tucking Pattern</h3>
      <p className="mb-4">
        Tuck is a structural pattern that appears on the wrong side. You can make tuck knitting by putting
        those needles in idle position that are to be "tucked"; thereby, the threads settle over them, and
        when you activate the needles again, these threads are fixed by the next row.
      </p>

      <h3 className="text-2xl font-semibold mb-2">Cables</h3>
      <p className="mb-4">
        Cables may be made on a single bed machine as follows: Instead of having a purl stitch on each
        side of the cable to set the cable off, you may leave out a stitch and put the needle in starting
        position, so that a hemstitch appears.
      </p>

      <h3 className="text-2xl font-semibold mb-2">Weave Patterns</h3>
      <p className="mb-4">
        Weave patterns appear on the wrong side. You can only make them if you have weave brushes, either
        built into the machine, or loose, as extra equipment that may be put on.
      </p>

      <h3 className="text-2xl font-semibold mb-2">Intarsia Knitting</h3>
      <p className="mb-4">
        Intarsia knitting is made with an intarsia carriage which is extra equipment. It knits with the
        needles standing in idle position. Thereby, you can place the thread by hand, allowing you to place
        different colours into the same row and then wind the threads around each other where they meet.
      </p>

      <h3 className="text-2xl font-semibold mb-2">Garter Patterns</h3>
      <p className="mb-4">
        If you have a garter carriage, you can make wrong/rightside patterns coded by punch cards. It is
        possible to make these patterns without comb and weights, at least on BROTHER.
      </p>

      <h3 className="text-2xl font-semibold mb-2">Patterns with the Ribber</h3>
      <p className="mb-4">
        In addition to knitting various versions of rib, you may rack stitches or rib stitches.
      </p>

      <h3 className="text-2xl font-semibold mb-2">Jacquard</h3>
      <p className="mb-4">
        In addition to these patterns, some of the newer machines allow you to make multi-colour-rib
        (jacquard). This requires a colour changer, which is available with four colours and a yarn feeder
        dimensioned for four colours.
      </p>

      <ul className="list-disc list-inside ml-6 mb-4">
        <li>On all needles</li>
        <li>With every third needle on the ribber and all needles on the knitter</li>
        <li>On every second needle</li>
      </ul>

      <p className="mb-4">
        Method 1 is most feasible if the ribber has a button that can be set so that every other needle is
        taken when going outward and the opposite every other needle is taken when going homeward.
      </p>
    </div>
  );
}

export default PatternKnit;