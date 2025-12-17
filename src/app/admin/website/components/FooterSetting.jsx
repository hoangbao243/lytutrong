import React from 'react'

export default function FooterSetting() {
  const footerData = [{
    principal: "Trần Thị Lệ",
    year: "2025",
    address: "12 lý tự trọng, P.Hải Châu, TP Đà Nẵng",
    phone: "0985.145.906"
  }]
  const handleForm = (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("data",data);
  }
  return (
    <div>
      <p className='p-2 font-bold text-2xl'>Cài đặt Footer</p>
      <form onSubmit={e=>handleForm(e)}>
      {
        footerData && Object.entries(footerData[0]).map(([key, value])=>(
          <div key={key}>
            <p>{key == "principal" ? "Hiệu Trưởng" : key == "year" ? "Năm" : key == "address" ? "Địa Chỉ" : "Số Điện Thoại"}: {value}</p>
            <div className='flex items-center'>
              <img src="/images/icon/right-arrow.png" className='w-4 h-4' alt="" />
              <input type="text" name={key} id={key} placeholder={key}  className='border border-gray-200 m-2 rounded-sm w-50 p-2'/>
            </div>
          </div>
        ))
      }
      <button type='submit' className='p-2 bg-blue-300 rounded-2xl cursor-pointer'>submit</button>
      </form>
    </div>
    
  )
}
