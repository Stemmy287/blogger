export const currentURL = (url: string) => {

  try {
    return 'https://www.' + new URL(url).hostname.replace(/^www\./, '')
  } catch (e) {
    return 'https://www.' + url
  }

}