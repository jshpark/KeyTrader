// a fun little Kanye West inspired easter egg
// generates random Kanye quotes

let quotes = [
  `They be asking us questions, harass, and arrest us\nSaying "We eat pieces of shit like you for breakfast" \nHuh? Y'all eat pieces of shit?`,
  `Ooh, girl your breath is harsh \nCover your mouth up like you got COVID-19`,
  `She got a light skinned friend look like Michael Jackson \nGot a dark skinned friend look like Michael Jackson`,
  `Told 'em I finished school, and I started my own business \nThey say, 'Oh you graduated?' \nNo, I decided I was finished`,
  `Killin y'all n****s on that lyrical shit\nMayonnaise-colored Benz, I push Miracle Whips`,
  `I'm Kan, the Louis Vuitton Don\nBought my mom a purse, now she Louis Vuitton Mom`,
  `I went to the malls and I balled too hard\n"Oh my god, is that a black card?"\nI turned around and replied, "Why yes\nBut I prefer the term African American Express"`,
  `Poopy-di scoop\nScoop-diddy-whoop\nWhoop-di-scoop-di-poop\nPoop-di-scoopty\nScoopty-whoop`,
]

exports.run = (client, message, args) => {
    let quote = quotes[Math.floor(Math.random() * quotes.length)];
    message.channel.send(quote).catch(console.error);
}
