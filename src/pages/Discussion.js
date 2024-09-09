import React from "react";
import Discuss from "../components/Discuss";

const Discussion = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold mb-8">Discussion</h1>
        <div className="space-y-6">
          <Discuss />
        </div>
    </div>
  );
};

export default Discussion;