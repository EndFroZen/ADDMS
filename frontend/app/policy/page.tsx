'use client';
import React, { useState } from "react";

export default function ADDMSPolicy() {
  const [lang, setLang] = useState<"en" | "th">("en"); // English shown first by default

  const en = {
    title: "ADDMS Policy",
    sections: [
      {
        h: "1. Policy Overview",
        b: `ADDMS (Automated Web Application Deployment with Domain Mapping) provides a secure,
flexible and user-friendly platform for deploying and managing web applications. This
policy summarizes acceptable use, data handling and security measures.`,
      },
      {
        h: "2. Acceptable Use",
        b: `Users must only deploy applications they are authorized to manage. The platform
must not be used for illegal or malicious activities (malware, phishing, attacks).
Keep credentials and access tokens private.`,
      },
      {
        h: "3. User Accounts",
        b: `Users are responsible for their account security. Sharing accounts with
unauthorized parties is prohibited. Violations may lead to suspension or termination.`,
      },
      {
        h: "4. Data Security & Privacy",
        b: `User data (site settings, file paths, credentials) is stored securely. Sensitive
items (e.g., DB passwords) should be encrypted at rest. ADDMS does not disclose
user data to third parties without consent except when required by law.`,
      },
      {
        h: "5. System Security",
        b: `ADDMS uses secure protocols to communicate among components. Users must
keep their apps and servers updated. Configuration changes (e.g., Nginx) are logged
for audit and troubleshooting.`,
      },
      {
        h: "6. Backups & Retention",
        b: `Users are responsible for backing up critical data. ADDMS may offer optional
backup tools but does not guarantee recovery from user error or server failure.`,
      },
      {
        h: "7. Updates",
        b: `ADDMS may automatically update system components to maintain security and
performance. Users should keep dependencies current.`,
      },
      {
        h: "8. Limitation of Liability",
        b: `ADDMS is provided "as is" with no warranties. It is not liable for data loss,
downtime, or damages resulting from misuse or external attacks.`,
      },
      {
        h: "9. Enforcement",
        b: `Violations may result in temporary suspension, permanent account termination,
or legal action when necessary.`,
      },
      {
        h: "10. Policy Changes",
        b: `ADDMS reserves the right to update this policy. Users will be notified of
material changes affecting service or data handling.`,
      },
    ],
  };

  const th = {
    title: "นโยบาย ADDMS",
    sections: [
      { h: "1. ภาพรวม", b: `ADDMS (Automated Web Application Deployment with Domain Mapping) เป็น
แพลตฟอร์มที่ปลอดภัย ยืดหยุ่น และใช้งานง่ายสำหรับการติดตั้งและจัดการเว็บไซต์
นโยบายนี้สรุปแนวทางการใช้งาน การจัดการข้อมูล และมาตรการความปลอดภัย` },
      { h: "2. การใช้งานที่เหมาะสม", b: `ผู้ใช้ต้องติดตั้งและจัดการเฉพาะเว็บไซต์ที่ได้รับอนุญาตเท่านั้น
ห้ามใช้ระบบเพื่อกิจกรรมที่ผิดกฎหมายหรือเป็นอันตราย เช่น โฮสต์มัลแวร์ ฟิชชิ่ง
หรือโจมตีผู้อื่น` },
      { h: "3. บัญชีผู้ใช้", b: `ผู้ใช้ต้องรับผิดชอบต่อความปลอดภัยของบัญชีตนเอง ห้ามแชร์บัญชีแก่ผู้ที่
ไม่อนุญาต และหากละเมิดอาจถูกระงับหรือยกเลิกบัญชี` },
      { h: "4. ความปลอดภัยและความเป็นส่วนตัว", b: `ข้อมูลผู้ใช้ เช่น การตั้งค่าเว็บไซต์ เส้นทางไฟล์
และรหัสผ่าน จะถูกจัดเก็บอย่างปลอดภัย ข้อมูลสำคัญควรถูกเข้ารหัส
ADDMS จะไม่เปิดเผยข้อมูลผู้ใช้แก่บุคคลที่สามโดยไม่ได้รับอนุญาต ยกเว้นตามกฎหมาย` },
      { h: "5. ความปลอดภัยของระบบ", b: `ADDMS ใช้โปรโตคอลที่ปลอดภัยในการสื่อสาร ผู้ใช้ต้องอัปเดต
แอปและเซิร์ฟเวอร์ของตน การเปลี่ยนแปลงการตั้งค่าจะถูกบันทึกเพื่อตรวจสอบ` },
      { h: "6. การสำรองข้อมูลและการเก็บรักษา", b: `ผู้ใช้ต้องสำรองข้อมูลสำคัญด้วยตนเอง
ADDMS อาจมีเครื่องมือสำรองข้อมูลเป็นตัวเลือกแต่ไม่รับประกันการกู้คืน` },
      { h: "7. การอัปเดตซอฟต์แวร์", b: `ADDMS อาจอัปเดตส่วนประกอบโดยอัตโนมัติเพื่อความปลอดภัย
และประสิทธิภาพ ผู้ใช้ควรอัปเดต dependencies อย่างสม่ำเสมอ` },
      { h: "8. ข้อจำกัดความรับผิด", b: `บริการให้ "ตามสภาพ" และไม่รับประกันความพร้อมใช้งาน
ระบบไม่รับผิดชอบต่อความสูญเสียข้อมูลหรือความเสียหายจากการใช้งานผิดวิธีหรือการโจมตี` },
      { h: "9. การบังคับใช้นโยบาย", b: `การละเมิดอาจทำให้ถูกระงับบริการ ชำระบัญชี หรือมีการดำเนินคดี` },
      { h: "10. การเปลี่ยนแปลงนโยบาย", b: `ADDMS ขอสงวนสิทธิ์ในการปรับปรุงนโยบายนี้และจะแจ้งผู้ใช้เมื่อมี
การเปลี่ยนแปลงสำคัญ` },
      { h: "ติดต่อเรา", b: `หากคุณมีคำถามหรือข้อกังวลเกี่ยวกับนโยบายนี้ โปรดติดต่อเราที่
Ef.chanachol@addms.com
` },
    ],
  };

  const data = lang === "en" ? en : th;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg mt-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{data.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{lang === "en" ? "English (default)" : "ภาษาไทย"}</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs">Language</label>
          <div className="inline-flex rounded-lg bg-white/6 p-1"> 
            <button
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${lang === "en" ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              English
            </button>
            <button
              onClick={() => setLang("th")}
              aria-pressed={lang === "th"}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${lang === "th" ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              ไทย
            </button>
          </div>
        </div>
      </header>

      <main className="mt-6 grid gap-5">
        {data.sections.map((s, idx) => (
          <section key={idx} className="p-4 bg-white/3 rounded-xl border border-white/5">
            <h2 className="text-lg font-semibold">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed whitespace-pre-line">{s.b}</p>
          </section>
        ))}

        <footer className="mt-2 text-xs text-muted-foreground">Updated: {new Date().toLocaleDateString()}</footer>
      </main>
    </div>
  );
}
