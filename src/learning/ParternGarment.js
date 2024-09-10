import React from 'react';

const PatternGarment = () => {
  return (
    <div className="w-full h-screen overflow-y-scroll p-8 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-6">Fitting Methods and Garment Patterns for Knitting Machines</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Fitting Methods</h2>
        <p className="mb-4">
          When knitting, you have the advantage of shaping without cutting and tucking like in sewing. Horizontal tucks, such as breast tucks, can be made with shortened rows by bringing needles into the resting position and turning the carriage. Vertical tucks require moving stitches with a transfer tool comb, which can take time. In some cases, you can convert a vertical tuck into a horizontal one by adjusting your pattern design.
        </p>
        <p className="mb-4">
          For example, if you want a tuck in the shoulder seam, you can move it to the armhole and disperse it over several rows by making 1 or 2 shortened rows every 4 or 6 rows. This method helps maintain a straight or slightly upward curve at the shoulder.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Basic Pattern for Fitting</h2>
        <p className="mb-4">
          You can design a basic pattern for knitting using the knitting to measure method. For instance, when constructing a breast tuck, use half the difference between the upper chest circumference (UC) and the breast circumference (B). Draw the pattern on chequered paper and adjust based on measurements like breast height and tuck depth.
        </p>
        <p className="mb-4">
          After marking out the breast point, you can cut and move pattern pieces to create space for tucks. This allows for accurate shaping without cutting fabric.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">How to Move Tucks</h2>
        <p className="mb-4">
          Once you’ve created a basic pattern with a breast tuck, you can move the tuck to different locations, such as sloping it downwards or shifting it to the shoulder seam if knitting sideways. By marking the desired location on both the main pattern and a transparent overlay, you can transfer and adjust tucks as needed for various garment designs.
        </p>
        <p className="mb-4">
          Moving tucks allows for more versatile garment shapes, helping you fit unique body types or specific design preferences.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Raglan Sleeves</h2>
        <p className="mb-4">
          Raglan sleeves are easiest to knit when the sloping line forms a 35° angle to the vertical. The front and back of the garment must be the same size, and the sloping line should start slightly below the sleeve hole and extend to the neckline. As you knit, decrease one stitch at the beginning of each row to shape the raglan sleeve correctly.
        </p>
        <p className="mb-4">
          For raglan with holes, you can knit the sleeves together with the body using shortened rows. This technique creates a decorative effect that is especially appealing on lightweight garments.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Sleeves</h2>
        <p className="mb-4">
          When knitting sleeves, calculate the number of stitches required for the upper arm circumference. The sleeve stitches come from both the front and back of the garment, supplemented by locked stitches in the middle. Begin by pulling up the sleeve stitches from the front and back, and knit shortened rows to adjust for any difference in row counts between the front and back.
        </p>
        <p className="mb-4">
          Once the shortened rows are complete, continue knitting the sleeve to the desired length, adjusting for the shoulder rounding as necessary.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Skirts</h2>
        <p className="mb-4">
          Skirts can be knit in various ways, such as in 4 pieces or half-round with a ribber. The width of the skirt determines how much rounding is needed at the waist and hem. For a fitted look, you can create tucks or pleats to control the extra width in the waist area.
        </p>
        <p className="mb-4">
          For half-circle skirts, knit the skirt in one piece with shortened rows, ensuring the waist is wide enough to decrease stitches for a waistband. You can also knit skirts sideways, adjusting the number of shortened rows based on the desired width.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Basic Pattern for Skirts</h2>
        <p className="mb-4">
          To create a fitted skirt, measure your waist, hip, and skirt length, adding at least 6-7 cm for comfort. Draw an arc from the waist to the hip for shaping, and use a transfer comb for knitting the waist tuck. You can adjust the skirt’s width by folding the pattern pieces to add more width in specific areas, such as the front and side panels.
        </p>
        <p className="mb-4">
          Figures 8 and 9 show examples of basic skirt patterns with varying levels of width and shaping. The skirt can be knit in 4 pieces or as a half-round design using both knitting machines and ribbers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Calculating Yarn for Skirts</h2>
        <p className="mb-4">
          To calculate the amount of yarn needed for a skirt, determine the area by multiplying the radius squared by 22/7 for a full circle (or half for a half-circle skirt). Weigh your knitting sample and calculate the weight per cm², then multiply by the skirt area to estimate the total yarn needed.
        </p>
        <p className="mb-4">
          Always allow for a little extra yarn for tucks, pleats, or other design features that might require additional material.
        </p>
      </section>
    </div>
  );
};

export default PatternGarment;
