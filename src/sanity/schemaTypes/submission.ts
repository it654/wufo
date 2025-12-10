import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'submission',
  title: 'Video Đóng Góp (Submissions)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tiêu đề Video', type: 'string' }),
    defineField({ name: 'description', title: 'Mô tả', type: 'text' }),
    defineField({ 
      name: 'videoFile', 
      title: 'File Video', 
      type: 'file',
      options: { accept: 'video/*' }
    }),
    defineField({ name: 'authorName', title: 'Tên người gửi', type: 'string' }),
    defineField({ name: 'authorEmail', title: 'Email', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Trạng thái',
      type: 'string',
      options: {
        list: [
          { title: 'Chờ duyệt (Pending)', value: 'pending' },
          { title: 'Đã xem (Reviewed)', value: 'reviewed' },
          { title: 'Đã đăng (Published)', value: 'published' },
        ],
        layout: 'radio'
      },
      initialValue: 'pending'
    }),
    defineField({ 
      name: 'submittedAt', 
      title: 'Thời gian gửi', 
      type: 'datetime', 
      initialValue: () => new Date().toISOString() 
    }),
  ],
})