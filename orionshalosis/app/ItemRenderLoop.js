'use client'
export default function ItemRenderLoop(array) {
  for (let item of array) {
    return (
        <>

      <div style={{ background: item.image }} className="item max-w-24 aspect-square max-h-24 bg-cover bg-no-repeat"  onmouseover="" />


      </>
    );
  }

  7;
}
