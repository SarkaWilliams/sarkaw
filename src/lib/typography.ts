// Jednopísmenné předložky a spojky (a, i, k, o, s, u, v, z) nesmí zůstat na konci řádku.
// Mezeru za nimi nahradíme pevnou mezerou až při renderu — obsah v JSON (editovaný v CMS)
// zůstává beze změny. Lookbehind zachytí i řetězce jako „a v domě“.
const SINGLE_LETTER_WORD = /(?<=^|[\s(„“"'‚])([aikosuvz])\s+/giu;

export function nbsp(text: string): string {
  return text.replace(SINGLE_LETTER_WORD, "$1\u00A0");
}
