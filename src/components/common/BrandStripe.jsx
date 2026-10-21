import React from 'react';

export default function BrandStripe() {
  return (
    <div className="h-2.5 w-full flex sticky top-0 z-50 shadow-sm">
      <div className="h-full w-1/4 bg-[#2F2677]" />
      <div className="h-full w-1/4 bg-[#008F3D]" />
      <div className="h-full w-1/4 bg-[#FDD900]" />
      <div className="h-full w-1/4 bg-[#E20111]" />
    </div>
  );
}
