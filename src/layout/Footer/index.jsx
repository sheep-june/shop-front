// import React from "react";

// const Footer = () => {
//     return (
//         <div className="flex h-20 justify-center items-center text-lg bg-white text-[#00C4C4]">
//             <div className="ml-4 text-sm flex flex-col items-start">
//                 <div className="flex items-center">
//                     {/* 김동영 */}
//                     キム・ドンヨン<span className="mx-1">→</span>
//                     <a
//                         href="https://github.com/Muroi6666"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="underline hover:text-cyan-600"
//                     >
//                         GitHub
//                     </a>
//                 </div>
//                 <div className="flex items-center">
//                     {/* 양준 */}
//                     ヤン•ジュン <span className="mx-1">→</span>
//                     <a
//                         href="https://github.com/sheep-june"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="underline hover:text-cyan-600"
//                     >
//                         GitHub
//                     </a>
//                 </div>
//                 <div className="flex items-center">
//                     {/* 이상영 */}
//                     イ•サンヨン <span className="mx-1">→</span>
//                     <a
//                         href="https://github.com/SANGYOUNGS"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="underline hover:text-cyan-600"
//                     >
//                         GitHub
//                     </a>
//                 </div>
//                 <div className="flex items-center">
//                     {/* 이윤수 */}
//                     イ・ユンス <span className="mx-1">→</span>
//                     <a
//                         href="https://github.com/tgjpas"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="underline hover:text-cyan-600"
//                     >
//                         GitHub
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Footer;
import React from "react";
import { FaGithub, FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#fdd9d9] text-gray-800 text-sm px-6 py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 왼쪽 회사 정보 */}
                <div>
                    <h1 className="text-3xl font-serif mb-4">買う売る</h1>
                    <div className="space-y-1">
                        <p>会社名 : (株)グローバル人</p>
                        <a
                            href="/location"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            事業所所在地 : (07250) ソウル特別市 永登浦区
                            永中路56 [シンハンビル 4階]
                        </a>
                        <p>事業者登録番号 : 884-81-01032</p>
                        <p>代表者 : キム・ソンス</p>
                        <p>生涯教育施設 : グローバル人 生涯教育院 第959号</p>
                        <p>電話番号 : 02-701-1712</p>
                        <p>Eメール : globalin01@naver.com</p>
                    </div>
                </div>

                {/* 중앙 Call center / Bank info */}
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold">CALL CENTER</h2>
                    <p className="text-xl font-bold">02-701-1712</p>
                    <p>MON-FRI : AM 09:30 ~ PM 10:00</p>
                    <p>LUNCH : PM 12:00 ~ PM 01:00</p>
                    <p>SAT, SUN, HOLIDAY OFF</p>

                    <h2 className="mt-6 text-lg font-semibold">BANK INFO</h2>
                    <p>口座番号 000000-00-000000</p>
                </div>

                {/* 오른쪽 GitHub / SNS */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">DEVELOPERS</h2>
                    <ul className="space-y-3 text-base">
                        {[
                            {
                                name: "キム・ドンヨン",
                                url: "https://github.com/Muroi6666",
                            },
                            {
                                name: "ヤン・ジュン",
                                url: "https://github.com/sheep-june",
                            },
                            {
                                name: "イ・サンヨン",
                                url: "https://github.com/SANGYOUNGS",
                            },
                            {
                                name: "イ・ユンス",
                                url: "https://github.com/tgjpas",
                            },
                        ].map((dev) => (
                            <li
                                key={dev.url}
                                className="flex items-center gap-4"
                            >
                                <span className="text-base font-medium w-28">
                                    {dev.name}
                                </span>
                                <a
                                    href={dev.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-2xl text-gray-700 hover:text-black"
                                >
                                    <FaGithub />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-4 mt-6 text-2xl text-gray-700">
                        <a
                            href="https://www.instagram.com/sheepjun/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#C13584]"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://www.facebook.com/sheep.june"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#3b5998]"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://github.com/sheep-june"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-black"
                        >
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-10">
                COPYRIGHT (c) (株)カウウル All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
