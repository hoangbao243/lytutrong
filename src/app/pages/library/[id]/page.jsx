"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import { capitalizeTitle } from "@/utils";
import Loader from "@/components/loader/Loader";
import toast from "react-hot-toast";

export default function ImageGallery() {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    try {
      const getImages = async () => {
        const res = await axios.get(`/api/image-post/${id}`);
        if (res.status == 200) {
          console.log(res.data);
          
          setTitle(res?.data?.title[0]);
          setImages(res?.data?.data);
        }
      };
      getImages();
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id]);

  return (
    <>
      {loading == true ? (
        <Loader></Loader>
      ) : (
        <div className="grid gap-4 max-w-3xl mx-auto w-full mt-2">
          <h1 className="text-2xl font-bold">
            {title && capitalizeTitle(title.title)}
          </h1>
          {/* Featured image */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            {images[0] && (
              <Image
                src={images[active].src}
                alt="Featured image"
                fill
                sizes="true"
                priority
                className="object-cover transition-all duration-300"
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-4">
            {images[0] &&
              images.map((img, index) => (
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
                    src={img.src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="true"
                    className="object-cover"
                  />
                </button>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
