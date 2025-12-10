import { useState, useEffect } from 'react';
import { useDocumentOperation } from 'sanity';

export function ApproveAction(props: any) {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [props.draft]);

  return {
    label: isPublishing ? 'Đang duyệt...' : 'Duyệt & Đăng',
    onHandle: async () => {
      setIsPublishing(true);
      
      // 1. Gọi API của Next.js để copy video sang kho chính
      await fetch('/api/admin/approve', {
        method: 'POST',
        body: JSON.stringify({ submissionId: props.id })
      });

      // 2. Publish bài viết này
      patch.execute([{ set: { status: 'published' } }]);
      publish.execute();
      
      setIsPublishing(false);
    }
  };
}