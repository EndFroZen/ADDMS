'use client';
import React, { useState } from "react";

export default function ADDMSTermsOfService() {
  const [lang, setLang] = useState<"en" | "th">("en"); // English default

  const en = {
    title: "Terms of Service",
    sections: [
      {
        h: "1. Agreement to Terms",
        b: `By using ADDMS (Automated Web Application Deployment with Domain Mapping), you agree to comply with these Terms of Service. If you do not agree, you must not use the platform.`,
      },
      {
        h: "2. Eligibility",
        b: `You must be at least 18 years old or have legal parental/guardian consent. You must have the authority to deploy and manage websites and domains through ADDMS.`,
      },
      {
        h: "3. Use of the Service",
        b: `You may only use ADDMS for lawful purposes. Prohibited uses include hosting illegal content, malware, phishing, or disruptive activities. You are responsible for keeping your account credentials safe.`,
      },
      {
        h: "4. Intellectual Property",
        b: `All software, designs, and materials provided by ADDMS remain the intellectual property of the ADDMS project. You retain ownership of your deployed applications and content.`,
      },
      {
        h: "5. Service Availability",
        b: `ADDMS aims to provide continuous service but does not guarantee uptime or error-free operation. Maintenance or outages may occur without notice.`,
      },
      {
        h: "6. Limitation of Liability",
        b: `ADDMS is provided "as is." The project is not liable for any loss of data, downtime, or damages resulting from use of the system.`,
      },
      {
        h: "7. Termination",
        b: `ADDMS may suspend or terminate accounts if these Terms are violated. Users may stop using the service at any time.`,
      },
      {
        h: "8. Changes to Terms",
        b: `ADDMS reserves the right to update these Terms of Service at any time. Continued use of the platform means you accept the updated terms.`,
      },
    ],
  };

  const th = {
    title: "ข้อตกลงการใช้งาน",
    sections: [
      { h: "1. การยอมรับข้อตกลง", b: `เมื่อคุณใช้งาน ADDMS ถือว่าคุณยอมรับและปฏิบัติตามข้อตกลงนี้ หากไม่ยอมรับ คุณต้องหยุดการใช้งานทันที` },
      { h: "2. คุณสมบัติผู้ใช้", b: `ผู้ใช้ต้องมีอายุอย่างน้อย 18 ปี หรือได้รับความยินยอมจากผู้ปกครองโดยชอบด้วยกฎหมาย และต้องมีสิทธิ์ในการจัดการเว็บไซต์/โดเมนผ่าน ADDMS` },
      { h: "3. การใช้งานระบบ", b: `ผู้ใช้สามารถใช้งานได้เฉพาะกิจกรรมที่ถูกต้องตามกฎหมาย ห้ามโฮสต์เนื้อหาที่ผิดกฎหมาย มัลแวร์ ฟิชชิ่ง หรือโจมตีระบบ ผู้ใช้ต้องรับผิดชอบในการเก็บรักษาบัญชีอย่างปลอดภัย` },
      { h: "4. ทรัพย์สินทางปัญญา", b: `ซอฟต์แวร์และการออกแบบที่จัดทำโดย ADDMS เป็นทรัพย์สินทางปัญญาของโครงการ แต่เนื้อหาและเว็บไซต์ที่ผู้ใช้สร้างเป็นกรรมสิทธิ์ของผู้ใช้` },
      { h: "5. ความพร้อมในการให้บริการ", b: `ADDMS มุ่งมั่นให้บริการต่อเนื่อง แต่ไม่รับประกันว่าจะพร้อมใช้งานตลอดเวลา อาจมีการบำรุงรักษาหรือขัดข้องได้โดยไม่ต้องแจ้งล่วงหน้า` },
      { h: "6. ข้อจำกัดความรับผิด", b: `ADDMS ให้บริการ “ตามสภาพ” โดยไม่รับประกันความเสถียรหรือความถูกต้อง และไม่รับผิดชอบต่อการสูญเสียข้อมูลหรือความเสียหายใด ๆ` },
      { h: "7. การยุติการให้บริการ", b: `ADDMS อาจระงับหรือยกเลิกบัญชีผู้ใช้ที่ละเมิดข้อตกลงนี้ และผู้ใช้สามารถหยุดใช้งานได้ทุกเมื่อ` },
      { h: "8. การแก้ไขข้อตกลง", b: `ADDMS ขอสงวนสิทธิ์ในการปรับปรุงข้อตกลงนี้ได้ทุกเมื่อ และการใช้งานต่อไปถือว่าผู้ใช้ยอมรับการเปลี่ยนแปลง` },
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
