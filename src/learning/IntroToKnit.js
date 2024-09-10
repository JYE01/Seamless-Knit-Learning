import React from 'react';

const IntroToKnit = () => {
  return (
    <div className="w-full h-full overflow-y-scroll p-8 bg-white text-gray-900">
        <h1 className="text-4xl font-bold mb-6">Introduction to Machine Knitting</h1>

        <section id="overview" className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Overview</h2>
          <p className="mb-4">
            A knitting machine is a long apparatus furnished with a row of hooked needles, or rather, casting-on needles. 
            Usually, there are 200 needles that sit in a base, called the needle bed. A part of the needle (the butt) 
            protrudes through the needle bed, and it makes contact with the knitting carriage.
          </p>
          <p className="mb-4">
            The carriage, pushed across the stitches, has on its underside several 'cams' which govern the movement each needle makes as 
            the carriage is moved. Every needle has a latch, which may be tilted back and forth to open and close access to the hook 
            of the needle. The stitches sit in the hooks, and when you drive the carriage across the needles, they are first pushed 
            up into the upper position. 
          </p>
        </section>

        {/* Insert the image between the first two sections */}
        {/* <div className="my-8 flex justify-center">
          <img src={machineImage} alt="Knitting Machine" className="w-full max-w-4xl" />
        </div> */}

        <section id="machine" className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Needle Positions</h2>
          <ul className="list-disc ml-8 space-y-2">
            <li><strong>Out of Work position:</strong> Needles pushed completely back.</li>
            <li><strong>Working position:</strong> Brought forward about 1/2".</li>
            <li><strong>Idling (Upper Working) position:</strong> Needles moved forward just enough for stitches not to enter behind the latches.</li>
            <li><strong>Resting position:</strong> Needles are pushed completely forward.</li>
          </ul>
          <p className="mt-4">
            Some machines use letter designations for these positions, but the ones listed above are the most common. 
            Machines like the PASSAP have a slightly different system.
          </p>
        </section>

        <section id="yarns" className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Types of Knitting Machines</h2>
          <p className="mb-4">
            The oldest knitting machines are double-bed machines, featuring two needle beds arranged at a slant. They enable patterns 
            like 1 plain and 1 purl or circular knitting. These machines required heavy weights to hold the knitting in place, but 
            later models introduced lighter weight systems and automated needle movements.
          </p>
          <p className="mb-4">
            KNITTAX machines, for example, utilized springs instead of weights, which allowed the machine to knit more efficiently 
            without needing weights. Newer Japanese machines like BROTHER and ROYAL introduced more advanced needle and pattern systems, 
            including punch card-based designs.
          </p>
        </section>

        <section id="patterns" className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Yarns for Knitting Machines</h2>
          <p className="mb-4">
            Machine knitting yarns range from fine single-ply to chunky varieties. Popular knitting machines like BROTHER have 
            4.5mm spacing between needles and are designed to knit yarns from 2-ply laceweight to 4-ply fingering. Double knitting yarns 
            can also be used but only on every other needle. Chunky knitting machines have 9mm spacing and are used for thicker yarns.
          </p>
          <p className="mb-4">
            Yarns for machine knitting are usually wound onto cones, and finer threads can be combined to create thicker fabric if needed. 
            Most machines work with yarn feeders, though older models required the thread to be manually placed by hand.
          </p>
        </section>
      </div>
  );
};

export default IntroToKnit;
