import { useTranslation } from "react-i18next";
export default function TitlePgae() {
  const { t } = useTranslation();
  return (
    <div className=" p-10 bg-gradient-to-b from-[#3f3555] to-black rounded-2xl shadow-[6px_6px_16px_0px_rgba(22,28,22,0.25)] border border-white flex-col justify-start items-start gap-10 inline-flex overflow-hidden">
      <div className="w-96  bg-[#4b4379] rounded-full blur-3xl" />
      <div className="self-stretch h-40 flex-col justify-start items-start gap-5 flex">
        <div className="text-white text-2xl font-black font-['Satoshi']">
          {t("title.title")}
        </div>
        <div className="self-stretch text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
          {t("title.lastUpdated")}: 16.9.2024
          <br />
          1. {t("title.introduction")}
          <br />
          {t("title.introduction1")}
          <br />
          {t("title.introduction2")}
          <br />
          {t("title.introduction3")}
        </div>
      </div>
      <div className="w-48 h-10 p-5 bg-[#644ec7] rounded-2xl shadow-[-6px_-6px_24px_0px_rgba(148,95,255,0.15)] shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50)] border border-[#c2a1f1] justify-between items-center inline-flex">
        <div className="justify-start items-center gap-2.5 flex">
          <div className="text-center text-[#d8ceff] text-xs font-medium font-['Satoshi']">
            {t("title.deposit")}
          </div>
        </div>
      </div>
    </div>
  );
}
