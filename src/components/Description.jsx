import { desciPara } from "../constants"

const Description = () => {
  return (
    <div className="py-14 lg:py-[130px]">
        {
            desciPara.map(({text}, index) => (
                <p className={` text-2xl px-[10vw] lg:text-[48px] lg:px-[225px] ${index == 2 ? "pb-6" : "pb-0"} ${index == 6 ? "text-[#36A6E2] pt-6" : "text-black"}`} key={text}>{text}</p>
            ))
        }
    </div>
  )
}

export default Description
