export function formatDate(dateStr?: string | null): string {
  if (!dateStr) return '–';
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/** YYYY.MM.DD 형식 */
export function formatDateDot(dateStr?: string | null): string {
  if (!dateStr) return '–';
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}
