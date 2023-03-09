export const dateConvertor = (date: string) => {
  return (new Date(Date.parse(date)).toLocaleDateString())
}