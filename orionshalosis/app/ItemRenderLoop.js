"use client";

import Image from "next/image";

export default function ItemRenderLoop(item) {
  return (
    <div
      // style={{ background: url(`${item.image}`) }}
      className="max-w-24 relative aspect-square max-h-24 bg-cover bg-no-repeat"
    >
      <Image
        src={item.image}
        className="z-1 absolute left-0 top-0"
        height={200}
        width={200}
      />
      <p className="z-2 text-white">item.name</p>
    </div>
  );
}
