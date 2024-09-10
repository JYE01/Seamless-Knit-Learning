import React from 'react';

const KnittingSample = () => {
  return (
    <div className="w-full h-full overflow-y-scroll p-8 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-6">Knitting Samples: A Detailed Guide</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          Owning a knitting machine means having the ability to make your own patterns and models. This not only saves money, 
          but also allows for full creative freedom. However, machine-knitting is quite different from hand-knitting. For one, 
          the material behaves differently on the machine, and it is nearly impossible to measure while knitting because the 
          fabric is stretched while fixed on the needles. 
        </p>
        <p className="mb-4">
          This guide focuses on how to create knitting samples, how to calculate yarn consumption, and how to avoid common pitfalls 
          when measuring knitted fabric from a machine. By understanding these principles, you can create your own patterns and 
          be confident that the final garment will fit perfectly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Challenges in Machine Knitting</h2>
        <p className="mb-4">
          Machine-knitted materials don’t behave like hand-knitted materials. They are stretched on the machine, so measurements 
          must be taken after removing the sample and allowing it to rest. The width and length will change once the fabric is 
          off the machine, so you need to account for this when creating patterns.
        </p>
        <p className="mb-4">
          The tension between the needles will affect both the width and length of the fabric. Therefore, making a sample and 
          allowing it to rest for at least 24 hours is essential before making any measurements. This process allows the fabric 
          to settle into its final dimensions, ensuring accurate results.
        </p>
        <p className="mb-4">
          Even so, errors can happen. For example, if you stretch the sample too much when measuring, the actual garment might 
          turn out too small. Care must be taken, especially with certain yarns like cotton, which can shrink when washed. 
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Making a Sample: Step-by-Step</h2>
        <p className="mb-4">
          To create a reliable knitting sample, follow these steps:
        </p>
        <ul className="list-disc ml-8 space-y-2">
          <li>Decide on the stitch size you’ll be using for the actual garment.</li>
          <li>Cast on 40 stitches without using a comb or weights.</li>
          <li>Knit 60 rows, then knit a few rows of waste yarn in a contrasting color.</li>
          <li>Remove the knitting from the machine, without casting off. The fabric may roll at the edges, but don’t worry about that yet.</li>
          <li>Let the sample sit for 24 hours before measuring it. During this time, the fabric will relax into its final size.</li>
        </ul>
        <p className="mb-4">
          After 24 hours, unroll the fabric, pin it gently on an ironing board (without stretching), and measure the width and length. 
          For the most accurate results, measure the width across the middle of the sample and the length along the middle of the stitches. 
          Use millimeters for precision.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Casting On Techniques</h2>
        <p className="mb-4">
          There are several ways to cast on knitting samples. Below are three common methods:
        </p>
        <ol className="list-decimal ml-8 space-y-2">
          <li>
            **Weaving Brush Activation**: Activate the weaving brushes on your machine, and push the needles into knitting position. 
            Thread the machine, wrap the yarn around the first and last needle, and knit one row. Continue knitting a few rows before 
            deactivating the weaving brushes. Finish with 4-5 rows of waste yarn, then let the stitches fall off the machine by running 
            the carriage across without yarn.
          </li>
          <li>
            **Loose Casting with Nylon Thread**: Push the needles into position, knit one row with idle mode turned on, and release the 
            idle mode. Insert a smooth nylon thread through the stitches and knit 4-5 rows. When measuring, you can pull the nylon thread 
            to get accurate measurements.
          </li>
          <li>
            **Contrast Color Casting**: Knit a few rows of contrast-colored yarn, followed by one row of nylon thread. Measure from the 
            bottom of the first ground color stitch to the bottom of the first contrast-colored stitch. The nylon thread can be pulled out 
            later.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Calculating Yarn Consumption</h2>
        <p className="mb-4">
          To calculate how much yarn you'll need for a project, follow these steps:
        </p>
        <ul className="list-disc ml-8 space-y-2">
          <li>Make a sample as described above, and measure the width and length to find the area in cm².</li>
          <li>Weigh the sample using a letter-balance, then divide the weight (in grams) by the area (in cm²). This gives you the weight per cm².</li>
          <li>Calculate the area of the garment you want to knit (e.g., for a sweater: chest circumference × length).</li>
          <li>Multiply the area of the garment by the weight per cm² to get the total yarn required for the project.</li>
        </ul>
        <p className="mb-4">
          Example: A knitting sample measures 14.6 cm × 15.0 cm, with an area of 219 cm². The sample weighs 6 grams. 
          The weight per cm² is:
        </p>
        <blockquote className="border-l-4 border-gray-400 pl-4 italic">
          6 g ÷ 219 cm² = 0.027 g per cm²
        </blockquote>
        <p className="mb-4">
          For a child’s sweater with a body area of 2652 cm² and sleeve area of 1776 cm² (total area: 4428 cm²), the required yarn would be:
        </p>
        <blockquote className="border-l-4 border-gray-400 pl-4 italic">
          0.027 g × 4428 cm² = 119.56 grams (roughly 3 balls of 50g yarn)
        </blockquote>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Advanced Techniques: Expanded Samples</h2>
        <p className="mb-4">
          For garments that need to fit tightly, such as underwear or leggings, you’ll need to knit an expanded sample. 
          To do this, pin the sample down, stretch it by about 20%, and measure the number of stitches and rows per cm while it is stretched. 
          Be sure to measure it before and after stretching for the most accurate results.
        </p>
        <p className="mb-4">
          Expanded samples allow you to account for how much the fabric will stretch when worn. This is particularly useful for creating 
          garments that require close-fitting properties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Ratio Between Stitches and Rows</h2>
        <p className="mb-4">
          Understanding the ratio between stitches and rows is crucial for creating well-fitting garments. In most cases, this ratio 
          falls between 2:3 and 3:4, but it may vary depending on the yarn type and stitch size. 
        </p>
        <p className="mb-4">
          For example, with 2.74 stitches per cm and 4.0 rows per cm, the ratio is approximately 2:3. This ratio affects how you 
          increase or decrease stitches when shaping the garment, particularly around armholes or sleeve caps.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Knitleader Systems</h2>
        <p className="mb-4">
          Knitleader systems, such as those made by Brother and Royal, simplify the process of knitting garments based on samples. 
          Brother’s Knitleader uses a sample based on 40 stitches and 60 rows, while Royal’s Knitleader relies on a 10 cm × 10 cm 
          sample for its calculations.
        </p>
        <p className="mb-4">
          If you have stitch and row counts per cm, you can easily adjust patterns to fit your sample using the Knitleader. 
          This saves time on recalculations and ensures that your garment follows the exact measurements you need.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Ratio Calculations and Angle Tables</h2>
        <p className="mb-4">
          One advanced technique is to use angle tables to calculate how often to increase or decrease stitches, based on the ratio 
          of stitches and rows. If your pattern includes diagonal lines, such as raglan sleeves, this method helps you determine 
          the exact angle and frequency for increases or decreases.
        </p>
        <p className="mb-4">
          For example, a normal ratio of 2:3 would result in a decrease at every 2nd or 3rd row for a slanted armhole. This ratio 
          ensures that the slant follows the correct angle without distorting the fabric.
        </p>
      </section>
    </div>
  );
};

export default KnittingSample;
