import Link from 'next/link';
import React from 'react'

export default function Announcement(props) {
    const announcementData = props.announcementData
    const title = props.title
    
  return (
    <div className='flex flex-col justify-start items-start w-full'>
        <div className="flex h-fit w-full justify-start items-center border-b-2 border-blue-400 text-2xl uppercase">
        <div className="w-fit p-2 text-xl font-bold text-white bg-blue-400 rounded-t-xl">
          {props.title}
        </div>
      </div>
        <ul className='divide-y-2 divide-gray-300'>
            {
                announcementData && announcementData?.map(item=>(
                    <li key={item?.id} className='flex flex-col hover:text-blue-500 text-red-400 px-3 py-1'>
                        <Link href={`/post/${item?.id}`}>{item?.title?.charAt(0)?.toUpperCase() + item?.title?.slice(1)?.toLowerCase()}</Link>
                        <span className='text-[12px] text-gray-500'>{item.createDate}</span>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
