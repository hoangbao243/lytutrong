"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  {
    thumb: "/uploads/images/2026/01/1767866220241-DHLD-1.jpg",
    full: "/uploads/images/2026/01/1767866220241-DHLD-1.jpg",
  },
  {
    thumb: "/uploads/images/2026/01/1767866735943-Ket_nap_doi_-1.jpg",
    full: "/uploads/images/2026/01/1767866735943-Ket_nap_doi_-1.jpg",
  },
  {
    thumb: "/uploads/images/2026/01/1767866220241-DHLD-1.jpg",
    full: "/uploads/images/2026/01/1767866220241-DHLD-1.jpg",
  },
  {
    thumb: "/uploads/images/2026/01/1767866735943-Ket_nap_doi_-1.jpg",
    full: "/uploads/images/2026/01/1767866735943-Ket_nap_doi_-1.jpg",
  },
  {
    thumb: "/uploads/images/2026/01/1767866220241-DHLD-1.jpg",
    full: "/uploads/images/2026/01/1767866220241-DHLD-1.jpg",
  },
  {
    thumb: "/uploads/images/2026/01/1767866735943-Ket_nap_doi_-1.jpg",
    full: "/uploads/images/2026/01/1767866735943-Ket_nap_doi_-1.jpg",
  },
  {
    thumb: "/uploads/images/2026/01/1767866220241-DHLD-1.jpg",
    full: "/uploads/images/2026/01/1767866220241-DHLD-1.jpg",
  },
  {
    thumb: "/uploads/images/2026/01/1767866735943-Ket_nap_doi_-1.jpg",
    full: "/uploads/images/2026/01/1767866735943-Ket_nap_doi_-1.jpg",
  },
  {
    thumb: "/uploads/images/2026/01/1767866220241-DHLD-1.jpg",
    full: "/uploads/images/2026/01/1767866220241-DHLD-1.jpg",
  },
  {
    thumb: "/uploads/images/2026/01/1767866735943-Ket_nap_doi_-1.jpg",
    full: "/uploads/images/2026/01/1767866735943-Ket_nap_doi_-1.jpg",
  },
];

export default function ImageGallery() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-4 max-w-3xl mx-auto w-full mt-2">
      {/* Featured image */}
      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
        <Image
          src={images[active].full}
          alt="Featured image"
          fill
          priority
          className="object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition
              ${
                active === index
                  ? "border-blue-500"
                  : "border-transparent hover:border-blue-400"
              }`}
          >
            <Image
              src={img.thumb}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
