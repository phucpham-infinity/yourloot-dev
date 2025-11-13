const DescriptionStore = ({
  title,
  description
}: {
  title: string
  description: string
}) => {
  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-3">
      <div className="text-white text-app-medium-14 font-black leading-[14px]">
        {title}
      </div>
      <div className="text-[#9E90CF] text-app-medium-14 leading-[14px]">
        {description}
      </div>
    </div>
  )
}

export default DescriptionStore
