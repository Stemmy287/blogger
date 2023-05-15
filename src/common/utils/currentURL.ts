export const currentURL = (url: string) => {

  try {
    return 'https://' + new URL(url).hostname.replace(/^www\./, '')
  } catch (e) {
    return 'https://' + url
  }

}