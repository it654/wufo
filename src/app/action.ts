'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const interest = formData.get('interest') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'Thiếu thông tin' };
  }

  try {
    const data = await resend.emails.send({
      // QUAN TRỌNG: Phải dùng email này nếu chưa add domain
      /* from: 'Contact Form <onboarding@resend.dev>',

      // QUAN TRỌNG: Chỉ gửi được đến email của BẠN (email đăng ký Resend)
      // Nếu gửi đến email khác sẽ bị chặn ở gói Free
      to: ['email_cua_ban@gmail.com'],

      replyTo: email, // Để bạn bấm Reply là trả lời người gửi
      subject: `[MouseFarm] ${interest} - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Bản text dự phòng */

      from: 'onboarding@resend.dev',
      to: 'mousefarm@career.sanogroup.tv',
      subject: `[MouseFarm] ${interest} - ${name}`,
      html: `<div className="">
           Tên - ${name}
          </div>`+
        `<div className="">
           Email - ${email}
          </div>` +
        `<div className="">
           
            Message - <strong>${message}!</strong>
          </div>`
    });

    if (data.error) {
      console.error("Resend Error:", data.error);
      return { success: false, error: data.error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, error: 'Lỗi server' };
  }
}