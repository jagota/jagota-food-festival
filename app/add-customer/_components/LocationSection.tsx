"use client";
import InputChipComponent from "@/components/chip-component/InputChipComponent";
import { ChipItem } from "@/components/chip-component/chipItem.type";
import Menu from "@/components/chip-component/menu";
import MenuItem from "@/components/chip-component/menuItem";
import { FormInput } from "@/components/formInput";
import { useCustomerForm } from "./context/CustomerContext";
import { useEffect, useState } from "react";
import { Combobox } from "@/components/ui/ComboBox";
import { useCustomerType } from "@/context/CustomerTypeContext";

export type locationNameType = {name_e: string, name_t: string}
const provinces: locationNameType[] = [
    {
      "name_e": "Phetchabun",
      "name_t": "เพชรบูรณ์"
    },
    {
      "name_e": "Surat Thani",
      "name_t": "สุราษฎร์ธานี"
    },
    {
      "name_e": "Patthalung",
      "name_t": "พัทลุง"
    },
    {
      "name_e": "Sukhothai",
      "name_t": "สุโขทัย"
    },
    {
      "name_e": "Yala",
      "name_t": "ยะลา"
    },
    {
      "name_e": "Khon Kaen",
      "name_t": "ขอนแก่น"
    },
    {
      "name_e": "Ranong",
      "name_t": "ระนอง"
    },
    {
      "name_e": "Buri Ram",
      "name_t": "บุรีรัมย์"
    },
    {
      "name_e": "Songkhla",
      "name_t": "สงขลา"
    },
    {
      "name_e": " Phangฟnga",
      "name_t": "พังงา"
    },
    {
      "name_e": "Pattani",
      "name_t": "ปัตตานี"
    },
    {
      "name_e": " Trang",
      "name_t": "ตรัง"
    },
    {
      "name_e": "Si Sa Ket",
      "name_t": "ศรีสะเกษ"
    },
    {
      "name_e": "Maha Sarakham",
      "name_t": "มหาสารคาม"
    },
    {
      "name_e": "Surin",
      "name_t": "สุรินทร์"
    },
    {
      "name_e": "Nakhon Pathom",
      "name_t": "นครปฐม"
    },
    {
      "name_e": "Ubon Ratchathani",
      "name_t": "อุบลราชธานี"
    },
    {
      "name_e": "Udon Thani",
      "name_t": "อุดรธานี"
    },
    {
      "name_e": "Sakon Nakhon",
      "name_t": "สกลนคร"
    },
    {
      "name_e": " Nakhon Si Thammarat",
      "name_t": "นครศรีธรรมราช"
    },
    {
      "name_e": " Kamphaeng Phet",
      "name_t": "กำแพงเพชร"
    },
    {
      "name_e": "Mae Hong Son",
      "name_t": "แม่ฮ่องสอน"
    },
    {
      "name_e": "Krabi",
      "name_t": "กระบี่"
    },
    {
      "name_e": "Pathum Thani",
      "name_t": "ปทุมธานี"
    },
    {
      "name_e": " Chachoengsao",
      "name_t": "ฉะเชิงเทรา"
    },
    {
      "name_e": "Trat",
      "name_t": "ตราด"
    },
    {
      "name_e": "Satun",
      "name_t": "สตูล"
    },
    {
      "name_e": "Chaiyaphum",
      "name_t": "ชัยภูมิ"
    },
    {
      "name_e": " Sing Buri",
      "name_t": "สิงห์บุรี"
    },
    {
      "name_e": "Bangkok",
      "name_t": "กรุงเทพฯ"
    },
    {
      "name_e": "Chiang Mai",
      "name_t": "เชียงใหม่"
    },
    {
      "name_e": " Narathiwat",
      "name_t": "นราธิวาส"
    },
    {
      "name_e": " Phayao",
      "name_t": "พะเยา"
    },
    {
      "name_e": "Phetchaburi",
      "name_t": "เพชรบุรี"
    },
    {
      "name_e": "Lop Buri",
      "name_t": "ลพบุรี"
    },
    {
      "name_e": "Phitsanulok",
      "name_t": "พิษณุโลก"
    },
    {
      "name_e": "Amnat Charoen",
      "name_t": "อำนาจเจริญ"
    },
    {
      "name_e": "Nakhon Sawan",
      "name_t": "นครสวรรค์"
    },
    {
      "name_e": "Phichit",
      "name_t": "พิจิตร"
    },
    {
      "name_e": "Saraburi",
      "name_t": "สระบุรี"
    },
    {
      "name_e": "Suphan Buri",
      "name_t": "สุพรรณบุรี"
    },
    {
      "name_e": "Loei",
      "name_t": "เลย"
    },
    {
      "name_e": "Kanchanaburi",
      "name_t": "กาญจนบุรี"
    },
    {
      "name_e": "Uttaradit",
      "name_t": "อุตรดิตถ์"
    },
    {
      "name_e": "Uthai Thani",
      "name_t": "อุทัยธานี"
    },
    {
      "name_e": "  Nan",
      "name_t": "น่าน"
    },
    {
      "name_e": "Chumphon",
      "name_t": "ชุมพร"
    },
    {
      "name_e": "Lamphun",
      "name_t": "ลำพูน"
    },
    {
      "name_e": "Nong Khai",
      "name_t": "หนองคาย"
    },
    {
      "name_e": "Tak",
      "name_t": "ตาก"
    },
    {
      "name_e": "Nakhon Phanom",
      "name_t": "นครพนม"
    },
    {
      "name_e": " Phra Nakhon Si Ayutthaya",
      "name_t": "พระนครศรีอยุธยา"
    },
    {
      "name_e": "Nong Bua Lam Phu",
      "name_t": "หนองบัวลำภู"
    },
    {
      "name_e": "Rayong",
      "name_t": "ระยอง"
    },
    {
      "name_e": "Samut Songkhram",
      "name_t": "สมุทรสงคราม"
    },
    {
      "name_e": "Bung Kan",
      "name_t": "บึงกาฬ"
    },
    {
      "name_e": "Chon Buri",
      "name_t": "ชลบุรี"
    },
    {
      "name_e": " Nakhon Ratchasima",
      "name_t": "นครราชสีมา"
    },
    {
      "name_e": "Ang Thong",
      "name_t": "อ่างทอง"
    },
    {
      "name_e": "Chai Nat",
      "name_t": "ชัยนาท"
    },
    {
      "name_e": "Phrae",
      "name_t": "แพร่"
    },
    {
      "name_e": "Samut Prakan",
      "name_t": "สมุทรปราการ"
    },
    {
      "name_e": " Prachin Buri",
      "name_t": "ปราจีนบุรี"
    },
    {
      "name_e": "Samut Sakhon",
      "name_t": "สมุทรสาคร"
    },
    {
      "name_e": " Chanthaburi",
      "name_t": "จันทบุรี"
    },
    {
      "name_e": "Sa Kaeo",
      "name_t": "สระแก้ว"
    },
    {
      "name_e": "Ratchaburi",
      "name_t": "ราชบุรี"
    },
    {
      "name_e": " Prachuap Khiri Khan",
      "name_t": "ประจวบคีรีขันธ์"
    },
    {
      "name_e": "Kalasin",
      "name_t": "กาฬสินธุ์"
    },
    {
      "name_e": "Yasothon",
      "name_t": "ยโสธร"
    },
    {
      "name_e": "Mukdahan",
      "name_t": "มุกดาหาร"
    },
    {
      "name_e": "Lampang",
      "name_t": "ลำปาง"
    },
    {
      "name_e": "Roi Et",
      "name_t": "ร้อยเอ็ด"
    },
    {
      "name_e": "  Nakhon Nayok",
      "name_t": "นครนายก"
    },
    {
      "name_e": " Nonthaburi",
      "name_t": "นนทบุรี"
    },
    {
      "name_e": " Chiang Rai",
      "name_t": "เชียงราย"
    },
    {
      "name_e": "Phuket",
      "name_t": "ภูเก็ต"
    },
    {
      "name_e": "Prachuap Khiri Khan",
      "name_t": "ประจวบคีรีขันธ์"
    },
    {
      "name_e": "Narathiwat",
      "name_t": "นราธิวาส"
    }
  ];

const amphur: Record<string, locationNameType[]> = {
    "Phetchabun": [
      {
        "name_t": "ชนแดน",
        "name_e": "Chon Daen"
      },
      {
        "name_t": "น้ำหนาว",
        "name_e": "Nam Nao"
      },
      {
        "name_t": "บึงสามพัน",
        "name_e": "Bueng Sam Phan"
      },
      {
        "name_t": "วังโป่ง",
        "name_e": "Wang Pong"
      },
      {
        "name_t": "วิเชียรบุรี",
        "name_e": "Wichian Buri"
      },
      {
        "name_t": "ศรีเทพ",
        "name_e": "Si Thep"
      },
      {
        "name_t": "หนองไผ่",
        "name_e": "Nong Phai"
      },
      {
        "name_t": "หล่มสัก",
        "name_e": "Lom Sak"
      },
      {
        "name_t": "หล่มเก่า",
        "name_e": "Lom Kao"
      },
      {
        "name_t": "เขาค้อ",
        "name_e": "Khao Kho"
      },
      {
        "name_t": "เมืองเพชรบูรณ์",
        "name_e": "Mueang Phetchabun"
      }
    ],
    "Surat Thani": [
      {
        "name_t": "เกาะสมุย",
        "name_e": "Ko Samui"
      },
      {
        "name_t": "กาญจนดิษฐ์",
        "name_e": "Kanchanadit"
      },
      {
        "name_t": "คีรีรัฐนิคม",
        "name_e": "Khiri Rat Nikhom"
      },
      {
        "name_t": "ชัยบุรี",
        "name_e": "Chai Buri"
      },
      {
        "name_t": "ดอนสัก",
        "name_e": "Don Sak"
      },
      {
        "name_t": "ท่าฉาง",
        "name_e": "Tha Chang"
      },
      {
        "name_t": "ท่าชนะ",
        "name_e": "Tha Chana"
      },
      {
        "name_t": "บ้านตาขุน",
        "name_e": "Ban Ta Khun"
      },
      {
        "name_t": "บ้านนาสาร",
        "name_e": "Ban Na San"
      },
      {
        "name_t": "บ้านนาเดิม",
        "name_e": "Ban Na Doem"
      },
      {
        "name_t": "พนม",
        "name_e": "Phanom"
      },
      {
        "name_t": "พระแสง",
        "name_e": "Phrasaeng"
      },
      {
        "name_t": "พุนพิน",
        "name_e": "Phunphin"
      },
      {
        "name_t": "วิภาวดี",
        "name_e": "Vibhavadi"
      },
      {
        "name_t": "เกาะพะงัน",
        "name_e": "Ko Pha-ngan"
      },
      {
        "name_t": "เกาะสมุย",
        "name_e": "Ko Samui"
      },
      {
        "name_t": "เคียนซา",
        "name_e": "Khian Sa"
      },
      {
        "name_t": "เมืองสุราษฎร์ธานี",
        "name_e": "Mueang Surat Thani"
      },
      {
        "name_t": "เวียงสระ",
        "name_e": "Wiang Sa"
      },
      {
        "name_t": "ไชยา",
        "name_e": "Chaiya"
      }
    ],
    "Patthalung": [
      {
        "name_t": "กงหรา",
        "name_e": "Kong Ra"
      },
      {
        "name_t": "ควนขนุน",
        "name_e": "Khuan Khanun"
      },
      {
        "name_t": "ตะโหมด",
        "name_e": "Tamot"
      },
      {
        "name_t": "บางแก้ว",
        "name_e": "Bang Kaeo"
      },
      {
        "name_t": "ปากพะยูน",
        "name_e": "Pak Phayun"
      },
      {
        "name_t": "ป่าบอน",
        "name_e": "Pa Bon"
      },
      {
        "name_t": "ป่าพะยอม",
        "name_e": "Pa Phayom"
      },
      {
        "name_t": "ศรีนครินทร์",
        "name_e": "Srinagarindra"
      },
      {
        "name_t": "ศรีบรรพต",
        "name_e": "Si Banphot"
      },
      {
        "name_t": "เขาชัยสน",
        "name_e": "Khao Chaison"
      },
      {
        "name_t": "เมืองพัทลุง",
        "name_e": "Mueang Phatthalung"
      }
    ],
    "Sukhothai": [
      {
        "name_t": "กงไกรลาศ",
        "name_e": "Kong Krailat"
      },
      {
        "name_t": "คีรีมาศ",
        "name_e": "Khiri Mat"
      },
      {
        "name_t": "ทุ่งเสลี่ยม",
        "name_e": "Thung Saliam"
      },
      {
        "name_t": "บ้านด่านลานหอย",
        "name_e": "Ban Dan Lan Hoi"
      },
      {
        "name_t": "ศรีนคร",
        "name_e": "Si Nakhon"
      },
      {
        "name_t": "ศรีสัชนาลัย",
        "name_e": "Si Satchanalai"
      },
      {
        "name_t": "ศรีสำโรง",
        "name_e": "Si Samrong"
      },
      {
        "name_t": "สวรรคโลก",
        "name_e": "Sawankhalok"
      },
      {
        "name_t": "เมืองสุโขทัย",
        "name_e": "Mueang Sukhothai"
      }
    ],
    "Yala": [
      {
        "name_t": "กรงปินัง",
        "name_e": "Krong Pinang"
      },
      {
        "name_t": "กาบัง",
        "name_e": "Kabang"
      },
      {
        "name_t": "ธารโต",
        "name_e": "Than To"
      },
      {
        "name_t": "บันนังสตา",
        "name_e": "Bannang Sata"
      },
      {
        "name_t": "ยะหา",
        "name_e": "Yaha"
      },
      {
        "name_t": "รามัน",
        "name_e": "Raman"
      },
      {
        "name_t": "เบตง",
        "name_e": "Betong"
      },
      {
        "name_t": "เมืองยะลา",
        "name_e": "Mueang Yala"
      }
    ],
    "Khon Kaen": [
      {
        "name_t": "กระนวน",
        "name_e": "Kranuan"
      },
      {
        "name_t": "ชนบท",
        "name_e": "Chonnabot"
      },
      {
        "name_t": "ชุมแพ",
        "name_e": "Chum Phae"
      },
      {
        "name_t": "ซำสูง",
        "name_e": "Sam Sung"
      },
      {
        "name_t": "น้ำพอง",
        "name_e": "Nam Phong"
      },
      {
        "name_t": "บ้านฝาง",
        "name_e": "Ban Fang"
      },
      {
        "name_t": "บ้านแฮด",
        "name_e": "Ban Haet"
      },
      {
        "name_t": "บ้านไผ่",
        "name_e": "Ban Phai"
      },
      {
        "name_t": "พระยืน",
        "name_e": "Phra Yuen"
      },
      {
        "name_t": "พล",
        "name_e": "Phon"
      },
      {
        "name_t": "ภูผาม่าน",
        "name_e": "Phu Pha Man"
      },
      {
        "name_t": "ภูเวียง",
        "name_e": "Phu Wiang"
      },
      {
        "name_t": "มัญจาคีรี",
        "name_e": "Mancha Khiri"
      },
      {
        "name_t": "สีชมพู",
        "name_e": "Si Chomphu"
      },
      {
        "name_t": "หนองนาคำ",
        "name_e": "Nong Na Kham"
      },
      {
        "name_t": "หนองสองห้อง",
        "name_e": "Nong Song Hong"
      },
      {
        "name_t": "หนองเรือ",
        "name_e": "Nong Ruea"
      },
      {
        "name_t": "อุบลรัตน์",
        "name_e": "Ubolratana"
      },
      {
        "name_t": "เขาสวนกวาง",
        "name_e": "Khao Suan Kwang"
      },
      {
        "name_t": "เปือยน้อย",
        "name_e": "Pueai Noi"
      },
      {
        "name_t": "เมืองขอนแก่น",
        "name_e": "Mueang Khon Kaen"
      },
      {
        "name_t": "แวงน้อย",
        "name_e": "Waeng Noi"
      },
      {
        "name_t": "แวงใหญ่",
        "name_e": "Waeng Yai"
      },
      {
        "name_t": "โคกโพธิ์ไชย",
        "name_e": "Khok Pho Chai"
      },
      {
        "name_t": "โนนศิลา",
        "name_e": "Non Sila"
      }
    ],
    "Ranong": [
      {
        "name_t": "กระบุรี",
        "name_e": "Kra Buri"
      },
      {
        "name_t": "กะเปอร์",
        "name_e": "Kapoe"
      },
      {
        "name_t": "ละอุ่น",
        "name_e": "La-un"
      },
      {
        "name_t": "สุขสำราญ",
        "name_e": "Suk Samran"
      },
      {
        "name_t": "เมืองระนอง",
        "name_e": "Mueang Ranong"
      }
    ],
    "Buri Ram": [
      {
        "name_t": "กระสัง",
        "name_e": "Krasang"
      },
      {
        "name_t": "คูเมือง",
        "name_e": "Khu Mueang"
      },
      {
        "name_t": "ชำนิ",
        "name_e": "Chamni"
      },
      {
        "name_t": "นางรอง",
        "name_e": "Nang Rong"
      },
      {
        "name_t": "นาโพธิ์",
        "name_e": "Na Pho"
      },
      {
        "name_t": "บ้านกรวด",
        "name_e": "Ban Kruat"
      },
      {
        "name_t": "บ้านด่าน",
        "name_e": "Ban Dan"
      },
      {
        "name_t": "บ้านใหม่ไชยพจน์",
        "name_e": "Ban Mai Chaiyapot"
      },
      {
        "name_t": "ประโคนชัย",
        "name_e": "Prakhon Chai"
      },
      {
        "name_t": "ปะคำ",
        "name_e": "Pakham"
      },
      {
        "name_t": "พลับพลาชัย",
        "name_e": "Phlapphla Chai"
      },
      {
        "name_t": "พุทไธสง",
        "name_e": "Phutthaisong"
      },
      {
        "name_t": "ละหานทราย",
        "name_e": "Lahan Sai"
      },
      {
        "name_t": "ลำปลายมาศ",
        "name_e": "Lam Plai Mat"
      },
      {
        "name_t": "สตึก",
        "name_e": "Satuek"
      },
      {
        "name_t": "หนองกี่",
        "name_e": "Nong Ki"
      },
      {
        "name_t": "หนองหงส์",
        "name_e": "Nong Hong"
      },
      {
        "name_t": "ห้วยราช",
        "name_e": "Huai Rat"
      },
      {
        "name_t": "เฉลิมพระเกียรติ",
        "name_e": "Chaloem Phra Kiat"
      },
      {
        "name_t": "เมืองบุรีรัมย์",
        "name_e": "Mueang Buri Ram"
      },
      {
        "name_t": "แคนดง",
        "name_e": "Khaen Dong"
      },
      {
        "name_t": "โนนดินแดง",
        "name_e": "Non Din Daeng"
      },
      {
        "name_t": "โนนสุวรรณ",
        "name_e": "Non Suwan"
      }
    ],
    "Songkhla": [
      {
        "name_t": "กระแสสินธุ์",
        "name_e": "Krasae Sin"
      },
      {
        "name_t": "คลองหอยโข่ง",
        "name_e": "Khlong Hoi Khong"
      },
      {
        "name_t": "ควนเนียง",
        "name_e": "Khuan Niang"
      },
      {
        "name_t": "จะนะ",
        "name_e": "Chana"
      },
      {
        "name_t": "นาทวี",
        "name_e": "Na Thawi"
      },
      {
        "name_t": "นาหม่อม",
        "name_e": "Na Mom"
      },
      {
        "name_t": "บางกล่ำ",
        "name_e": "Bang Klam"
      },
      {
        "name_t": "ระโนด",
        "name_e": "Ranot"
      },
      {
        "name_t": "รัตภูมิ",
        "name_e": "Rattaphum"
      },
      {
        "name_t": "สทิงพระ",
        "name_e": "Sathing Phra"
      },
      {
        "name_t": "สะบ้าย้อย",
        "name_e": "Saba Yoi"
      },
      {
        "name_t": "สะเดา",
        "name_e": "Sadao"
      },
      {
        "name_t": "สิงหนคร",
        "name_e": "Singhanakhon"
      },
      {
        "name_t": "หาดใหญ่",
        "name_e": "Hat Yai"
      },
      {
        "name_t": "เทพา",
        "name_e": "Thepha"
      },
      {
        "name_t": "เมืองสงขลา",
        "name_e": "Mueang Songkhla"
      }
    ],
    " Phangฟnga": [
      {
        "name_t": "กะปง",
        "name_e": "Kapong"
      },
      {
        "name_t": "คุระบุรี",
        "name_e": "Khura Buri"
      },
      {
        "name_t": "ตะกั่วทุ่ง",
        "name_e": "Takua Thung"
      },
      {
        "name_t": "ตะกั่วป่า",
        "name_e": "Takua Pa"
      },
      {
        "name_t": "ทับปุด",
        "name_e": "Thap Put"
      },
      {
        "name_t": "ท้ายเหมือง",
        "name_e": "Thai Mueang"
      },
      {
        "name_t": "เกาะยาว",
        "name_e": "Ko Yao"
      },
      {
        "name_t": "เมืองพังงา",
        "name_e": "Mueang Phangฟnga"
      }
    ],
    "Pattani": [
      {
        "name_t": "กะพ้อ",
        "name_e": "Kapho"
      },
      {
        "name_t": "ทุ่งยางแดง",
        "name_e": "Thung Yang Daeng"
      },
      {
        "name_t": "ปะนาเระ",
        "name_e": "Panare"
      },
      {
        "name_t": "มายอ",
        "name_e": "Mayo"
      },
      {
        "name_t": "ยะรัง",
        "name_e": "Yarang"
      },
      {
        "name_t": "ยะหริ่ง",
        "name_e": "Yaring"
      },
      {
        "name_t": "สายบุรี",
        "name_e": "Sai Buri"
      },
      {
        "name_t": "หนองจิก",
        "name_e": "Nong Chik"
      },
      {
        "name_t": "เมืองปัตตานี",
        "name_e": "Mueang Pattani"
      },
      {
        "name_t": "แม่ลาน",
        "name_e": "Mae Lan"
      },
      {
        "name_t": "โคกโพธิ์",
        "name_e": "Khok Pho"
      },
      {
        "name_t": "ไม้แก่น",
        "name_e": "Mai Kaen"
      }
    ],
    " Trang": [
      {
        "name_t": "กันตัง",
        "name_e": "Kantang"
      },
      {
        "name_t": "นาโยง",
        "name_e": "Na Yong"
      },
      {
        "name_t": "ปะเหลียน",
        "name_e": "Palian"
      },
      {
        "name_t": "ย่านตาขาว",
        "name_e": "Yan Ta Khao"
      },
      {
        "name_t": "รัษฎา",
        "name_e": "Ratsada"
      },
      {
        "name_t": "วังวิเศษ",
        "name_e": "Wang Wiset"
      },
      {
        "name_t": "สิเกา",
        "name_e": "Sikao"
      },
      {
        "name_t": "หาดสำราญ",
        "name_e": "Hat Samran"
      },
      {
        "name_t": "ห้วยยอด",
        "name_e": "Huai Yot"
      },
      {
        "name_t": "เมืองตรัง",
        "name_e": "Mueang Trang"
      }
    ],
    "Si Sa Ket": [
      {
        "name_t": "กันทรลักษ์",
        "name_e": "Kantharalak"
      },
      {
        "name_t": "กันทรารมย์",
        "name_e": "Kanthararom"
      },
      {
        "name_t": "ขุขันธ์",
        "name_e": "Khukhan"
      },
      {
        "name_t": "ขุนหาญ",
        "name_e": "Khun Han"
      },
      {
        "name_t": "น้ำเกลี้ยง",
        "name_e": "Nam Kliang"
      },
      {
        "name_t": "บึงบูรพ์",
        "name_e": "Bueng Bun"
      },
      {
        "name_t": "ปรางค์กู่",
        "name_e": "Prang Ku"
      },
      {
        "name_t": "พยุห์",
        "name_e": "Phayu"
      },
      {
        "name_t": "ภูสิงห์",
        "name_e": "Phu Sing"
      },
      {
        "name_t": "ยางชุมน้อย",
        "name_e": "Yang Chum Noi"
      },
      {
        "name_t": "ราษีไศล",
        "name_e": "Rasi Salai"
      },
      {
        "name_t": "วังหิน",
        "name_e": "Wang Hin"
      },
      {
        "name_t": "ศรีรัตนะ",
        "name_e": "Si Rattana"
      },
      {
        "name_t": "ศิลาลาด",
        "name_e": "Sila Lat"
      },
      {
        "name_t": "ห้วยทับทัน",
        "name_e": "Huai Thap Than"
      },
      {
        "name_t": "อุทุมพรพิสัย",
        "name_e": "Uthumphon Phisai"
      },
      {
        "name_t": "เบญจลักษ์",
        "name_e": "Benchalak"
      },
      {
        "name_t": "เมืองจันทร์",
        "name_e": "Mueang Chan"
      },
      {
        "name_t": "เมืองศรีสะเกษ",
        "name_e": "Mueang Si Sa Ket"
      },
      {
        "name_t": "โนนคูณ",
        "name_e": "Non Khun"
      },
      {
        "name_t": "โพธิ์ศรีสุวรรณ",
        "name_e": "Pho Si Suwan"
      },
      {
        "name_t": "ไพรบึง",
        "name_e": "Phrai Bueng"
      }
    ],
    "Maha Sarakham": [
      {
        "name_t": "กันทรวิชัย",
        "name_e": "Kantharawichai"
      },
      {
        "name_t": "กุดรัง",
        "name_e": "Kut Rang"
      },
      {
        "name_t": "ชื่นชม",
        "name_e": "Chuen Chom"
      },
      {
        "name_t": "นาดูน",
        "name_e": "Na Dun"
      },
      {
        "name_t": "นาเชือก",
        "name_e": "Na Chueak"
      },
      {
        "name_t": "บรบือ",
        "name_e": "Borabue"
      },
      {
        "name_t": "พยัคฆภูมิพิสัย",
        "name_e": "Phayakkhaphum Phisai"
      },
      {
        "name_t": "ยางสีสุราช",
        "name_e": "Yang Sisurat"
      },
      {
        "name_t": "วาปีปทุม",
        "name_e": "Wapi Pathum"
      },
      {
        "name_t": "เชียงยืน",
        "name_e": "Chiang Yuen"
      },
      {
        "name_t": "เมืองมหาสารคาม",
        "name_e": "Mueang Maha Sarakham"
      },
      {
        "name_t": "แกดำ",
        "name_e": "Kae Dam"
      },
      {
        "name_t": "โกสุมพิสัย",
        "name_e": "Kosum Phisai"
      }
    ],
    "Surin": [
      {
        "name_t": "กาบเชิง",
        "name_e": "Kap Choeng"
      },
      {
        "name_t": "จอมพระ",
        "name_e": "Chom Phra"
      },
      {
        "name_t": "ชุมพลบุรี",
        "name_e": "Chumphon Buri"
      },
      {
        "name_t": "ท่าตูม",
        "name_e": "Tha Tum"
      },
      {
        "name_t": "บัวเชด",
        "name_e": "Buachet"
      },
      {
        "name_t": "ปราสาท",
        "name_e": "Prasat"
      },
      {
        "name_t": "พนมดงรัก",
        "name_e": "Phanom Dong Rak"
      },
      {
        "name_t": "รัตนบุรี",
        "name_e": "Rattanaburi"
      },
      {
        "name_t": "ลำดวน",
        "name_e": "Lamduan"
      },
      {
        "name_t": "ศรีณรงค์",
        "name_e": "Si Narong"
      },
      {
        "name_t": "ศีขรภูมิ",
        "name_e": "Sikhoraphum"
      },
      {
        "name_t": "สนม",
        "name_e": "Sanom"
      },
      {
        "name_t": "สังขะ",
        "name_e": "Sangkha"
      },
      {
        "name_t": "สำโรงทาบ",
        "name_e": "Samrong Thap"
      },
      {
        "name_t": "เขวาสินรินทร์",
        "name_e": "Khwao Sinrin"
      },
      {
        "name_t": "เมืองสุรินทร์",
        "name_e": "Mueang Surin"
      },
      {
        "name_t": "โนนนารายณ์",
        "name_e": "Non Narai"
      }
    ],
    "Nakhon Pathom": [
      {
        "name_t": "กำแพงแสน",
        "name_e": "Kamphaeng Saen"
      },
      {
        "name_t": "ดอนตูม",
        "name_e": "Don Tum"
      },
      {
        "name_t": "นครชัยศรี",
        "name_e": "Nakhon Chai Si"
      },
      {
        "name_t": "บางเลน",
        "name_e": "Bang Len"
      },
      {
        "name_t": "พุทธมณฑล",
        "name_e": "Phutthamonthon"
      },
      {
        "name_t": "สามพราน",
        "name_e": "Sam Phran"
      },
      {
        "name_t": "เมืองนครปฐม",
        "name_e": "Mueang Nakhon Pathom"
      }
    ],
    "Ubon Ratchathani": [
      {
        "name_t": "กุดข้าวปุ้น",
        "name_e": "Kut Khaopun"
      },
      {
        "name_t": "ดอนมดแดง",
        "name_e": "Don Mot Daeng"
      },
      {
        "name_t": "ตระการพืชผล",
        "name_e": "Trakan Phuet Phon"
      },
      {
        "name_t": "ตาลสุม",
        "name_e": "Tan Sum"
      },
      {
        "name_t": "ทุ่งศรีอุดม",
        "name_e": "Thung Si Udom"
      },
      {
        "name_t": "นาจะหลวย",
        "name_e": "Na Chaluai"
      },
      {
        "name_t": "นาตาล",
        "name_e": "Na Tan"
      },
      {
        "name_t": "นาเยีย",
        "name_e": "Na Yia"
      },
      {
        "name_t": "น้ำขุ่น",
        "name_e": "Nam Khun"
      },
      {
        "name_t": "น้ำยืน",
        "name_e": "Nam Yuen"
      },
      {
        "name_t": "บุณฑริก",
        "name_e": "Buntharik"
      },
      {
        "name_t": "พิบูลมังสาหาร",
        "name_e": "Phibun Mangsahan"
      },
      {
        "name_t": "ม่วงสามสิบ",
        "name_e": "Muang Sam Sip"
      },
      {
        "name_t": "วารินชำราบ",
        "name_e": "Warin Chamrap"
      },
      {
        "name_t": "ศรีเมืองใหม่",
        "name_e": "Si Mueang Mai"
      },
      {
        "name_t": "สว่างวีระวงศ์",
        "name_e": "Sawang Wirawong"
      },
      {
        "name_t": "สำโรง",
        "name_e": "Samrong"
      },
      {
        "name_t": "สิรินธร",
        "name_e": "Sirindhorn"
      },
      {
        "name_t": "เขมราฐ",
        "name_e": "Khemarat"
      },
      {
        "name_t": "เขื่องใน",
        "name_e": "Khueang Nai"
      },
      {
        "name_t": "เดชอุดม",
        "name_e": "Det Udom"
      },
      {
        "name_t": "เมืองอุบลราชธานี",
        "name_e": "Mueang Ubon Ratchathani"
      },
      {
        "name_t": "เหล่าเสือโก้ก",
        "name_e": "Lao Suea Kok"
      },
      {
        "name_t": "โขงเจียม",
        "name_e": "Khong Chiam"
      },
      {
        "name_t": "โพธิ์ไทร",
        "name_e": "Pho Sai"
      }
    ],
    "Udon Thani": [
      {
        "name_t": "กุดจับ",
        "name_e": "Kut Chap"
      },
      {
        "name_t": "กุมภวาปี",
        "name_e": "Kumphawapi"
      },
      {
        "name_t": "กู่แก้ว",
        "name_e": "Ku Kaeo"
      },
      {
        "name_t": "ทุ่งฝน",
        "name_e": "Thung Fon"
      },
      {
        "name_t": "นายูง",
        "name_e": "Na Yung"
      },
      {
        "name_t": "น้ำโสม",
        "name_e": "Nam Som"
      },
      {
        "name_t": "บ้านดุง",
        "name_e": "Ban Dung"
      },
      {
        "name_t": "บ้านผือ",
        "name_e": "Ban Phue"
      },
      {
        "name_t": "ประจักษ์ศิลปาคม",
        "name_e": "Prachak Sinlapakhom"
      },
      {
        "name_t": "พิบูลย์รักษ์",
        "name_e": "Phibun Rak"
      },
      {
        "name_t": "วังสามหมอ",
        "name_e": "Wang Sam mo"
      },
      {
        "name_t": "ศรีธาตุ",
        "name_e": "Si That"
      },
      {
        "name_t": "สร้างคอม",
        "name_e": "Sang Khom"
      },
      {
        "name_t": "หนองวัวซอ",
        "name_e": "Nong Wua So"
      },
      {
        "name_t": "หนองหาน",
        "name_e": "Nong Han"
      },
      {
        "name_t": "หนองแสง",
        "name_e": "Nong Saeng"
      },
      {
        "name_t": "เพ็ญ",
        "name_e": "Phen"
      },
      {
        "name_t": "เมืองอุดรธานี",
        "name_e": "Mueang Udon Thani"
      },
      {
        "name_t": "โนนสะอาด",
        "name_e": "Non Sa-at"
      },
      {
        "name_t": "ไชยวาน",
        "name_e": "Chai Wan"
      }
    ],
    "Sakon Nakhon": [
      {
        "name_t": "กุดบาก",
        "name_e": "Kut Bak"
      },
      {
        "name_t": "กุสุมาลย์",
        "name_e": "Kusuman"
      },
      {
        "name_t": "คำตากล้า",
        "name_e": "Kham Ta Kla"
      },
      {
        "name_t": "นิคมน้ำอูน",
        "name_e": "Nikhom Nam Un"
      },
      {
        "name_t": "บ้านม่วง",
        "name_e": "Ban Muang"
      },
      {
        "name_t": "พรรณานิคม",
        "name_e": "Phanna Nikhom"
      },
      {
        "name_t": "พังโคน",
        "name_e": "Phang Khon"
      },
      {
        "name_t": "ภูพาน",
        "name_e": "Phu Phan"
      },
      {
        "name_t": "วานรนิวาส",
        "name_e": "Wanon Niwat"
      },
      {
        "name_t": "วาริชภูมิ",
        "name_e": "Waritchaphum"
      },
      {
        "name_t": "สว่างแดนดิน",
        "name_e": "Sawang Daen Din"
      },
      {
        "name_t": "ส่องดาว",
        "name_e": "Song Dao"
      },
      {
        "name_t": "อากาศอำนวย",
        "name_e": "Akat Amnuai"
      },
      {
        "name_t": "เจริญศิลป์",
        "name_e": "Charoen Sin"
      },
      {
        "name_t": "เต่างอย",
        "name_e": "Tao Ngoi"
      },
      {
        "name_t": "เมืองสกลนคร",
        "name_e": "Mueang Sakon Nakhon"
      },
      {
        "name_t": "โคกศรีสุพรรณ",
        "name_e": "Khok Si Suphan"
      },
      {
        "name_t": "โพนนาแก้ว",
        "name_e": "Phon Na Kaeo"
      }
    ],
    " Nakhon Si Thammarat": [
      {
        "name_t": "ขนอม",
        "name_e": "Khanom"
      },
      {
        "name_t": "จุฬาภรณ์",
        "name_e": "Chulabhorn"
      },
      {
        "name_t": "ฉวาง",
        "name_e": "Chawang"
      },
      {
        "name_t": "ชะอวด",
        "name_e": "Cha-uat"
      },
      {
        "name_t": "ช้างกลาง",
        "name_e": "Chang Klang "
      },
      {
        "name_t": "ถ้ำพรรณรา",
        "name_e": "Tham Phannara"
      },
      {
        "name_t": "ทุ่งสง",
        "name_e": "Thung Song"
      },
      {
        "name_t": "ทุ่งใหญ่",
        "name_e": "Thung Yai"
      },
      {
        "name_t": "ท่าศาลา",
        "name_e": "Tha Sala"
      },
      {
        "name_t": "นบพิตำ",
        "name_e": "Nopphitam"
      },
      {
        "name_t": "นาบอน",
        "name_e": "Na Bon"
      },
      {
        "name_t": "บางขัน",
        "name_e": "Bang Khan"
      },
      {
        "name_t": "ปากพนัง",
        "name_e": "Pak Phanang"
      },
      {
        "name_t": "พรหมคีรี",
        "name_e": "Phrom Khiri"
      },
      {
        "name_t": "พระพรหม",
        "name_e": "Phra Phrom"
      },
      {
        "name_t": "พิปูน",
        "name_e": "Phipun"
      },
      {
        "name_t": "ร่อนพิบูลย์",
        "name_e": "Ron Phibun"
      },
      {
        "name_t": "ลานสกา",
        "name_e": "Lan Saka"
      },
      {
        "name_t": "สิชล",
        "name_e": "Sichon"
      },
      {
        "name_t": "หัวไทร",
        "name_e": "Hua Sai"
      },
      {
        "name_t": "เฉลิมพระเกียรติ",
        "name_e": "Chaloem Phra Kiat"
      },
      {
        "name_t": "เชียรใหญ่",
        "name_e": "Chian Yai"
      },
      {
        "name_t": "เมืองนครศรีธรรมราช",
        "name_e": "Mueang Nakhon Si Thammarat"
      }
    ],
    " Kamphaeng Phet": [
      {
        "name_t": "ขาณุวรลักษบุรี",
        "name_e": "Khanu Woralaksaburi"
      },
      {
        "name_t": "คลองขลุง",
        "name_e": "Khlong Khlung"
      },
      {
        "name_t": "คลองลาน",
        "name_e": "Khlong Lan"
      },
      {
        "name_t": "ทรายทองวัฒนา",
        "name_e": "Sai Thong Watthana"
      },
      {
        "name_t": "บึงสามัคคี",
        "name_e": "Bueng Samakkhi"
      },
      {
        "name_t": "ปางศิลาทอง",
        "name_e": "Pang Sila Thong"
      },
      {
        "name_t": "พรานกระต่าย",
        "name_e": "Phran Kratai"
      },
      {
        "name_t": "ลานกระบือ",
        "name_e": "Lan Krabue"
      },
      {
        "name_t": "เมืองกำแพงเพชร",
        "name_e": "Mueang Kamphaeng Phet"
      },
      {
        "name_t": "โกสัมพีนคร",
        "name_e": "Kosamphi Nakhon"
      },
      {
        "name_t": "ไทรงาม",
        "name_e": "Sai Ngam"
      }
    ],
    "Mae Hong Son": [
      {
        "name_t": "ขุนยวม",
        "name_e": "Khun Yuam"
      },
      {
        "name_t": "ปางมะผ้า",
        "name_e": "Pang Mapha"
      },
      {
        "name_t": "ปาย",
        "name_e": "Pai"
      },
      {
        "name_t": "สบเมย",
        "name_e": "Sop Moei"
      },
      {
        "name_t": "เมืองแม่ฮ่องสอน",
        "name_e": "Mueang Mae Hong Son"
      },
      {
        "name_t": "แม่ลาน้อย",
        "name_e": "Mae La Noi"
      },
      {
        "name_t": "แม่สะเรียง",
        "name_e": "Mae Sariang"
      }
    ],
    "Krabi": [
      {
        "name_t": "คลองท่อม",
        "name_e": "Khlong Thom"
      },
      {
        "name_t": "ปลายพระยา",
        "name_e": "Plai Phraya"
      },
      {
        "name_t": "ลำทับ",
        "name_e": "Lam Thap"
      },
      {
        "name_t": "อ่าวลึก",
        "name_e": "Ao Luek"
      },
      {
        "name_t": "เกาะลันตา",
        "name_e": "Ko Lanta"
      },
      {
        "name_t": "เขาพนม",
        "name_e": "Khao Phanom"
      },
      {
        "name_t": "เมืองกระบี่",
        "name_e": "Mueang Krabi"
      },
      {
        "name_t": "เหนือคลอง",
        "name_e": "Nuea Khlong"
      }
    ],
    "Pathum Thani": [
      {
        "name_t": "คลองหลวง",
        "name_e": "Khlong Luang"
      },
      {
        "name_t": "ธัญบุรี",
        "name_e": "Thanyaburi"
      },
      {
        "name_t": "ลำลูกกา",
        "name_e": "Lam Luk Ka"
      },
      {
        "name_t": "สามโคก",
        "name_e": "Sam Khok"
      },
      {
        "name_t": "หนองเสือ",
        "name_e": "Nong Suea"
      },
      {
        "name_t": "เมืองปทุมธานี",
        "name_e": "Mueang Pathum Thani"
      },
      {
        "name_t": "ลาดหลุมแก้ว",
        "name_e": "Lat Lum Kaeo"
      },
      {
        "name_t": "สามโคก",
        "name_e": "Sam Khok"
      },
      {
        "name_t": "เมืองปทุมธานี",
        "name_e": "Mueang Pathum Thani"
      }
    ],
    " Chachoengsao": [
      {
        "name_t": "คลองเขื่อน",
        "name_e": "Khlong Khuean"
      },
      {
        "name_t": "ท่าตะเกียบ",
        "name_e": "Tha Takiab"
      },
      {
        "name_t": "บางคล้า",
        "name_e": "Bang Khla"
      },
      {
        "name_t": "บางน้ำเปรี้ยว",
        "name_e": "Bang Nam Priao"
      },
      {
        "name_t": "บางปะกง",
        "name_e": "Bang Pakong"
      },
      {
        "name_t": "บ้านโพธิ์",
        "name_e": "Ban Pho"
      },
      {
        "name_t": "พนมสารคาม",
        "name_e": "Phanom Sarakham"
      },
      {
        "name_t": "ราชสาส์น",
        "name_e": "Ratchasan"
      },
      {
        "name_t": "สนามชัยเขต",
        "name_e": "Sanam Chai Khet"
      },
      {
        "name_t": "เมืองฉะเชิงเทรา",
        "name_e": "Mueang Chachoengsao"
      },
      {
        "name_t": "แปลงยาว",
        "name_e": "Plaeng Yao"
      }
    ],
    "Trat": [
      {
        "name_t": "คลองใหญ่",
        "name_e": "Khlong Yai"
      },
      {
        "name_t": "บ่อไร่",
        "name_e": "Bo Rai"
      },
      {
        "name_t": "เกาะกูด",
        "name_e": "Ko Kut"
      },
      {
        "name_t": "เกาะช้าง",
        "name_e": "Ko Chang"
      },
      {
        "name_t": "เขาสมิง",
        "name_e": "Khao Saming"
      },
      {
        "name_t": "เมืองตราด",
        "name_e": "Mueang Trat"
      },
      {
        "name_t": "แหลมงอบ",
        "name_e": "Laem Ngop"
      }
    ],
    "Satun": [
      {
        "name_t": "ควนกาหลง",
        "name_e": "Khuan Kalong"
      },
      {
        "name_t": "ควนโดน",
        "name_e": "Khuan Don"
      },
      {
        "name_t": "ทุ่งหว้า",
        "name_e": "Thung Wa"
      },
      {
        "name_t": "ท่าแพ",
        "name_e": "Tha Phae"
      },
      {
        "name_t": "มะนัง",
        "name_e": "Manang"
      },
      {
        "name_t": "ละงู",
        "name_e": "La-ngu"
      },
      {
        "name_t": "เมืองสตูล",
        "name_e": "Mueang Satun"
      }
    ],
    "Chaiyaphum": [
      {
        "name_t": "คอนสวรรค์",
        "name_e": "Khon Sawan"
      },
      {
        "name_t": "คอนสาร",
        "name_e": "Khon San"
      },
      {
        "name_t": "จัตุรัส",
        "name_e": "Chatturat"
      },
      {
        "name_t": "ซับใหญ่",
        "name_e": "Sap Yai"
      },
      {
        "name_t": "บำเหน็จณรงค์",
        "name_e": "Bamnet Narong"
      },
      {
        "name_t": "บ้านเขว้า",
        "name_e": "Ban Khwao"
      },
      {
        "name_t": "บ้านแท่น",
        "name_e": "Ban Thaen"
      },
      {
        "name_t": "ภักดีชุมพล",
        "name_e": "Phakdi Chumphon"
      },
      {
        "name_t": "ภูเขียว",
        "name_e": "Phu Khiao"
      },
      {
        "name_t": "หนองบัวระเหว",
        "name_e": "Nong Bua Rawe"
      },
      {
        "name_t": "หนองบัวแดง",
        "name_e": "Nong Bua Daeng"
      },
      {
        "name_t": "เกษตรสมบูรณ์",
        "name_e": "Kaset Sombun"
      },
      {
        "name_t": "เทพสถิต",
        "name_e": "Thep Sathit"
      },
      {
        "name_t": "เนินสง่า",
        "name_e": "Noen Sa-nga"
      },
      {
        "name_t": "เมืองชัยภูมิ",
        "name_e": "Mueang Chaiyaphum"
      },
      {
        "name_t": "แก้งคร้อ",
        "name_e": "Kaeng Khro"
      }
    ],
    " Sing Buri": [
      {
        "name_t": "ค่ายบางระจัน",
        "name_e": "Khai Bang Rachan"
      },
      {
        "name_t": "ท่าช้าง",
        "name_e": "Tha Chang"
      },
      {
        "name_t": "บางระจัน",
        "name_e": "Bang Rachan"
      },
      {
        "name_t": "พรหมบุรี",
        "name_e": "Phrom Buri"
      },
      {
        "name_t": "อินทร์บุรี",
        "name_e": "In Buri"
      },
      {
        "name_t": "เมืองสิงห์บุรี",
        "name_e": "Mueang Sing Buri"
      }
    ],
    "Bangkok": [
      {
        "name_t": "จตุจักร",
        "name_e": "Chatuchak"
      },
      {
        "name_t": "ดอนเมือง",
        "name_e": "Don Mueang"
      },
      {
        "name_t": "ดุสิต",
        "name_e": "Dusit"
      },
      {
        "name_t": "ตลิ่งชัน",
        "name_e": "Taling Chan"
      },
      {
        "name_t": "ทวีวัฒนา",
        "name_e": "Thawi Watthana"
      },
      {
        "name_t": "ธนบุรี",
        "name_e": "Thon Buri"
      },
      {
        "name_t": "บางกอกน้อย",
        "name_e": "Bangkok Noi"
      },
      {
        "name_t": "บางกอกใหญ่",
        "name_e": "Bangkok Yai"
      },
      {
        "name_t": "บางพลัด",
        "name_e": "Bang Phlat"
      },
      {
        "name_t": "บางรัก",
        "name_e": "Bang Rak"
      },
      {
        "name_t": "บางเขน",
        "name_e": "Bang Khen"
      },
      {
        "name_t": "ประเวศ",
        "name_e": "Prawet"
      },
      {
        "name_t": "ป้อมปราบศัตรูพ่าย",
        "name_e": "Pom Prap Sattru Phai"
      },
      {
        "name_t": "พระนคร",
        "name_e": "Phra Nakhon"
      },
      {
        "name_t": "พระโขนง",
        "name_e": "Phra Khanong"
      },
      {
        "name_t": "ภาษีเจริญ",
        "name_e": "Phasi Charoen"
      },
      {
        "name_t": "สัมพันธวงศ์",
        "name_e": "Samphanthawong"
      },
      {
        "name_t": "สายไหม",
        "name_e": "Sai Mai"
      },
      {
        "name_t": "หลักสี่",
        "name_e": "Lak Si"
      },
      {
        "name_t": "คลองเตย",
        "name_e": "Khlong Toei"
      },
      {
        "name_t": "จอมทอง",
        "name_e": "Chom Thong"
      },
      {
        "name_t": "ดินแดง",
        "name_e": "Din Daeng"
      },
      {
        "name_t": "ทุ่งครุ",
        "name_e": "Thung Khru"
      },
      {
        "name_t": "บางกะปิ",
        "name_e": "Bang Kapi"
      },
      {
        "name_t": "บางขุนเทียน",
        "name_e": "Bang Khun Thian"
      },
      {
        "name_t": "บางคอแหลม",
        "name_e": "Bang Kho Laem"
      },
      {
        "name_t": "บางซื่อ",
        "name_e": "Bang Sue"
      },
      {
        "name_t": "บางบอน",
        "name_e": "Bang Bon"
      },
      {
        "name_t": "บึงกุ่ม",
        "name_e": "Bueng Kum"
      },
      {
        "name_t": "พญาไท",
        "name_e": "Phaya Thai"
      },
      {
        "name_t": "ยานนาวา",
        "name_e": "Yan Nawa"
      },
      {
        "name_t": "ราชเทวี",
        "name_e": "Ratchathewi"
      },
      {
        "name_t": "ราษฎร์บูรณะ",
        "name_e": "Rat Burana"
      },
      {
        "name_t": "ลาดพร้าว",
        "name_e": "Lat Phrao"
      },
      {
        "name_t": "วังทองหลาง",
        "name_e": "Wang Thonglang"
      },
      {
        "name_t": "สาทร",
        "name_e": "Sathon"
      },
      {
        "name_t": "ห้วยขวาง",
        "name_e": "Huai Khwang"
      },
      {
        "name_t": "คลองสาน",
        "name_e": "Khlong San"
      },
      {
        "name_t": "คลองสามวา",
        "name_e": "Khlong Sam Wa"
      },
      {
        "name_t": "คันนายาว",
        "name_e": "Khan Na Yao"
      },
      {
        "name_t": "มีนบุรี",
        "name_e": "Min Buri"
      },
      {
        "name_t": "ลาดกระบัง",
        "name_e": "Lat Krabang"
      },
      {
        "name_t": "วัฒนา",
        "name_e": " Vadhana"
      },
      {
        "name_t": "สวนหลวง",
        "name_e": "Suan Luang"
      },
      {
        "name_t": "สะพานสูง",
        "name_e": "Saphan Sung"
      },
      {
        "name_t": "หนองจอก",
        "name_e": "Nong Chok"
      },
      {
        "name_t": "บางแค",
        "name_e": "Bang Khae"
      },
      {
        "name_t": "ปทุมวัน",
        "name_e": "Pathumwan"
      },
      {
        "name_t": "หนองแขม",
        "name_e": "Nong Khaem"
      },
      {
        "name_t": "ปทุมวัน",
        "name_e": "Pathumwan"
      },
      {
        "name_t": "คลองสาน",
        "name_e": "Khlong San"
      },
      {
        "name_t": "ดินแดง",
        "name_e": "Din Daeng"
      },
      {
        "name_t": "บางนา",
        "name_e": "Bang Na"
      },
      {
        "name_t": "บางบอน",
        "name_e": "Bang Bon"
      },
      {
        "name_t": "บึงกุ่ม",
        "name_e": "Bueng Kum"
      },
      {
        "name_t": "พญาไท",
        "name_e": "Phaya Thai"
      },
      {
        "name_t": "พระโขนง",
        "name_e": "Phra Khanong"
      },
      {
        "name_t": "สวนหลวง",
        "name_e": "Suan Luang"
      },
      {
        "name_t": "สะพานสูง",
        "name_e": "Saphan Sung"
      },
      {
        "name_t": "ห้วยขวาง",
        "name_e": "Huai Khwang"
      }
    ],
    "Chiang Mai": [
      {
        "name_t": "จอมทอง",
        "name_e": "Chom Thong"
      },
      {
        "name_t": "ดอยสะเก็ด",
        "name_e": "Doi Saket"
      },
      {
        "name_t": "ดอยหล่อ",
        "name_e": "Doi Lo"
      },
      {
        "name_t": "ดอยเต่า",
        "name_e": "Doi Tao"
      },
      {
        "name_t": "ฝาง",
        "name_e": "Fang"
      },
      {
        "name_t": "พร้าว",
        "name_e": "Phrao"
      },
      {
        "name_t": "สะเมิง",
        "name_e": "Samoeng"
      },
      {
        "name_t": "สันกำแพง",
        "name_e": "San Kamphaeng"
      },
      {
        "name_t": "สันทราย",
        "name_e": "San Sai"
      },
      {
        "name_t": "สันป่าตอง",
        "name_e": "San Pa Tong"
      },
      {
        "name_t": "สารภี",
        "name_e": "Saraphi"
      },
      {
        "name_t": "อมก๋อย",
        "name_e": "Omkoi"
      },
      {
        "name_t": "ฮอด",
        "name_e": "Hot"
      },
      {
        "name_t": "เชียงดาว",
        "name_e": "Chiang Dao"
      },
      {
        "name_t": "เวียงแหง",
        "name_e": "Wiang Haeng"
      },
      {
        "name_t": "แม่ริม",
        "name_e": "Mae Rim"
      },
      {
        "name_t": "แม่วาง",
        "name_e": "Mae Wang"
      },
      {
        "name_t": "แม่ออน",
        "name_e": "Mae On"
      },
      {
        "name_t": "แม่อาย",
        "name_e": "Mae Ai"
      },
      {
        "name_t": "แม่แจ่ม",
        "name_e": "Mae Chaem"
      },
      {
        "name_t": "แม่แตง",
        "name_e": "Mae Taeng"
      },
      {
        "name_t": "ไชยปราการ",
        "name_e": "Chai Prakan"
      },
      {
        "name_t": "หางดง",
        "name_e": "Hang Dong"
      },
      {
        "name_t": "เมืองเชียงใหม่",
        "name_e": "Mueang Chiang Mai"
      },
      {
        "name_t": "เมืองเชียงใหม่",
        "name_e": "Mueang Chiang Mai"
      },
      {
        "name_t": "ฝาง",
        "name_e": "Fang"
      },
      {
        "name_t": "สันกำแพง",
        "name_e": "San Kamphaeng"
      },
      {
        "name_t": "สันป่าตอง",
        "name_e": "San Pa Tong"
      },
      {
        "name_t": "แม่ออน",
        "name_e": "Mae On"
      }
    ],
    " Narathiwat": [
      {
        "name_t": "จะแนะ",
        "name_e": "Chanae"
      },
      {
        "name_t": "ตากใบ",
        "name_e": "Tak Bai"
      },
      {
        "name_t": "บาเจาะ",
        "name_e": "Bacho"
      },
      {
        "name_t": "ยี่งอ",
        "name_e": "Yi-ngo"
      },
      {
        "name_t": "ระแงะ",
        "name_e": "Ra-ngae"
      },
      {
        "name_t": "รือเสาะ",
        "name_e": "Rueso"
      },
      {
        "name_t": "ศรีสาคร",
        "name_e": "Si Sakhon"
      },
      {
        "name_t": "สุคิริน",
        "name_e": "Sukhirin"
      },
      {
        "name_t": "สุไหงปาดี",
        "name_e": "Su-ngai Padi"
      },
      {
        "name_t": "สุไหงโก-ลก",
        "name_e": "Su-ngai Kolok"
      },
      {
        "name_t": "เจาะไอร้อง",
        "name_e": "Cho-airong"
      },
      {
        "name_t": "เมืองนราธิวาส",
        "name_e": "Mueang Narathiwat"
      },
      {
        "name_t": "แว้ง",
        "name_e": "Waeng"
      }
    ],
    " Phayao": [
      {
        "name_t": "จุน",
        "name_e": "Chun"
      },
      {
        "name_t": "ดอกคำใต้",
        "name_e": "Dok Khamtai"
      },
      {
        "name_t": "ปง",
        "name_e": "Pong"
      },
      {
        "name_t": "ภูกามยาว",
        "name_e": "Phu Kamyao"
      },
      {
        "name_t": "ภูซาง",
        "name_e": "Phu Sang"
      },
      {
        "name_t": "เชียงคำ",
        "name_e": "Chiang Kham"
      },
      {
        "name_t": "เชียงม่วน",
        "name_e": "Chiang Muan"
      },
      {
        "name_t": "เมืองพะเยา",
        "name_e": "Mueang Phayao"
      },
      {
        "name_t": "แม่ใจ",
        "name_e": "Mae Chai"
      }
    ],
    "Phetchaburi": [
      {
        "name_t": "ชะอำ",
        "name_e": "Cha-am"
      },
      {
        "name_t": "ท่ายาง",
        "name_e": "Tha Yang"
      },
      {
        "name_t": "บ้านลาด",
        "name_e": "Ban Lat"
      },
      {
        "name_t": "บ้านแหลม",
        "name_e": "Ban Laem"
      },
      {
        "name_t": "หนองหญ้าปล้อง",
        "name_e": "Nong Ya Plong"
      },
      {
        "name_t": "เขาย้อย",
        "name_e": "Khao Yoi"
      },
      {
        "name_t": "เมืองเพชรบุรี",
        "name_e": "Mueang Phetchaburi"
      },
      {
        "name_t": "แก่งกระจาน",
        "name_e": "Kaeng Krachan"
      }
    ],
    "Lop Buri": [
      {
        "name_t": "ชัยบาดาล",
        "name_e": "Chai Badan"
      },
      {
        "name_t": "ท่าวุ้ง",
        "name_e": "Tha Wung"
      },
      {
        "name_t": "ท่าหลวง",
        "name_e": "Tha Luang"
      },
      {
        "name_t": "บ้านหมี่",
        "name_e": "Ban Mi"
      },
      {
        "name_t": "พัฒนานิคม",
        "name_e": "Phatthana Nikhom"
      },
      {
        "name_t": "ลำสนธิ",
        "name_e": "Lam Sonthi"
      },
      {
        "name_t": "สระโบสถ์",
        "name_e": "Sa Bot"
      },
      {
        "name_t": "หนองม่วง",
        "name_e": "Nong Muang"
      },
      {
        "name_t": "เมืองลพบุรี",
        "name_e": "Mueang Lop Buri"
      },
      {
        "name_t": "โคกสำโรง",
        "name_e": "Khok Samrong"
      },
      {
        "name_t": "โคกเจริญ",
        "name_e": "Khok Charoen"
      }
    ],
    "Phitsanulok": [
      {
        "name_t": "ชาติตระการ",
        "name_e": "Chat Trakan"
      },
      {
        "name_t": "นครไทย",
        "name_e": "Nakhon Thai"
      },
      {
        "name_t": "บางกระทุ่ม",
        "name_e": "Bang Krathum"
      },
      {
        "name_t": "บางระกำ",
        "name_e": "Bang Rakam"
      },
      {
        "name_t": "พรหมพิราม",
        "name_e": "Phrom Phiram"
      },
      {
        "name_t": "วังทอง",
        "name_e": "Wang Thong"
      },
      {
        "name_t": "วัดโบสถ์",
        "name_e": "Wat Bot"
      },
      {
        "name_t": "เนินมะปราง",
        "name_e": "Noen Maprang"
      },
      {
        "name_t": "เมืองพิษณุโลก",
        "name_e": "Mueang Phitsanulok"
      }
    ],
    "Amnat Charoen": [
      {
        "name_t": "ชานุมาน",
        "name_e": "Chanuman"
      },
      {
        "name_t": "ปทุมราชวงศา",
        "name_e": "Pathum Ratchawongsa"
      },
      {
        "name_t": "พนา",
        "name_e": "Phana"
      },
      {
        "name_t": "ลืออำนาจ",
        "name_e": "Lue Amnat"
      },
      {
        "name_t": "หัวตะพาน",
        "name_e": "Hua Taphan"
      },
      {
        "name_t": "เมืองอำนาจเจริญ",
        "name_e": "Mueang Amnat Charoen"
      },
      {
        "name_t": "เสนางคนิคม",
        "name_e": "Senangkhanikhom"
      }
    ],
    "Nakhon Sawan": [
      {
        "name_t": "ชุมตาบง",
        "name_e": "Chum Ta Bong"
      },
      {
        "name_t": "ชุมแสง",
        "name_e": "Chum Saeng"
      },
      {
        "name_t": "ตากฟ้า",
        "name_e": "Tak Fa"
      },
      {
        "name_t": "ตาคลี",
        "name_e": "Takhli"
      },
      {
        "name_t": "ท่าตะโก",
        "name_e": "Tha Tako"
      },
      {
        "name_t": "บรรพตพิสัย",
        "name_e": "Banphot Phisai"
      },
      {
        "name_t": "พยุหะคีรี",
        "name_e": "Phayuha Khiri"
      },
      {
        "name_t": "ลาดยาว",
        "name_e": "Lat Yao"
      },
      {
        "name_t": "หนองบัว",
        "name_e": "Nong Bua"
      },
      {
        "name_t": "เก้าเลี้ยว",
        "name_e": "Kao Liao"
      },
      {
        "name_t": "เมืองนครสวรรค์",
        "name_e": "Mueang Nakhon Sawan"
      },
      {
        "name_t": "แม่วงก์",
        "name_e": "Mae Wong"
      },
      {
        "name_t": "แม่เปิน",
        "name_e": "Mae Poen"
      },
      {
        "name_t": "โกรกพระ",
        "name_e": "Krok Phra"
      },
      {
        "name_t": "ไพศาลี",
        "name_e": "Phaisali"
      },
      {
        "name_t": "เมืองนครสวรรค์",
        "name_e": "Mueang Nakhon Sawan"
      }
    ],
    "Phichit": [
      {
        "name_t": "ดงเจริญ",
        "name_e": "Dong Charoen"
      },
      {
        "name_t": "ตะพานหิน",
        "name_e": "Taphan Hin"
      },
      {
        "name_t": "ทับคล้อ",
        "name_e": "Thap Khlo"
      },
      {
        "name_t": "บางมูลนาก",
        "name_e": "Bang Mun Nak"
      },
      {
        "name_t": "บึงนาราง",
        "name_e": "Bueng Na Rang"
      },
      {
        "name_t": "วชิรบารมี",
        "name_e": "Wachirabarami"
      },
      {
        "name_t": "วังทรายพูน",
        "name_e": "Wang Sai Phun"
      },
      {
        "name_t": "สากเหล็ก",
        "name_e": "Sak Lek"
      },
      {
        "name_t": "สามง่าม",
        "name_e": "Sam Ngam"
      },
      {
        "name_t": "เมืองพิจิตร",
        "name_e": "Mueang Phichit"
      },
      {
        "name_t": "โพทะเล",
        "name_e": "Pho Thale"
      },
      {
        "name_t": "โพธิ์ประทับช้าง",
        "name_e": "Pho Prathap Chang"
      }
    ],
    "Saraburi": [
      {
        "name_t": "ดอนพุด",
        "name_e": "Don Phut"
      },
      {
        "name_t": "บ้านหมอ",
        "name_e": "Ban Mo"
      },
      {
        "name_t": "พระพุทธบาท",
        "name_e": "Phra Phutthabat"
      },
      {
        "name_t": "มวกเหล็ก",
        "name_e": "Muak Lek"
      },
      {
        "name_t": "วังม่วง",
        "name_e": "Wang Muang"
      },
      {
        "name_t": "วิหารแดง",
        "name_e": "Wihan Daeng"
      },
      {
        "name_t": "หนองแค",
        "name_e": "Nong Khae"
      },
      {
        "name_t": "หนองแซง",
        "name_e": "Nong Saeng"
      },
      {
        "name_t": "หนองโดน",
        "name_e": "Nong Don"
      },
      {
        "name_t": "เฉลิมพระเกียรติ",
        "name_e": "Chaloem Phra Kiat"
      },
      {
        "name_t": "เมืองสระบุรี",
        "name_e": "Mueang Saraburi"
      },
      {
        "name_t": "เสาไห้",
        "name_e": "Sao Hai"
      },
      {
        "name_t": "แก่งคอย",
        "name_e": "Kaeng Khoi"
      }
    ],
    "Suphan Buri": [
      {
        "name_t": "ดอนเจดีย์",
        "name_e": "Don Chedi"
      },
      {
        "name_t": "ด่านช้าง",
        "name_e": "Dan Chang"
      },
      {
        "name_t": "บางปลาม้า",
        "name_e": "Bang Pla Ma"
      },
      {
        "name_t": "ศรีประจันต์",
        "name_e": "Si Prachan"
      },
      {
        "name_t": "สองพี่น้อง",
        "name_e": "Song Phi Nong"
      },
      {
        "name_t": "สามชุก",
        "name_e": "Sam Chuk"
      },
      {
        "name_t": "หนองหญ้าไซ",
        "name_e": "Nong Ya Sai"
      },
      {
        "name_t": "อู่ทอง",
        "name_e": "U Thong"
      },
      {
        "name_t": "เดิมบางนางบวช",
        "name_e": "Doem Bang Nang Buat"
      },
      {
        "name_t": "เมืองสุพรรณบุรี",
        "name_e": "Mueang Suphan Buri"
      }
    ],
    "Loei": [
      {
        "name_t": "ด่านซ้าย",
        "name_e": "Dan Sai"
      },
      {
        "name_t": "ท่าลี่",
        "name_e": "Tha Li"
      },
      {
        "name_t": "นาด้วง",
        "name_e": "Na Duang"
      },
      {
        "name_t": "นาแห้ว",
        "name_e": "Na Haeo"
      },
      {
        "name_t": "ปากชม",
        "name_e": "Pak Chom"
      },
      {
        "name_t": "ผาขาว",
        "name_e": "Pha Khao"
      },
      {
        "name_t": "ภูกระดึง",
        "name_e": "Phu Kradueng"
      },
      {
        "name_t": "ภูหลวง",
        "name_e": "Phu Luang"
      },
      {
        "name_t": "ภูเรือ",
        "name_e": "Phu Ruea"
      },
      {
        "name_t": "วังสะพุง",
        "name_e": "Wang Saphung"
      },
      {
        "name_t": "หนองหิน",
        "name_e": "Nong Hin"
      },
      {
        "name_t": "เชียงคาน",
        "name_e": "Chiang Khan"
      },
      {
        "name_t": "เมืองเลย",
        "name_e": "Mueang Loei"
      },
      {
        "name_t": "เอราวัณ",
        "name_e": "Erawan"
      }
    ],
    "Kanchanaburi": [
      {
        "name_t": "ด่านมะขามเตี้ย",
        "name_e": "Dan Makham Tia"
      },
      {
        "name_t": "ทองผาภูมิ",
        "name_e": "Thong Pha Phum"
      },
      {
        "name_t": "ท่ามะกา",
        "name_e": "Tha Maka"
      },
      {
        "name_t": "ท่าม่วง",
        "name_e": "Tha Muang"
      },
      {
        "name_t": "บ่อพลอย",
        "name_e": "Bo Phloi"
      },
      {
        "name_t": "พนมทวน",
        "name_e": "Phanom Thuan"
      },
      {
        "name_t": "ศรีสวัสดิ์",
        "name_e": "Si Sawat"
      },
      {
        "name_t": "สังขละบุรี",
        "name_e": "Sangkhla Buri"
      },
      {
        "name_t": "หนองปรือ",
        "name_e": "Nong Prue"
      },
      {
        "name_t": "ห้วยกระเจา",
        "name_e": "Huai Krachao"
      },
      {
        "name_t": "เมืองกาญจนบุรี",
        "name_e": "Mueang Kanchanaburi"
      },
      {
        "name_t": "เลาขวัญ",
        "name_e": "Lao Khwan"
      },
      {
        "name_t": "ไทรโยค",
        "name_e": "Sai Yok"
      }
    ],
    "Uttaradit": [
      {
        "name_t": "ตรอน",
        "name_e": "Tron"
      },
      {
        "name_t": "ทองแสนขัน",
        "name_e": "Thong Saen Khan"
      },
      {
        "name_t": "ท่าปลา",
        "name_e": "Tha Pla"
      },
      {
        "name_t": "น้ำปาด",
        "name_e": "Nam Pat"
      },
      {
        "name_t": "บ้านโคก",
        "name_e": "Ban Khok"
      },
      {
        "name_t": "พิชัย",
        "name_e": "Phichai"
      },
      {
        "name_t": "ฟากท่า",
        "name_e": "Fak Tha"
      },
      {
        "name_t": "ลับแล",
        "name_e": "Laplae"
      },
      {
        "name_t": "เมืองอุตรดิตถ์",
        "name_e": "Mueang Uttaradit"
      }
    ],
    "Uthai Thani": [
      {
        "name_t": "ทัพทัน",
        "name_e": "Thap Than"
      },
      {
        "name_t": "บ้านไร่",
        "name_e": "Ban Rai"
      },
      {
        "name_t": "ลานสัก",
        "name_e": "Lan Sak"
      },
      {
        "name_t": "สว่างอารมณ์",
        "name_e": "Sawang Arom"
      },
      {
        "name_t": "หนองขาหย่าง",
        "name_e": "Nong Khayang"
      },
      {
        "name_t": "หนองฉาง",
        "name_e": "Nong Chang"
      },
      {
        "name_t": "ห้วยคต",
        "name_e": "Huai Khot"
      },
      {
        "name_t": "เมืองอุทัยธานี",
        "name_e": "Mueang Uthai Thani"
      }
    ],
    "  Nan": [
      {
        "name_t": "ทุ่งช้าง",
        "name_e": "Thung Chang"
      },
      {
        "name_t": "ท่าวังผา",
        "name_e": "Tha Wang Pha"
      },
      {
        "name_t": "นาน้อย",
        "name_e": "Na Noi"
      },
      {
        "name_t": "นาหมื่น",
        "name_e": "Na Muen"
      },
      {
        "name_t": "บ่อเกลือ",
        "name_e": "Bo Kluea"
      },
      {
        "name_t": "บ้านหลวง",
        "name_e": "Ban Luang"
      },
      {
        "name_t": "ปัว",
        "name_e": "Pua"
      },
      {
        "name_t": "ภูเพียง",
        "name_e": "Phu Phiang"
      },
      {
        "name_t": "สองแคว",
        "name_e": "Song Khwae"
      },
      {
        "name_t": "สันติสุข",
        "name_e": "Santi Suk"
      },
      {
        "name_t": "เฉลิมพระเกียรติ",
        "name_e": "Chaloem Phra Kiat"
      },
      {
        "name_t": "เชียงกลาง",
        "name_e": "Chiang Klang"
      },
      {
        "name_t": "เมืองน่าน",
        "name_e": "Mueang Nan"
      },
      {
        "name_t": "เวียงสา",
        "name_e": "Wiang Sa"
      },
      {
        "name_t": "แม่จริม",
        "name_e": "Mae Charim"
      }
    ],
    "Chumphon": [
      {
        "name_t": "ทุ่งตะโก",
        "name_e": "Thung Tako"
      },
      {
        "name_t": "ท่าแซะ",
        "name_e": "Tha Sae"
      },
      {
        "name_t": "ปะทิว",
        "name_e": "Pathio"
      },
      {
        "name_t": "พะโต๊ะ",
        "name_e": "Phato"
      },
      {
        "name_t": "ละแม",
        "name_e": "Lamae"
      },
      {
        "name_t": "สวี",
        "name_e": "Sawi"
      },
      {
        "name_t": "หลังสวน",
        "name_e": "Lang Suan"
      },
      {
        "name_t": "เมืองชุมพร",
        "name_e": "Mueang Chumphon"
      }
    ],
    "Lamphun": [
      {
        "name_t": "ทุ่งหัวช้าง",
        "name_e": "Thung Hua Chang"
      },
      {
        "name_t": "บ้านธิ",
        "name_e": "Ban Thi"
      },
      {
        "name_t": "บ้านโฮ่ง",
        "name_e": "Ban Hong"
      },
      {
        "name_t": "ป่าซาง",
        "name_e": "Pa Sang"
      },
      {
        "name_t": "ลี้",
        "name_e": "Li"
      },
      {
        "name_t": "เมืองลำพูน",
        "name_e": "Mueang Lamphun"
      },
      {
        "name_t": "เวียงหนองล่อง",
        "name_e": "Wiang Nong Long"
      },
      {
        "name_t": "แม่ทา",
        "name_e": "Mae tha"
      }
    ],
    "Nong Khai": [
      {
        "name_t": "ท่าบ่อ",
        "name_e": "Tha Bo"
      },
      {
        "name_t": "รัตนวาปี",
        "name_e": "Rattanawapi"
      },
      {
        "name_t": "ศรีเชียงใหม่",
        "name_e": "Si Chiang Mai"
      },
      {
        "name_t": "สระใคร",
        "name_e": "Sakhrai"
      },
      {
        "name_t": "สังคม",
        "name_e": "Sangkhom"
      },
      {
        "name_t": "เฝ้าไร่",
        "name_e": "Fao Rai"
      },
      {
        "name_t": "เมืองหนองคาย",
        "name_e": "Mueang Nong Khai"
      },
      {
        "name_t": "โพธิ์ตาก",
        "name_e": "Pho Tak"
      },
      {
        "name_t": "โพนพิสัย",
        "name_e": "Phon Phisai"
      }
    ],
    "Tak": [
      {
        "name_t": "ท่าสองยาง",
        "name_e": "Tha Song Yang"
      },
      {
        "name_t": "บ้านตาก",
        "name_e": "Ban Tak"
      },
      {
        "name_t": "พบพระ",
        "name_e": "Phop Phra"
      },
      {
        "name_t": "วังเจ้า",
        "name_e": "Wang Chao"
      },
      {
        "name_t": "สามเงา",
        "name_e": "Sam Ngao"
      },
      {
        "name_t": "อุ้มผาง",
        "name_e": "Umphang"
      },
      {
        "name_t": "เมืองตาก",
        "name_e": "Mueang Tak"
      },
      {
        "name_t": "แม่ระมาด",
        "name_e": "Mae Ramat"
      },
      {
        "name_t": "แม่สอด",
        "name_e": "Mae Sot"
      }
    ],
    "Nakhon Phanom": [
      {
        "name_t": "ท่าอุเทน",
        "name_e": "Tha Uthen"
      },
      {
        "name_t": "ธาตุพนม",
        "name_e": "That Phanom"
      },
      {
        "name_t": "นาทม",
        "name_e": "Na Thom"
      },
      {
        "name_t": "นาหว้า",
        "name_e": "Na Wa"
      },
      {
        "name_t": "นาแก",
        "name_e": "Na Kae"
      },
      {
        "name_t": "บ้านแพง",
        "name_e": "Ban Phaeng"
      },
      {
        "name_t": "ปลาปาก",
        "name_e": "Pla Pak"
      },
      {
        "name_t": "วังยาง",
        "name_e": "Wang Yang"
      },
      {
        "name_t": "ศรีสงคราม",
        "name_e": "Si Songkhram"
      },
      {
        "name_t": "เมืองนครพนม",
        "name_e": "Mueang Nakhon Phanom"
      },
      {
        "name_t": "เรณูนคร",
        "name_e": "Renu Nakhon"
      },
      {
        "name_t": "โพนสวรรค์",
        "name_e": "Phon Sawan"
      }
    ],
    " Phra Nakhon Si Ayutthaya": [
      {
        "name_t": "ท่าเรือ",
        "name_e": "Tha Ruea"
      },
      {
        "name_t": "นครหลวง",
        "name_e": "Nakhon Luang"
      },
      {
        "name_t": "บางซ้าย",
        "name_e": "Bang Sai"
      },
      {
        "name_t": "บางบาล",
        "name_e": "Bang Ban"
      },
      {
        "name_t": "บางปะหัน",
        "name_e": "Bang Pahan"
      },
      {
        "name_t": "บางปะอิน",
        "name_e": "Bang Pa-in"
      },
      {
        "name_t": "บางไทร",
        "name_e": "Bang Sai"
      },
      {
        "name_t": "บ้านแพรก",
        "name_e": "Ban Phraek"
      },
      {
        "name_t": "ผักไห่",
        "name_e": "Phak Hai"
      },
      {
        "name_t": "พระนครศรีอยุธยา",
        "name_e": "Phra Nakhon Si Ayutthaya"
      },
      {
        "name_t": "ภาชี",
        "name_e": "Phachi"
      },
      {
        "name_t": "มหาราช",
        "name_e": "Maha Rat"
      },
      {
        "name_t": "ลาดบัวหลวง",
        "name_e": "Lat Bua Luang"
      },
      {
        "name_t": "วังน้อย",
        "name_e": "Wang Noi"
      },
      {
        "name_t": "อุทัย",
        "name_e": "Uthai"
      },
      {
        "name_t": "เสนา",
        "name_e": "Sena"
      }
    ],
    "Nong Bua Lam Phu": [
      {
        "name_t": "นากลาง",
        "name_e": "Na Klang"
      },
      {
        "name_t": "นาวัง",
        "name_e": "Na Wang"
      },
      {
        "name_t": "ศรีบุญเรือง",
        "name_e": "Si Bun Ruang"
      },
      {
        "name_t": "สุวรรณคูหา",
        "name_e": "Suwannakhuha"
      },
      {
        "name_t": "เมืองหนองบัวลำภู",
        "name_e": "Mueang Nong Bua Lam Phu"
      },
      {
        "name_t": "โนนสัง",
        "name_e": "Non Sang"
      }
    ],
    "Rayong": [
      {
        "name_t": "นิคมพัฒนา",
        "name_e": "Nikhom Phattana"
      },
      {
        "name_t": "บ้านค่าย",
        "name_e": "Ban Khai"
      },
      {
        "name_t": "บ้านฉาง",
        "name_e": "Ban Chang"
      },
      {
        "name_t": "ปลวกแดง",
        "name_e": "Pluak Daeng"
      },
      {
        "name_t": "วังจันทร์",
        "name_e": "Wang Chan"
      },
      {
        "name_t": "เขาชะเมา",
        "name_e": "Khao Chamao"
      },
      {
        "name_t": "แกลง",
        "name_e": "Klaeng"
      },
      {
        "name_t": "เมืองระยอง",
        "name_e": "Mueang Rayong"
      },
      {
        "name_t": "แกลง",
        "name_e": "Klaeng"
      }
    ],
    "Samut Songkhram": [
      {
        "name_t": "บางคนที",
        "name_e": "Bang Khonthi"
      },
      {
        "name_t": "อัมพวา",
        "name_e": "Amphawa"
      },
      {
        "name_t": "เมืองสมุทรสงคราม",
        "name_e": "Mueang Samut Songkhram"
      }
    ],
    "Bung Kan": [
      {
        "name_t": "บึงกาฬ",
        "name_e": "Bueng Kan"
      },
      {
        "name_t": "บึงโขงหลง",
        "name_e": "Bung Khong Long"
      },
      {
        "name_t": "บุ่งคล้า",
        "name_e": "Bung Khla"
      },
      {
        "name_t": "ปากคาด",
        "name_e": "Pak Khat"
      },
      {
        "name_t": "พรเจริญ",
        "name_e": "Phon Charoen"
      },
      {
        "name_t": "ศรีวิไล",
        "name_e": "Si Wilai"
      },
      {
        "name_t": "เซกา",
        "name_e": "Seka"
      },
      {
        "name_t": "เมืองบึงกาฬ",
        "name_e": "Mueang Bueng Kan"
      },
      {
        "name_t": "โซ่พิสัย",
        "name_e": "So Phisai"
      }
    ],
    "Chon Buri": [
      {
        "name_t": "บ่อทอง",
        "name_e": "Bo Thong"
      },
      {
        "name_t": "บ้านบึง",
        "name_e": "Ban Bueng"
      },
      {
        "name_t": "พนัสนิคม",
        "name_e": "Phanat Nikhom"
      },
      {
        "name_t": "พานทอง",
        "name_e": "Phan Thong"
      },
      {
        "name_t": "ศรีราชา",
        "name_e": "Si Racha"
      },
      {
        "name_t": "หนองใหญ่",
        "name_e": "Nong Yai"
      },
      {
        "name_t": "เกาะจันทร์",
        "name_e": "Ko Chan"
      },
      {
        "name_t": "เกาะสีชัง",
        "name_e": "Ko Sichang"
      },
      {
        "name_t": "เมืองชลบุรี",
        "name_e": "Mueang Chon Buri"
      },
      {
        "name_t": "บางละมุง",
        "name_e": "Bang Lamung"
      },
      {
        "name_t": "สัตหีบ",
        "name_e": "Sattahip"
      },
      {
        "name_t": "บางละมุง",
        "name_e": "Bang Lamung"
      },
      {
        "name_t": "หนองใหญ่",
        "name_e": "Nong Yai"
      },
      {
        "name_t": "เมืองชลบุรี",
        "name_e": "Mueang Chon Buri"
      }
    ],
    " Nakhon Ratchasima": [
      {
        "name_t": "ปากช่อง",
        "name_e": "Pak Chong"
      },
      {
        "name_t": "วังน้ำเขียว",
        "name_e": "Wang Nam Khiao"
      },
      {
        "name_t": "ขามทะเลสอ",
        "name_e": "Kham Thale So"
      },
      {
        "name_t": "ขามสะแกแสง",
        "name_e": "Kham Sakaesaeng"
      },
      {
        "name_t": "คง",
        "name_e": "Khong"
      },
      {
        "name_t": "ครบุรี",
        "name_e": "Khon Buri"
      },
      {
        "name_t": "จักราช",
        "name_e": "Chakkarat"
      },
      {
        "name_t": "ชุมพวง",
        "name_e": "Chum Phuang"
      },
      {
        "name_t": "ด่านขุนทด",
        "name_e": "Dan Khun Thot"
      },
      {
        "name_t": "บัวลาย",
        "name_e": "Bua Lai"
      },
      {
        "name_t": "บัวใหญ่",
        "name_e": "Bua Yai"
      },
      {
        "name_t": "บ้านเหลื่อม",
        "name_e": "Ban Lueam"
      },
      {
        "name_t": "ประทาย",
        "name_e": "Prathai"
      },
      {
        "name_t": "ปักธงชัย",
        "name_e": "Pak Thong Chai"
      },
      {
        "name_t": "พระทองคำ",
        "name_e": "Phra Thong Kham"
      },
      {
        "name_t": "พิมาย",
        "name_e": "Phimai"
      },
      {
        "name_t": "ลำทะเมนชัย",
        "name_e": "Lam Thamenchai"
      },
      {
        "name_t": "สีคิ้ว",
        "name_e": "Sikhio"
      },
      {
        "name_t": "สีดา",
        "name_e": "Sida"
      },
      {
        "name_t": "สูงเนิน",
        "name_e": "Sung Noen"
      },
      {
        "name_t": "หนองบุนนาก",
        "name_e": "Nong Bunnak"
      },
      {
        "name_t": "ห้วยแถลง",
        "name_e": "Huai Thalaeng"
      },
      {
        "name_t": "เฉลิมพระเกียรติ",
        "name_e": "Chaloem Phra Kiat"
      },
      {
        "name_t": "เทพารักษ์",
        "name_e": "Thepharak"
      },
      {
        "name_t": "เมืองนครราชสีมา",
        "name_e": "Mueang Nakhon Ratchasima"
      },
      {
        "name_t": "เมืองยาง",
        "name_e": "Mueang Yang"
      },
      {
        "name_t": "เสิงสาง",
        "name_e": "Soeng Sang"
      },
      {
        "name_t": "แก้งสนามนาง",
        "name_e": "Kaeng Sanam Nang"
      },
      {
        "name_t": "โชคชัย",
        "name_e": "Chok Chai"
      },
      {
        "name_t": "โนนสูง",
        "name_e": "Non Sung"
      },
      {
        "name_t": "โนนแดง",
        "name_e": "Non Daeng"
      },
      {
        "name_t": "โนนไทย",
        "name_e": "Non Thai"
      },
      {
        "name_t": "ปากช่อง",
        "name_e": "Pak Chong"
      }
    ],
    "Ang Thong": [
      {
        "name_t": "ป่าโมก",
        "name_e": "Pa Mok"
      },
      {
        "name_t": "วิเศษชัยชาญ",
        "name_e": "Wiset Chai Chan"
      },
      {
        "name_t": "สามโก้",
        "name_e": "Samko"
      },
      {
        "name_t": "เมืองอ่างทอง",
        "name_e": "Mueang Ang Thong"
      },
      {
        "name_t": "แสวงหา",
        "name_e": "Sawaeng Ha"
      },
      {
        "name_t": "โพธิ์ทอง",
        "name_e": "Pho Thong"
      },
      {
        "name_t": "ไชโย",
        "name_e": "Chaiyo"
      }
    ],
    "Chai Nat": [
      {
        "name_t": "มโนรมย์",
        "name_e": "Manorom"
      },
      {
        "name_t": "วัดสิงห์",
        "name_e": "Wat Sing"
      },
      {
        "name_t": "สรรคบุรี",
        "name_e": "Sankhaburi"
      },
      {
        "name_t": "สรรพยา",
        "name_e": "Sapphaya"
      },
      {
        "name_t": "หนองมะโมง",
        "name_e": "Nong Mamong"
      },
      {
        "name_t": "หันคา",
        "name_e": "Hankha"
      },
      {
        "name_t": "เนินขาม",
        "name_e": "Noen Kham"
      },
      {
        "name_t": "เมืองชัยนาท",
        "name_e": "Mueang Chai Nat"
      }
    ],
    "Phrae": [
      {
        "name_t": "ร้องกวาง",
        "name_e": "Rong Kwang"
      },
      {
        "name_t": "ลอง",
        "name_e": "Long"
      },
      {
        "name_t": "วังชิ้น",
        "name_e": "Wang Chin"
      },
      {
        "name_t": "สอง",
        "name_e": "Song"
      },
      {
        "name_t": "สูงเม่น",
        "name_e": "Sung Men"
      },
      {
        "name_t": "หนองม่วงไข่",
        "name_e": "Nong Muang Khai"
      },
      {
        "name_t": "เด่นชัย",
        "name_e": "Den Chai"
      },
      {
        "name_t": "เมืองแพร่",
        "name_e": "Mueang Phrae"
      }
    ],
    "Samut Prakan": [
      {
        "name_t": "เมืองสมุทรปราการ",
        "name_e": "Mueang Samut Prakan"
      },
      {
        "name_t": "บางบ่อ",
        "name_e": "Bang Bo"
      },
      {
        "name_t": "บางพลี",
        "name_e": "Bang Phli"
      },
      {
        "name_t": "บางเสาธง",
        "name_e": "Bang Sao Thong"
      },
      {
        "name_t": "พระประแดง",
        "name_e": "Phra Pradaeng"
      },
      {
        "name_t": "พระสมุทรเจดีย์",
        "name_e": "Phra Samut Chedi"
      },
      {
        "name_t": "เมืองสมุทรปราการ",
        "name_e": "Mueang Samut Prakan"
      },
      {
        "name_t": "บางเสาธง",
        "name_e": "Bang Sao Thong"
      }
    ],
    " Prachin Buri": [
      {
        "name_t": "กบินทร์บุรี",
        "name_e": "Kabin Buri"
      },
      {
        "name_t": "นาดี",
        "name_e": "Na Di"
      },
      {
        "name_t": "บ้านสร้าง",
        "name_e": "Ban Sang"
      },
      {
        "name_t": "ประจันตคาม",
        "name_e": "Prachantakham"
      },
      {
        "name_t": "ศรีมหาโพธิ",
        "name_e": "Si Maha Phot"
      },
      {
        "name_t": "ศรีมโหสถ",
        "name_e": "Si Mahosot"
      },
      {
        "name_t": "เมืองปราจีนบุรี",
        "name_e": "Mueang Prachin Buri"
      }
    ],
    "Samut Sakhon": [
      {
        "name_t": "กระทุ่มแบน",
        "name_e": "Krathum Baen"
      },
      {
        "name_t": "บ้านแพ้ว",
        "name_e": "Ban Phaeo"
      },
      {
        "name_t": "เมืองสมุทรสาคร",
        "name_e": "Mueang Samut Sakhon"
      }
    ],
    " Chanthaburi": [
      {
        "name_t": "ขลุง",
        "name_e": "Khlung"
      },
      {
        "name_t": "ท่าใหม่",
        "name_e": "Tha Mai"
      },
      {
        "name_t": "นายายอาม",
        "name_e": "Na Yai Am"
      },
      {
        "name_t": "มะขาม",
        "name_e": "Makham"
      },
      {
        "name_t": "สอยดาว",
        "name_e": "Soi Dao"
      },
      {
        "name_t": "เขาคิชฌกูฏ",
        "name_e": "Khao Khitchakut"
      },
      {
        "name_t": "เมืองจันทบุรี",
        "name_e": "Mueang Chanthaburi"
      },
      {
        "name_t": "แก่งหางแมว",
        "name_e": "Kaeng Hang Maeo"
      },
      {
        "name_t": "แหลมสิงห์",
        "name_e": "Laem Sing"
      },
      {
        "name_t": "โป่งน้ำร้อน",
        "name_e": "Pong Nam Ron"
      }
    ],
    "Sa Kaeo": [
      {
        "name_t": "คลองหาด",
        "name_e": "Khlong Hat"
      },
      {
        "name_t": "ตาพระยา",
        "name_e": "Ta Phraya"
      },
      {
        "name_t": "วังน้ำเย็น",
        "name_e": "Wang Nam Yen"
      },
      {
        "name_t": "วังสมบูรณ์",
        "name_e": "Wang Sombun"
      },
      {
        "name_t": "วัฒนานคร",
        "name_e": "Watthana Nakhon"
      },
      {
        "name_t": "อรัญประเทศ",
        "name_e": "Aranyaprathet"
      },
      {
        "name_t": "เขาฉกรรจ์",
        "name_e": "Khao Chakan"
      },
      {
        "name_t": "เมืองสระแก้ว",
        "name_e": "Mueang Sa Kaeo"
      },
      {
        "name_t": "โคกสูง",
        "name_e": "Khok Sung"
      }
    ],
    "Ratchaburi": [
      {
        "name_t": "จอมบึง",
        "name_e": "Chom Bueng"
      },
      {
        "name_t": "ดำเนินสะดวก",
        "name_e": "Damnoen Saduak"
      },
      {
        "name_t": "บางแพ",
        "name_e": "Bang Phae"
      },
      {
        "name_t": "บ้านคา",
        "name_e": "Ban Kha"
      },
      {
        "name_t": "บ้านโป่ง",
        "name_e": "Ban Pong"
      },
      {
        "name_t": "ปากท่อ",
        "name_e": "Pak Tho"
      },
      {
        "name_t": "วัดเพลง",
        "name_e": "Wat Phleng"
      },
      {
        "name_t": "สวนผึ้ง",
        "name_e": "Suan Phueng"
      },
      {
        "name_t": "เมืองราชบุรี",
        "name_e": "Mueang Ratchaburi"
      },
      {
        "name_t": "โพธาราม",
        "name_e": "Photharam"
      }
    ],
    " Prachuap Khiri Khan": [
      {
        "name_t": "หัวหิน",
        "name_e": "Hua Hin"
      },
      {
        "name_t": "กุยบุรี",
        "name_e": "Kui Buri"
      },
      {
        "name_t": "ทับสะแก",
        "name_e": "Thap Sakae"
      },
      {
        "name_t": "บางสะพาน",
        "name_e": "Bang Saphan"
      },
      {
        "name_t": "บางสะพานน้อย",
        "name_e": "Bang Saphan Noi"
      },
      {
        "name_t": "ปราณบุรี",
        "name_e": "Pran Buri"
      },
      {
        "name_t": "สามร้อยยอด",
        "name_e": "Sam Roi Yot"
      },
      {
        "name_t": "เมืองประจวบคีรีขันธ์",
        "name_e": "Mueang Prachuap Khiri Khan"
      }
    ],
    "Kalasin": [
      {
        "name_t": "กมลาไสย",
        "name_e": "Kamalasai"
      },
      {
        "name_t": "กุฉินารายณ์",
        "name_e": "Kuchinarai"
      },
      {
        "name_t": "คำม่วง",
        "name_e": "Kham Muang"
      },
      {
        "name_t": "ฆ้องชัย",
        "name_e": "Khong Chai"
      },
      {
        "name_t": "ดอนจาน",
        "name_e": "Don Chan"
      },
      {
        "name_t": "ท่าคันโท",
        "name_e": "Tha Khantho"
      },
      {
        "name_t": "นาคู",
        "name_e": "Na khu"
      },
      {
        "name_t": "นามน",
        "name_e": "Na Mon"
      },
      {
        "name_t": "ยางตลาด",
        "name_e": "Yang Talat"
      },
      {
        "name_t": "ร่องคำ",
        "name_e": "Rong Kham"
      },
      {
        "name_t": "สมเด็จ",
        "name_e": "Somdet"
      },
      {
        "name_t": "สหัสขันธ์",
        "name_e": "Sahatsakhan"
      },
      {
        "name_t": "สามชัย",
        "name_e": "Sam Chai"
      },
      {
        "name_t": "หนองกุงศรี",
        "name_e": "Nong Kung Si"
      },
      {
        "name_t": "ห้วยผึ้ง",
        "name_e": "Huai Phueng"
      },
      {
        "name_t": "ห้วยเม็ก",
        "name_e": "Huai Mek"
      },
      {
        "name_t": "เขาวง",
        "name_e": "Khao Wong"
      },
      {
        "name_t": "เมืองกาฬสินธุ์",
        "name_e": "Mueang Kalasin"
      }
    ],
    "Yasothon": [
      {
        "name_t": "กุดชุม",
        "name_e": "Kut Chum"
      },
      {
        "name_t": "คำเขื่อนแก้ว",
        "name_e": "Kham Khuean Kaeo"
      },
      {
        "name_t": "ค้อวัง",
        "name_e": "Kho Wang"
      },
      {
        "name_t": "ทรายมูล",
        "name_e": "Sai Mun"
      },
      {
        "name_t": "ป่าติ้ว",
        "name_e": "Pa Tio"
      },
      {
        "name_t": "มหาชนะชัย",
        "name_e": "Maha Chana Chai"
      },
      {
        "name_t": "เมืองยโสธร",
        "name_e": "Mueang Yasothon"
      },
      {
        "name_t": "เลิงนกทา",
        "name_e": "Loeng Nok Tha"
      },
      {
        "name_t": "ไทยเจริญ",
        "name_e": "Thai Charoen"
      }
    ],
    "Mukdahan": [
      {
        "name_t": "คำชะอี",
        "name_e": "Khamcha-i"
      },
      {
        "name_t": "ดงหลวง",
        "name_e": "Dong Luang"
      },
      {
        "name_t": "ดอนตาล",
        "name_e": "Don Tan"
      },
      {
        "name_t": "นิคมคำสร้อย",
        "name_e": "Kikhom Kham Soi"
      },
      {
        "name_t": "หนองสูง",
        "name_e": "Nong Sung"
      },
      {
        "name_t": "หว้านใหญ่",
        "name_e": "Wan Yai"
      },
      {
        "name_t": "เมืองมุกดาหาร",
        "name_e": "Mueang Mukdahan"
      }
    ],
    "Lampang": [
      {
        "name_t": "งาว",
        "name_e": "Ngao"
      },
      {
        "name_t": "วังเหนือ",
        "name_e": "Wang Nuea"
      },
      {
        "name_t": "สบปราบ",
        "name_e": "Sop Prap"
      },
      {
        "name_t": "ห้างฉัตร",
        "name_e": "Hang Chat"
      },
      {
        "name_t": "เกาะคา",
        "name_e": "Ko Kha"
      },
      {
        "name_t": "เถิน",
        "name_e": "Thoen"
      },
      {
        "name_t": "เมืองปาน",
        "name_e": "Mueang Pan"
      },
      {
        "name_t": "เมืองลำปาง",
        "name_e": "Mueang Lampang"
      },
      {
        "name_t": "เสริมงาม",
        "name_e": "Soem Ngam"
      },
      {
        "name_t": "แจ้ห่ม",
        "name_e": "Chae Hom"
      },
      {
        "name_t": "แม่ทะ",
        "name_e": "Mae Tha"
      },
      {
        "name_t": "แม่พริก",
        "name_e": "Mae Phrik"
      },
      {
        "name_t": "แม่เมาะ",
        "name_e": "Mae Mo"
      }
    ],
    "Roi Et": [
      {
        "name_t": "จตุรพักตรพิมาน",
        "name_e": "Chaturaphak Phiman"
      },
      {
        "name_t": "จังหาร",
        "name_e": "Changhan"
      },
      {
        "name_t": "ทุ่งเขาหลวง",
        "name_e": "Thung Khao Luang"
      },
      {
        "name_t": "ธวัชบุรี",
        "name_e": "Thawat Buri"
      },
      {
        "name_t": "ปทุมรัตต์",
        "name_e": "Pathum Rat"
      },
      {
        "name_t": "พนมไพร",
        "name_e": "Phanom Phrai"
      },
      {
        "name_t": "ศรีสมเด็จ",
        "name_e": "Si Somdet"
      },
      {
        "name_t": "สุวรรณภูมิ",
        "name_e": "Suwannaphum"
      },
      {
        "name_t": "หนองพอก",
        "name_e": "Nong Phok"
      },
      {
        "name_t": "หนองฮี",
        "name_e": "Nong Hi"
      },
      {
        "name_t": "อาจสามารถ",
        "name_e": "At Samat"
      },
      {
        "name_t": "เกษตรวิสัย",
        "name_e": "Kaset Wisai"
      },
      {
        "name_t": "เชียงขวัญ",
        "name_e": "Chiang Khwan"
      },
      {
        "name_t": "เมยวดี",
        "name_e": "Moei Wadi"
      },
      {
        "name_t": "เมืองร้อยเอ็ด",
        "name_e": "Mueang Roi Et"
      },
      {
        "name_t": "เมืองสรวง",
        "name_e": "Mueang Suang"
      },
      {
        "name_t": "เสลภูมิ",
        "name_e": "Selaphum"
      },
      {
        "name_t": "โพธิ์ชัย",
        "name_e": "Pho Chai"
      },
      {
        "name_t": "โพนทราย",
        "name_e": "Phon Sai"
      },
      {
        "name_t": "โพนทอง",
        "name_e": "Phon Thong"
      }
    ],
    "  Nakhon Nayok": [
      {
        "name_t": "บ้านนา",
        "name_e": "Ban Na"
      },
      {
        "name_t": "ปากพลี",
        "name_e": "Pak Phli"
      },
      {
        "name_t": "องครักษ์",
        "name_e": "Ongkharak"
      },
      {
        "name_t": "เมืองนครนายก",
        "name_e": "Mueang Nakhon Nayok"
      }
    ],
    " Nonthaburi": [
      {
        "name_t": "ปากเกร็ด",
        "name_e": "Pak Kret"
      },
      {
        "name_t": "เมืองนนทบุรี",
        "name_e": "Mueang Nonthaburi"
      },
      {
        "name_t": "บางกรวย",
        "name_e": "Bang Kruai"
      },
      {
        "name_t": "บางบัวทอง",
        "name_e": "Bang Bua Thong"
      },
      {
        "name_t": "บางใหญ่",
        "name_e": "Bang Yai"
      },
      {
        "name_t": "ไทรน้อย",
        "name_e": "Sai Noi"
      }
    ],
    " Chiang Rai": [
      {
        "name_t": "ขุนตาล",
        "name_e": "Khun Tan"
      },
      {
        "name_t": "ดอยหลวง",
        "name_e": "Doi Luang"
      },
      {
        "name_t": "ป่าแดด",
        "name_e": "Pa Daet"
      },
      {
        "name_t": "พญาเม็งราย",
        "name_e": "Phaya Mengrai"
      },
      {
        "name_t": "พาน",
        "name_e": "Phan"
      },
      {
        "name_t": "เชียงของ",
        "name_e": "Chiang Khong"
      },
      {
        "name_t": "เชียงแสน",
        "name_e": "Chiang Saen"
      },
      {
        "name_t": "เทิง",
        "name_e": "Thoeng"
      },
      {
        "name_t": "เมืองเชียงราย",
        "name_e": "Mueang Chiang Rai"
      },
      {
        "name_t": "เวียงชัย",
        "name_e": "Wiang Chai"
      },
      {
        "name_t": "เวียงป่าเป้า",
        "name_e": "Wiang Pa Pao"
      },
      {
        "name_t": "เวียงเชียงรุ้ง",
        "name_e": "Wiang Chiang Rung"
      },
      {
        "name_t": "เวียงแก่น",
        "name_e": "Wiang Kaen"
      },
      {
        "name_t": "แม่จัน",
        "name_e": "Mae Chan"
      },
      {
        "name_t": "แม่ฟ้าหลวง",
        "name_e": "Mae Fa Luang"
      },
      {
        "name_t": "แม่ลาว",
        "name_e": "Mae Lao"
      },
      {
        "name_t": "แม่สรวย",
        "name_e": "Mae Suai"
      },
      {
        "name_t": "แม่สาย",
        "name_e": "Mae Sai"
      }
    ],
    "Phuket": [
      {
        "name_t": "กะทู้",
        "name_e": "Kathu"
      },
      {
        "name_t": "ถลาง",
        "name_e": "Thalang"
      },
      {
        "name_t": "เมืองภูเก็ต",
        "name_e": "Mueang Phuket"
      }
    ],
    "Prachuap Khiri Khan": [
      {
        "name_t": "กุยบุรี",
        "name_e": "Kui Buri"
      },
      {
        "name_t": "ทับสะแก",
        "name_e": "Thap Sakae"
      },
      {
        "name_t": "บางสะพาน",
        "name_e": "Bang Saphan"
      },
      {
        "name_t": "บางสะพานน้อย",
        "name_e": "Bang Saphan Noi"
      },
      {
        "name_t": "ปราณบุรี",
        "name_e": "Pran Buri"
      },
      {
        "name_t": "สามร้อยยอด",
        "name_e": "Sam Roi Yot"
      },
      {
        "name_t": "หัวหิน",
        "name_e": "Hua Hin"
      }
    ],
    "Narathiwat": [
      {
        "name_t": "ตากใบ",
        "name_e": "Tak Bai"
      },
      {
        "name_t": "เจาะไอร้อง",
        "name_e": "Cho-airong"
      },
      {
        "name_t": "เมืองนราธิวาส",
        "name_e": "Mueang Narathiwat"
      }
    ]
  }

const countries: locationNameType[] = [
    {"name_e": "Afghanistan", "name_t": "อัฟกานิสถาน"},
    {"name_e": "Albania", "name_t": "แอลเบเนีย"},
    {"name_e": "Algeria", "name_t": "แอลจีเรีย"},
    {"name_e": "Andorra", "name_t": "อันดอร์รา"},
    {"name_e": "Angola", "name_t": "แองโกลา"},
    {"name_e": "Antigua and Barbuda", "name_t": "แอนติกาและบาร์บูดา"},
    {"name_e": "Argentina", "name_t": "อาร์เจนตินา"},
    {"name_e": "Armenia", "name_t": "อาร์เมเนีย"},
    {"name_e": "Australia", "name_t": "ออสเตรเลีย"},
    {"name_e": "Austria", "name_t": "ออสเตรีย"},
    {"name_e": "Azerbaijan", "name_t": "อาเซอร์ไบจาน"},
    {"name_e": "Bahamas", "name_t": "บาฮามาส"},
    {"name_e": "Bahrain", "name_t": "บาห์เรน"},
    {"name_e": "Bangladesh", "name_t": "บังกลาเทศ"},
    {"name_e": "Barbados", "name_t": "บาร์เบโดส"},
    {"name_e": "Belarus", "name_t": "เบลารุส"},
    {"name_e": "Belgium", "name_t": "เบลเยียม"},
    {"name_e": "Belize", "name_t": "เบลีซ"},
    {"name_e": "Benin", "name_t": "เบนิน"},
    {"name_e": "Bhutan", "name_t": "ภูฏาน"},
    {"name_e": "Bolivia", "name_t": "โบลิเวีย"},
    {"name_e": "Bosnia and Herzegovina", "name_t": "บอสเนียและเฮอร์เซโกวีนา"},
    {"name_e": "Botswana", "name_t": "บอตสวานา"},
    {"name_e": "Brazil", "name_t": "บราซิล"},
    {"name_e": "Brunei", "name_t": "บรูไน"},
    {"name_e": "Bulgaria", "name_t": "บัลแกเรีย"},
    {"name_e": "Burkina Faso", "name_t": "บูร์กินาฟาโซ"},
    {"name_e": "Burundi", "name_t": "บุรุนดี"},
    {"name_e": "Cabo Verde", "name_t": "เคปเวิร์ด"},
    {"name_e": "Cambodia", "name_t": "กัมพูชา"},
    {"name_e": "Cameroon", "name_t": "แคเมอรูน"},
    {"name_e": "Canada", "name_t": "แคนาดา"},
    {"name_e": "Central African Republic", "name_t": "สาธารณรัฐแอฟริกากลาง"},
    {"name_e": "Chad", "name_t": "ชาด"},
    {"name_e": "Chile", "name_t": "ชิลี"},
    {"name_e": "China", "name_t": "จีน"},
    {"name_e": "Colombia", "name_t": "โคลอมเบีย"},
    {"name_e": "Comoros", "name_t": "คอโมโรส"},
    {"name_e": "Congo", "name_t": "คองโก"},
    {"name_e": "Costa Rica", "name_t": "คอสตาริกา"},
    {"name_e": "Croatia", "name_t": "โครเอเชีย"},
    {"name_e": "Cuba", "name_t": "คิวบา"},
    {"name_e": "Cyprus", "name_t": "ไซปรัส"},
    {"name_e": "Czech Republic", "name_t": "สาธารณรัฐเช็ก"},
    {"name_e": "Denmark", "name_t": "เดนมาร์ก"},
    {"name_e": "Djibouti", "name_t": "จิบูตี"},
    {"name_e": "Dominica", "name_t": "โดมินิกา"},
    {"name_e": "Dominican Republic", "name_t": "สาธารณรัฐโดมินิกัน"},
    {"name_e": "East Timor", "name_t": "ติมอร์-เลสเต"},
    {"name_e": "Ecuador", "name_t": "เอกวาดอร์"},
    {"name_e": "Egypt", "name_t": "อียิปต์"},
    {"name_e": "El Salvador", "name_t": "เอลซัลวาดอร์"},
    {"name_e": "Equatorial Guinea", "name_t": "อิเควทอเรียลกินี"},
    {"name_e": "Eritrea", "name_t": "เอริเทรีย"},
    {"name_e": "Estonia", "name_t": "เอสโตเนีย"},
    {"name_e": "Eswatini", "name_t": "เอสวาตินี"},
    {"name_e": "Ethiopia", "name_t": "เอธิโอเปีย"},
    {"name_e": "Fiji", "name_t": "ฟีจี"},
    {"name_e": "Finland", "name_t": "ฟินแลนด์"},
    {"name_e": "France", "name_t": "ฝรั่งเศส"},
    {"name_e": "Gabon", "name_t": "กาบอง"},
    {"name_e": "Gambia", "name_t": "แกมเบีย"},
    {"name_e": "Georgia", "name_t": "จอร์เจีย"},
    {"name_e": "Germany", "name_t": "เยอรมนี"},
    {"name_e": "Ghana", "name_t": "กานา"},
    {"name_e": "Greece", "name_t": "กรีซ"},
    {"name_e": "Grenada", "name_t": "เกรเนดา"},
    {"name_e": "Guatemala", "name_t": "กัวเตมาลา"},
    {"name_e": "Guinea", "name_t": "กินี"},
    {"name_e": "Guinea-Bissau", "name_t": "กินี-บิสเซา"},
    {"name_e": "Guyana", "name_t": "กายอานา"},
    {"name_e": "Haiti", "name_t": "เฮติ"},
    {"name_e": "Honduras", "name_t": "ฮอนดูรัส"},
    {"name_e": "Hungary", "name_t": "ฮังการี"},
    {"name_e": "Iceland", "name_t": "ไอซ์แลนด์"},
    {"name_e": "India", "name_t": "อินเดีย"},
    {"name_e": "Indonesia", "name_t": "อินโดนีเซีย"},
    {"name_e": "Iran", "name_t": "อิหร่าน"},
    {"name_e": "Iraq", "name_t": "อิรัก"},
    {"name_e": "Ireland", "name_t": "ไอร์แลนด์"},
    {"name_e": "Israel", "name_t": "อิสราเอล"},
    {"name_e": "Italy", "name_t": "อิตาลี"},
    {"name_e": "Jamaica", "name_t": "จาเมกา"},
    {"name_e": "Japan", "name_t": "ญี่ปุ่น"},
    {"name_e": "Jordan", "name_t": "จอร์แดน"},
    {"name_e": "Kazakhstan", "name_t": "คาซัคสถาน"},
    {"name_e": "Kenya", "name_t": "เคนยา"},
    {"name_e": "Kiribati", "name_t": "คิริบาส"},
    {"name_e": "Korea, North", "name_t": "เกาหลีเหนือ"},
    {"name_e": "Korea, South", "name_t": "เกาหลีใต้"},
    {"name_e": "Kuwait", "name_t": "คูเวต"},
    {"name_e": "Kyrgyzstan", "name_t": "คีร์กีซสถาน"},
    {"name_e": "Laos", "name_t": "ลาว"},
    {"name_e": "Latvia", "name_t": "ลัตเวีย"},
    {"name_e": "Lebanon", "name_t": "เลบานอน"},
    {"name_e": "Lesotho", "name_t": "เลโซโท"},
    {"name_e": "Liberia", "name_t": "ไลบีเรีย"},
    {"name_e": "Libya", "name_t": "ลิเบีย"},
    {"name_e": "Liechtenstein", "name_t": "ลิกเตนสไตน์"},
    {"name_e": "Lithuania", "name_t": "ลิทัวเนีย"},
    {"name_e": "Luxembourg", "name_t": "ลักเซมเบิร์ก"},
    {"name_e": "Madagascar", "name_t": "มาดากัสการ์"},
    {"name_e": "Malawi", "name_t": "มาลาวี"},
    {"name_e": "Malaysia", "name_t": "มาเลเซีย"},
    {"name_e": "Maldives", "name_t": "มัลดีฟส์"},
    {"name_e": "Mali", "name_t": "มาลี"},
    {"name_e": "Malta", "name_t": "มอลตา"},
    {"name_e": "Marshall Islands", "name_t": "หมู่เกาะมาร์แชลล์"},
    {"name_e": "Mauritania", "name_t": "มอริเตเนีย"},
    {"name_e": "Mauritius", "name_t": "มอริเชียส"},
    {"name_e": "Mexico", "name_t": "เม็กซิโก"},
    {"name_e": "Micronesia", "name_t": "ไมโครนีเซีย"},
    {"name_e": "Moldova", "name_t": "มอลโดวา"},
    {"name_e": "Monaco", "name_t": "โมนาโก"},
    {"name_e": "Mongolia", "name_t": "มองโกเลีย"},
    {"name_e": "Montenegro", "name_t": "มอนเตเนโกร"},
    {"name_e": "Morocco", "name_t": "โมร็อกโก"},
    {"name_e": "Mozambique", "name_t": "โมซัมบิก"},
    {"name_e": "Myanmar", "name_t": "พม่า"},
    {"name_e": "Namibia", "name_t": "นามิเบีย"},
    {"name_e": "Nauru", "name_t": "นาอูรู"},
    {"name_e": "Nepal", "name_t": "เนปาล"},
    {"name_e": "Netherlands", "name_t": "เนเธอร์แลนด์"},
    {"name_e": "New Zealand", "name_t": "นิวซีแลนด์"},
    {"name_e": "Nicaragua", "name_t": "นิการากัว"},
    {"name_e": "Niger", "name_t": "ไนเจอร์"},
    {"name_e": "Nigeria", "name_t": "ไนจีเรีย"},
    {"name_e": "North Macedonia", "name_t": "มาซิโดเนียเหนือ"},
    {"name_e": "Norway", "name_t": "นอร์เวย์"},
    {"name_e": "Oman", "name_t": "โอมาน"},
    {"name_e": "Pakistan", "name_t": "ปากีสถาน"},
    {"name_e": "Palau", "name_t": "ปาเลา"},
    {"name_e": "Palestine", "name_t": "ปาเลสไตน์"},
    {"name_e": "Panama", "name_t": "ปานามา"},
    {"name_e": "Papua New Guinea", "name_t": "ปาปัวนิวกินี"},
    {"name_e": "Paraguay", "name_t": "ปารากวัย"},
    {"name_e": "Peru", "name_t": "เปรู"},
    {"name_e": "Philippines", "name_t": "ฟิลิปปินส์"},
    {"name_e": "Poland", "name_t": "โปแลนด์"},
    {"name_e": "Portugal", "name_t": "โปรตุเกส"},
    {"name_e": "Qatar", "name_t": "กาตาร์"},
    {"name_e": "Romania", "name_t": "โรมาเนีย"},
    {"name_e": "Russia", "name_t": "รัสเซีย"},
    {"name_e": "Rwanda", "name_t": "รวันดา"},
    {"name_e": "Saint Kitts and Nevis", "name_t": "เซนต์คิตส์และเนวิส"},
    {"name_e": "Saint Lucia", "name_t": "เซนต์ลูเซีย"},
    {"name_e": "Saint Vincent and the Grenadines", "name_t": "เซนต์วินเซนต์และเกรนาดีนส์"},
    {"name_e": "Samoa", "name_t": "ซามัว"},
    {"name_e": "San Marino", "name_t": "ซานมารีโน"},
    {"name_e": "Sao Tome and Principe", "name_t": "เซาตูเมและปรินซีปี"},
    {"name_e": "Saudi Arabia", "name_t": "ซาอุดีอาระเบีย"},
    {"name_e": "Senegal", "name_t": "เซเนกัล"},
    {"name_e": "Serbia", "name_t": "เซอร์เบีย"},
    {"name_e": "Seychelles", "name_t": "เซเชลส์"},
    {"name_e": "Sierra Leone", "name_t": "เซียร์ราลีโอน"},
    {"name_e": "Singapore", "name_t": "สิงคโปร์"},
    {"name_e": "Slovakia", "name_t": "สโลวาเกีย"},
    {"name_e": "Slovenia", "name_t": "สโลวีเนีย"},
    {"name_e": "Solomon Islands", "name_t": "หมู่เกาะโซโลมอน"},
    {"name_e": "Somalia", "name_t": "โซมาเลีย"},
    {"name_e": "South Africa", "name_t": "แอฟริกาใต้"},
    {"name_e": "South Sudan", "name_t": "ซูดานใต้"},
    {"name_e": "Spain", "name_t": "สเปน"},
    {"name_e": "Sri Lanka", "name_t": "ศรีลังกา"},
    {"name_e": "Sudan", "name_t": "ซูดาน"},
    {"name_e": "Suriname", "name_t": "ซูรินาเม"},
    {"name_e": "Sweden", "name_t": "สวีเดน"},
    {"name_e": "Switzerland", "name_t": "สวิตเซอร์แลนด์"},
    {"name_e": "Syria", "name_t": "ซีเรีย"},
    {"name_e": "Taiwan", "name_t": "ไต้หวัน"},
    {"name_e": "Tajikistan", "name_t": "ทาจิกิสถาน"},
    {"name_e": "Tanzania", "name_t": "แทนซาเนีย"},
    {"name_e": "Thailand", "name_t": "ไทย"},
    {"name_e": "Togo", "name_t": "โตโก"},
    {"name_e": "Tonga", "name_t": "ตองกา"},
    {"name_e": "Trinidad and Tobago", "name_t": "ตรินิแดดและโตเบโก"},
    {"name_e": "Tunisia", "name_t": "ตูนิเซีย"},
    {"name_e": "Turkey", "name_t": "ตุรกี"},
    {"name_e": "Turkmenistan", "name_t": "เติร์กเมนิสถาน"},
    {"name_e": "Tuvalu", "name_t": "ตูวาลู"},
    {"name_e": "Uganda", "name_t": "ยูกันดา"},
    {"name_e": "Ukraine", "name_t": "ยูเครน"},
    {"name_e": "United Arab Emirates", "name_t": "สหรัฐอาหรับเอมิเรตส์"},
    {"name_e": "United Kingdom", "name_t": "สหราชอาณาจักร"},
    {"name_e": "United States", "name_t": "สหรัฐอเมริกา"},
    {"name_e": "Uruguay", "name_t": "อุรุกวัย"},
    {"name_e": "Uzbekistan", "name_t": "อุซเบกิสถาน"},
    {"name_e": "Vanuatu", "name_t": "วานูอาตู"},
    {"name_e": "Vatican City", "name_t": "นครวาติกัน"},
    {"name_e": "Venezuela", "name_t": "เวเนซุเอลา"},
    {"name_e": "Vietnam", "name_t": "เวียดนาม"},
    {"name_e": "Yemen", "name_t": "เยเมน"},
    {"name_e": "Zambia", "name_t": "แซมเบีย"},
    {"name_e": "Zimbabwe", "name_t": "ซิมบับเว"}
]

export const LocationSection = () => {
    const {customer, location, addLocation, addValueToCustomer} = useCustomerForm();
    const { selectedCustomerType } = useCustomerType();
    const [amphurList, setAmphurList] = useState<locationNameType[]>([]);

    const setProvince = (province: string) => {
        addValueToCustomer("province", province);
    }
    const setAmphur = (amphur: string) => {
        addValueToCustomer("district", amphur);
    }

    const setCountry = (province: string) => {
      addValueToCustomer("country", province);
    }

    useEffect(() => {
        console.log(customer.province);
        if (!customer.province) return;
        setAmphurList(amphur[customer.province]);
    }, [customer.province]);

    const renderLocationForSupplier = () => {
      return (<div className="relative">
      <Combobox name="province" list={countries} value={customer?.country || ""} setValue={setCountry} placeholder="Select Country" />

      </div>)
    }

    const renderLocationForCustomer = () => {
      return (<>
          <div className="relative">
            <Combobox name="province" list={provinces} value={customer?.province || ""} setValue={setProvince} placeholder="Select Province" />

            </div>
            <div>
            <Combobox list={amphurList} value={customer?.district || ""} setValue={setAmphur} placeholder="Select Amphur" />

            </div>
      </>)
    }

    return (
        <div className="flex flex-col w-full gap-4">
            <h2 className="text-[#192434] text-lg font-semibold">Location</h2>
            {selectedCustomerType === "customer" ? renderLocationForCustomer() : renderLocationForSupplier()}
        </div>
    )
}




{/* <FormInput
                  value={customer.province}
                  label={"Province"}
                  name={"province"}
                  onChange={handleChange}
                  type={"text"}
                />
            <FormInput
                  value={customer.district}
                  label={"District"}
                  name={"district"}
                  onChange={handleChange}
                  type={"text"}
                /> */}