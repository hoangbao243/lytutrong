import Link from "next/link";
import PostCard from "@/components/postCard/PostCard";

export default function Schoolnews2(props) {
  const data = props.props || [];

  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 bg-neutral-50 shadow ">
      <div className="flex h-fit w-full justify-between items-center border-b-2 border-blue-400 text-2xl uppercase">
        <div className="w-fit p-2 font-bold text-xl text-white bg-blue-400 rounded-t-xl">
          {props.title}
        </div>
        <Link
          href={`/pages/category/hoat-dong-giang-day`}
          className="flex text-[14px] capitalize text-gray-400 font-medium mt-4 mr-4"
        >
          <img
            src="/images/icon/arrow-down-2.png"
            className="w-3 h-3 mt-1 mr-1 "
            alt="see-more"
          />
          xem thêm...
        </Link>
      </div>

      <div className=" grid grid-cols-2 gap-2">
        {data &&
          data?.slice(0, 4)?.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
